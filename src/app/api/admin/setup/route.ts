import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@lib/db/prisma';

export const dynamic = 'force-dynamic';

/**
 * One-time setup endpoint to create the initial admin user.
 *
 * This endpoint should only be used once during initial deployment.
 * It will create an admin user with the default credentials if no admin users exist.
 *
 * Default credentials:
 * - Email: admin@epicdreamsent.com
 * - Password: ChangeMe123!
 *
 * For security, this endpoint will refuse to create an admin if one already exists.
 */
export async function POST() {
  try {
    // Check if any admin users already exist
    const existingAdminCount = await prisma.adminUser.count();

    if (existingAdminCount > 0) {
      return NextResponse.json(
        {
          error: 'Admin user already exists',
          message: 'An admin user has already been created. If you forgot your password, please use the password reset feature or contact support.'
        },
        { status: 400 }
      );
    }

    // Create the default admin user with the same credentials as the seed script
    const passwordHash = await bcrypt.hash('ChangeMe123!', 12);
    const admin = await prisma.adminUser.create({
      data: {
        email: 'admin@epicdreamsent.com',
        passwordHash,
        mustChangePassword: true,
        role: 'admin'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      credentials: {
        email: 'admin@epicdreamsent.com',
        password: 'ChangeMe123!',
        note: 'Please change this password after your first login'
      }
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      {
        error: 'Failed to create admin user',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
