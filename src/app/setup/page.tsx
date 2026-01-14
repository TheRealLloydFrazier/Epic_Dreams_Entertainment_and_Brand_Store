'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
    message?: string;
    credentials?: {
      email: string;
      password: string;
      note: string;
    };
  } | null>(null);

  const handleSetup = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error: 'Network error',
        message: 'Failed to connect to the server'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-20">
      <h1 className="text-2xl font-semibold text-white">Epic Dreams Admin Setup</h1>
      <p className="mt-2 text-sm text-white/60">
        Initialize your Epic Dreams Entertainment admin account. This only needs to be done once.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        {!result && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-black/40 p-4 text-sm text-white/80">
              <p className="font-semibold">What this does:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-white/60">
                <li>Creates an admin user in the database</li>
                <li>Sets up default credentials (can be changed after login)</li>
                <li>Only works if no admin user exists yet</li>
              </ul>
            </div>

            <button
              onClick={handleSetup}
              disabled={loading}
              className="w-full rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating Admin User...' : 'Create Admin User'}
            </button>
          </div>
        )}

        {result && result.success && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-green-900/30 border border-green-500/30 p-4">
              <p className="text-sm font-semibold text-green-400">✓ Admin User Created Successfully</p>
              <p className="mt-2 text-xs text-green-300/80">{result.message}</p>
            </div>

            {result.credentials && (
              <div className="rounded-2xl bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">Your Admin Credentials</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-white/60">Email:</span>
                    <span className="ml-2 font-mono text-accent-teal">{result.credentials.email}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Password:</span>
                    <span className="ml-2 font-mono text-accent-teal">{result.credentials.password}</span>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-yellow-900/30 border border-yellow-500/30 p-3">
                  <p className="text-xs text-yellow-300">
                    ⚠️ {result.credentials.note}
                  </p>
                </div>
              </div>
            )}

            <Link
              href="/admin"
              className="block w-full rounded-full bg-accent-teal px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white"
            >
              Go to Admin Login →
            </Link>
          </div>
        )}

        {result && result.error && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-red-900/30 border border-red-500/30 p-4">
              <p className="text-sm font-semibold text-red-400">✗ {result.error}</p>
              <p className="mt-2 text-xs text-red-300/80">{result.message}</p>
            </div>

            {result.error === 'Admin user already exists' ? (
              <Link
                href="/admin"
                className="block w-full rounded-full bg-accent-teal px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white"
              >
                Go to Admin Login →
              </Link>
            ) : (
              <button
                onClick={() => setResult(null)}
                className="w-full rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-accent-teal hover:text-accent-teal"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 text-xs text-white/50 space-y-2">
        <p>
          Already have an admin account?{' '}
          <Link href="/admin" className="text-accent-teal underline">
            Sign in here
          </Link>
        </p>
        <p>
          Need help? Email{' '}
          <a href="mailto:support@epicdreamsent.com" className="underline">
            support@epicdreamsent.com
          </a>
        </p>
      </div>
    </div>
  );
}
