import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const from = process.env.SMTP_USER || 'noreply@epicdreamsentertainment.com';

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ''),
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const resetUrl = `${appUrl}/admin/reset-password?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #171717; border-radius: 8px; padding: 40px;">
          <h1 style="color: #00d4aa; margin-bottom: 24px; font-size: 24px;">Epic Dreams Entertainment</h1>
          <h2 style="margin-bottom: 16px; font-size: 20px;">Password Reset Request</h2>
          <p style="color: #a3a3a3; margin-bottom: 24px; line-height: 1.6;">
            We received a request to reset your admin password. Click the button below to create a new password.
          </p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #00d4aa; color: #0a0a0a; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 600; margin-bottom: 24px;">
            Reset Password
          </a>
          <p style="color: #737373; margin-top: 24px; font-size: 14px; line-height: 1.6;">
            This link will expire in 1 hour. If you didn't request this password reset, you can safely ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #262626; margin: 32px 0;">
          <p style="color: #525252; font-size: 12px;">
            If the button doesn't work, copy and paste this URL into your browser:<br>
            <a href="${resetUrl}" style="color: #00d4aa;">${resetUrl}</a>
          </p>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: 'Reset Your Epic Dreams Admin Password',
    html,
  });
}
