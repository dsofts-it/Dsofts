import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import './config/db.js';
import passport from './config/passport.js';

import authRoutes from './routes/auth.routes.js';
import inquiryRoutes from './routes/inquiry.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import contentRoutes from './routes/content.routes.js';
import adminRoutes from './routes/admin.routes.js';
import metricsRoutes from './routes/metrics.routes.js';

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({ origin: CLIENT_URL, credentials: true })
);

const limiter = rateLimit({ windowMs: 60 * 1000, max: 200 });
app.use(limiter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'dsofts-api', time: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/metrics', metricsRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

export default app;
