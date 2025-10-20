import express from 'express';
import passport from 'passport';
import '../config/passport.js';
import User from '../models/User.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import { signJwt, generateRandomToken } from '../utils/tokens.js';
import { setJwtCookie, requireAuth } from '../middleware/auth.js';
import { sendResetEmail } from '../utils/email.js';

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword)
      return res.status(400).json({ message: 'All fields required' });
    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const user = await User.create({ name, email: email.toLowerCase(), password });
    const token = signJwt({ id: user._id, name: user.name, email: user.email, role: user.role });
    setJwtCookie(res, token);
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login by name or email
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be name or email
    if (!identifier || !password) return res.status(400).json({ message: 'Missing fields' });

    const query = identifier.includes('@') ? { email: identifier.toLowerCase() } : { name: identifier };
    const user = await User.findOne(query);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = signJwt({ id: user._id, name: user.name, email: user.email, role: user.role });
    setJwtCookie(res, token);
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
});

router.put('/profile', requireAuth, async (req, res) => {
  const { name, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { name, avatar } },
    { new: true }
  ).select('-password');
  res.json({ user });
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/login?error=google` }),
  async (req, res) => {
    // Passport exposes user on req.user
    const user = req.user;
    const token = signJwt({ id: user._id, name: user.name, email: user.email, role: user.role });
    setJwtCookie(res, token);
    res.redirect(`${CLIENT_URL}/profile`);
  }
);

// Forgot password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.json({ message: 'If account exists, email sent' });

  const token = generateRandomToken(24);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  await PasswordResetToken.create({ userId: user._id, token, expiresAt });
  const resetLink = `${CLIENT_URL}/reset-password/${token}`;
  try {
    await sendResetEmail({ to: user.email, name: user.name, resetLink });
  } catch (e) {
    // swallow email errors in dev
    console.warn('Email sending failed', e.message);
  }
  res.json({ message: 'If account exists, email sent' });
});

router.post('/reset-password', async (req, res) => {
  const { token, password, confirmPassword } = req.body;
  if (!token || !password || !confirmPassword)
    return res.status(400).json({ message: 'Missing fields' });
  if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

  const record = await PasswordResetToken.findOne({ token, used: false });
  if (!record || record.expiresAt < new Date()) return res.status(400).json({ message: 'Invalid or expired token' });
  const user = await User.findById(record.userId);
  user.password = password;
  await user.save();
  record.used = true;
  await record.save();
  res.json({ message: 'Password updated' });
});

export default router;
