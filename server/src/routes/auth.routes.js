import express from 'express';
import passport from 'passport';
import '../config/passport.js';
import User from '../models/User.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import { signJwt, generateRandomToken } from '../utils/tokens.js';
import { setJwtCookie, clearJwtCookie, requireAuth } from '../middleware/auth.js';
import { sendResetEmail } from '../utils/email.js';

const router = express.Router();
// Support multiple comma-separated client origins; use the first for redirects
const rawClientUrls = process.env.CLIENT_URL || 'http://localhost:5173';
const CLIENT_URLS = rawClientUrls.split(',').map((s) => s.trim()).filter(Boolean);
const CLIENT_URL = CLIENT_URLS[0] || 'http://localhost:5173';

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
    const { identifier, email, password } = req.body; // prefer email, keep identifier for backward compatibility
    const loginId = (email || identifier || '').trim();
    if (!loginId || !password) return res.status(400).json({ message: 'Missing fields' });

    // Hardcoded admin login (explicit request). WARNING: keep only for controlled environments.
    const hardEmail = 'rohandede97@gmail.com';
    const hardPass = '12345678';
    if (loginId.toLowerCase() === hardEmail.toLowerCase() && password === hardPass) {
      // Stateless hard-admin: no DB calls required
      const payload = { id: 'hard-admin', name: 'Admin', email: hardEmail.toLowerCase(), role: 'admin' };
      const token = signJwt(payload);
      setJwtCookie(res, token);
      return res.json({ user: payload });
    }

    const query = loginId.includes('@') ? { email: loginId.toLowerCase() } : { name: loginId };
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
  clearJwtCookie(res);
  res.json({ message: 'Logged out' });
});

router.get('/me', requireAuth, async (req, res) => {
  if (req.user?.id === 'hard-admin') {
    return res.json({ user: { id: 'hard-admin', name: 'Admin', email: 'rohandede97@gmail.com', role: 'admin' } });
  }
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

// Google OAuth (stateless: no server sessions)
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${CLIENT_URL}/login?error=google`,
    session: false,
  }),
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
