'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<{ password: string; confirmPassword: string }>();
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const password = watch('password');

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setValidating(false);
      return;
    }

    async function validateToken() {
      try {
        const response = await fetch(`/api/admin/reset-password?token=${token}`);
        const data = await response.json();
        setTokenValid(data.valid);
      } catch (err) {
        setTokenValid(false);
      } finally {
        setValidating(false);
      }
    }

    validateToken();
  }, [token]);

  const onSubmit = async (values: { password: string; confirmPassword: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: values.password })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Unable to reset password');
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (validating) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
        <div className="text-center">
          <p className="text-sm text-white/60">Validating reset link...</p>
        </div>
      </div>
    );
  }

  // No token or invalid token
  if (!token || !tokenValid) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-semibold text-white">Invalid Reset Link</h1>
        <p className="mt-2 text-sm text-white/60">
          This password reset link is invalid or has expired.
        </p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/70">
            Password reset links expire after 1 hour for security reasons.
            Please request a new reset link.
          </p>
          <Link
            href="/admin/forgot-password"
            className="mt-4 inline-flex rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white"
          >
            Request New Link
          </Link>
        </div>
        <Link
          href="/admin"
          className="mt-6 text-xs text-white/50 hover:text-white"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-semibold text-white">Password Reset</h1>
        <p className="mt-2 text-sm text-white/60">
          Your password has been successfully reset.
        </p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/70">
            You can now sign in with your new password.
          </p>
          <Link
            href="/admin"
            className="mt-4 inline-flex rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Reset form
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
      <h1 className="text-2xl font-semibold text-white">Create New Password</h1>
      <p className="mt-2 text-sm text-white/60">
        Enter a new password for your admin account.
      </p>
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/60">New Password</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
            />
            {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/60">Confirm Password</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>
        </form>
      </div>
      <Link
        href="/admin"
        className="mt-6 text-xs text-white/50 hover:text-white"
      >
        ← Back to sign in
      </Link>
    </div>
  );
}
