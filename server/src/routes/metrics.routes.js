import express from 'express';
import { generateRandomToken } from '../utils/tokens.js';
import Visit from '../models/Visit.js';

const router = express.Router();

// Track a page visit
router.post('/visit', async (req, res) => {
  try {
    let vid = req.cookies?.vid;
    if (!vid) {
      vid = generateRandomToken(12);
      const isProd = process.env.NODE_ENV === 'production';
      res.cookie('vid', vid, { httpOnly: false, sameSite: isProd ? 'none' : 'lax', secure: isProd, maxAge: 365*24*60*60*1000 });
    }
    const { path } = req.body || {};
    await Visit.create({ vid, path, ua: req.headers['user-agent'], ip: req.ip });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;

