import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { prisma } from '@lib/db/prisma';
import { sendPasswordResetEmail } from '@lib/email/send';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find admin user by email
    const admin = await prisma.adminUser.findUnique({ where: { email } });

    // Always return success to prevent email enumeration attacks
    if (!admin) {
      return NextResponse.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    // Generate a secure random token
    const token = randomBytes(32).toString('hex');

    // Set token expiration to 1 hour from now
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Update user with reset token
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        passwordResetToken: token,
        passwordResetExpiresAt: expiresAt,
      },
    });

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, token);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // Don't expose email failure to client - still return success
    }

    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    );
  }
}
