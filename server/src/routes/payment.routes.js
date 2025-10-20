import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import { authOptional, requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

const razor = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

router.get('/key', (_req, res) => {
  res.json({ keyId: process.env.RAZORPAY_KEY_ID || '' });
});

// Create order
router.post('/create-order', authOptional, async (req, res) => {
  try {
    if (!razor) return res.status(500).json({ message: 'Razorpay not configured' });
    const { amount } = req.body; // amount in INR rupees
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    const order = await razor.orders.create({ amount: Math.round(amount * 100), currency: 'INR' });
    const payment = await Payment.create({ userId: req.user?.id, orderId: order.id, amount, currency: 'INR', status: 'created' });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, id: payment._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '');
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = hmac.digest('hex');
    const isValid = digest === razorpay_signature;

    const payment = await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        $set: {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: isValid ? 'paid' : 'failed',
        },
      },
      { new: true }
    );

    res.json({ success: isValid, payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Current user's payment history
router.get('/my', requireAuth, async (req, res) => {
  const list = await Payment.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ payments: list });
});

// Admin payment list
router.get('/', requireAdmin, async (_req, res) => {
  const list = await Payment.find().sort({ createdAt: -1 }).limit(500);
  res.json({ payments: list });
});

export default router;
