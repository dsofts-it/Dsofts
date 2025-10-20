import express from 'express';
import ProjectInquiry from '../models/ProjectInquiry.js';
import { authOptional, requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create inquiry from configurator
router.post('/', authOptional, async (req, res) => {
  try {
    const data = req.body || {};
    const inquiry = await ProjectInquiry.create({
      userId: req.user?.id,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      projectType: data.projectType,
      selections: data.selections || {},
      notes: data.notes || '',
      estimatedPrice: data.estimatedPrice || 0,
    });
    res.status(201).json({ inquiry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get my inquiries
router.get('/me', requireAuth, async (req, res) => {
  const list = await ProjectInquiry.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ inquiries: list });
});

export default router;

