import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async ({ to, name, resetLink }) => {
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>Reset your password</h2>
      <p>Hi ${name || 'there'},</p>
      <p>We received a request to reset your password for your Dsofts account.</p>
      <p><a href="${resetLink}">Click here to reset your password</a>. This link will expire in 30 minutes.</p>
      <p>If you didn’t request a password reset, you can ignore this email.</p>
      <p>— Dsofts IT</p>
    </div>`;

  await transporter.sendMail({
    from: `Dsofts IT <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset your Dsofts password',
    html,
  });
};

export default transporter;

