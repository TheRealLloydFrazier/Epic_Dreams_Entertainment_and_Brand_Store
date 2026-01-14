import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Find admin user by reset token
    const admin = await prisma.adminUser.findUnique({
      where: { passwordResetToken: token },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (!admin.passwordResetExpiresAt || admin.passwordResetExpiresAt < new Date()) {
      // Clear expired token
      await prisma.adminUser.update({
        where: { id: admin.id },
        data: {
          passwordResetToken: null,
          passwordResetExpiresAt: null,
        },
      });

      return NextResponse.json(
        { error: 'Reset token has expired. Please request a new password reset.' },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 12);

    // Update password and clear reset token
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpiresAt: null,
        mustChangePassword: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    );
  }
}

// GET endpoint to validate token without resetting password
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ valid: false, error: 'Token is required' }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { passwordResetToken: token },
    });

    if (!admin) {
      return NextResponse.json({ valid: false, error: 'Invalid token' });
    }

    if (!admin.passwordResetExpiresAt || admin.passwordResetExpiresAt < new Date()) {
      return NextResponse.json({ valid: false, error: 'Token has expired' });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json({ valid: false, error: 'Validation failed' }, { status: 500 });
  }
}
