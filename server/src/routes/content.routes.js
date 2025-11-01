import express from 'express';
import Client from '../models/Client.js';
import Service from '../models/Service.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Static services list for the site
router.get('/services', async (_req, res) => {
  let services = await Service.find({ active: true }).sort({ createdAt: -1 });
  if (!services.length) {
    services = [
      { key: 'frontend', title: 'Frontend Websites', description: 'Fast, responsive, SEO‑friendly React/Next sites.', priceFrom: 12000, active: true },
      { key: 'fullstack', title: 'Full‑Stack Websites', description: 'Production MERN apps with auth and dashboards.', priceFrom: 25000, active: true },
      { key: 'android', title: 'Android Apps', description: 'Native/hybrid apps with modern UI.', priceFrom: 20000, active: true },
      { key: 'mlm', title: 'MLM Projects', description: 'Configurable plans, wallet and payouts.', priceFrom: 30000, active: true },
      { key: 'local', title: 'Local Shops & SMEs', description: 'POS, inventory, billing for small business.', priceFrom: 15000, active: true },
    ];
  }
  res.json({ services });
});

// Admin manage services
router.post('/services', requireAdmin, async (req, res) => {
  const body = req.body || {};
  // Auto-generate a unique key if not provided
  let key = body.key;
  if (!key) {
    const base = String(body.title || 'service')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const rand = Math.random().toString(36).slice(2, 6);
    key = base ? `${base}-${rand}` : `svc-${rand}`;
  }
  const payload = { ...body, key };
  const s = await Service.create(payload);
  res.status(201).json({ service: s });
});
router.put('/services/:id', requireAdmin, async (req, res) => {
  const s = await Service.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  res.json({ service: s });
});
router.delete('/services/:id', requireAdmin, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Happy clients listing
router.get('/clients', async (_req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 });
  res.json({ clients });
});

// Admin manage clients (create/update/delete)
router.post('/clients', requireAdmin, async (req, res) => {
  const c = await Client.create(req.body);
  res.status(201).json({ client: c });
});
router.put('/clients/:id', requireAdmin, async (req, res) => {
  const c = await Client.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  res.json({ client: c });
});
router.delete('/clients/:id', requireAdmin, async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
