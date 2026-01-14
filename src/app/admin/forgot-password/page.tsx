'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ email: string }>();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: { email: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Unable to process request');
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-semibold text-white">Check Your Email</h1>
        <p className="mt-2 text-sm text-white/60">
          If an account with that email exists, we've sent a password reset link.
          The link will expire in 1 hour.
        </p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/70">
            Didn't receive an email? Check your spam folder or try again.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-sm text-accent-teal hover:underline"
          >
            Try again
          </button>
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

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
      <h1 className="text-2xl font-semibold text-white">Reset Password</h1>
      <p className="mt-2 text-sm text-white/60">
        Enter your admin email address and we'll send you a link to reset your password.
      </p>
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/60">Email</label>
            <input
              type="email"
              className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send Reset Link'}
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
