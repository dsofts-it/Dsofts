import { verifyJwt } from '../utils/tokens.js';

export const authOptional = (req, _res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (token) {
      req.user = verifyJwt(token);
    }
  } catch {}
  next();
};

export const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    req.user = verifyJwt(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const setJwtCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearJwtCookie = (res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
  });
};

export const requireAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = verifyJwt(token);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
