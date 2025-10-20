import express from 'express';
import { requireAdmin } from '../middleware/auth.js';
import User from '../models/User.js';
import ProjectInquiry from '../models/ProjectInquiry.js';
import Payment from '../models/Payment.js';
import Visit from '../models/Visit.js';

const router = express.Router();

router.use(requireAdmin);

router.get('/metrics', async (_req, res) => {
  const [users, inquiries, payments, visits] = await Promise.all([
    User.countDocuments(),
    ProjectInquiry.countDocuments(),
    Payment.countDocuments({ status: 'paid' }),
    Visit.countDocuments(),
  ]);

  // Last 7 days counts
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const daily = await Visit.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const revenueAgg = await Payment.aggregate([
    { $match: { status: 'paid' } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);

  res.json({
    totals: { users, inquiries, paidPayments: payments, visits, revenue: revenueAgg?.[0]?.total || 0 },
    dailyVisits: daily,
  });
});

router.get('/users', async (_req, res) => {
  const data = await User.find().select('-password').sort({ createdAt: -1 }).limit(200);
  res.json({ users: data });
});

router.get('/inquiries', async (_req, res) => {
  const data = await ProjectInquiry.find().sort({ createdAt: -1 }).limit(200);
  res.json({ inquiries: data });
});

router.get('/payments', async (_req, res) => {
  const data = await Payment.find().sort({ createdAt: -1 }).limit(200);
  res.json({ payments: data });
});

export default router;

