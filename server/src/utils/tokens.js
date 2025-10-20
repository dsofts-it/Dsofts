import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const signJwt = (payload, options = {}) => {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  return jwt.sign(payload, secret, { expiresIn: '7d', ...options });
};

export const verifyJwt = (token) => {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  return jwt.verify(token, secret);
};

export const generateRandomToken = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

