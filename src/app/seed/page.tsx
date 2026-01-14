'use client';

import { useState } from 'react';

interface SeedResult {
  success: boolean;
  message?: string;
  error?: string;
  admin?: {
    email: string;
    password: string;
  };
  seeded?: {
    products: number;
    collections: number;
    artists: number;
    releases: number;
    discounts: number;
    posts: number;
  };
}

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SeedResult | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Database Seed</h1>
          <p className="text-white/70">
            Click the button below to populate your database with demo data including products, artists, releases, and an admin account.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-accent-teal">What will be created:</h2>
            <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
              <li>5 demo products (tees, hoodies, posters, hats, stickers)</li>
              <li>1 artist profile (Kelly Layton)</li>
              <li>1 music release (Empty Chair Blues)</li>
              <li>6 product collections</li>
              <li>2 discount codes (DREAM10, FREESHIP)</li>
              <li>2 blog posts</li>
              <li>Admin account for dashboard access</li>
            </ul>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-amber-400 text-sm">
              <strong>Warning:</strong> This will delete all existing data in the database before seeding.
            </p>
          </div>

          <button
            onClick={handleSeed}
            disabled={loading}
            className={`w-full py-4 rounded-full font-semibold uppercase tracking-widest transition-all ${
              loading
                ? 'bg-white/20 text-white/50 cursor-not-allowed'
                : 'bg-accent-teal text-black hover:bg-accent-teal/90'
            }`}
          >
            {loading ? 'Seeding Database...' : 'Seed Database Now'}
          </button>
        </div>

        {result && (
          <div
            className={`rounded-2xl p-6 space-y-4 ${
              result.success
                ? 'bg-emerald-500/10 border border-emerald-500/30'
                : 'bg-red-500/10 border border-red-500/30'
            }`}
          >
            {result.success ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <h3 className="text-lg font-semibold text-emerald-400">{result.message}</h3>
                </div>

                {result.admin && (
                  <div className="bg-black/30 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-semibold text-white">Admin Credentials:</p>
                    <div className="font-mono text-sm">
                      <p>
                        <span className="text-white/50">Email:</span>{' '}
                        <span className="text-accent-teal">{result.admin.email}</span>
                      </p>
                      <p>
                        <span className="text-white/50">Password:</span>{' '}
                        <span className="text-accent-teal">{result.admin.password}</span>
                      </p>
                    </div>
                  </div>
                )}

                {result.seeded && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-black/30 rounded-lg p-3">
                      <span className="text-white/50">Products:</span>{' '}
                      <span className="font-semibold">{result.seeded.products}</span>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <span className="text-white/50">Collections:</span>{' '}
                      <span className="font-semibold">{result.seeded.collections}</span>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <span className="text-white/50">Artists:</span>{' '}
                      <span className="font-semibold">{result.seeded.artists}</span>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <span className="text-white/50">Releases:</span>{' '}
                      <span className="font-semibold">{result.seeded.releases}</span>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <span className="text-white/50">Discounts:</span>{' '}
                      <span className="font-semibold">{result.seeded.discounts}</span>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <span className="text-white/50">Blog Posts:</span>{' '}
                      <span className="font-semibold">{result.seeded.posts}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="/"
                    className="flex-1 text-center py-3 rounded-full border border-white/30 text-sm font-semibold uppercase tracking-wider hover:border-white/50 transition-colors"
                  >
                    View Store
                  </a>
                  <a
                    href="/admin"
                    className="flex-1 text-center py-3 rounded-full bg-accent-violet text-white text-sm font-semibold uppercase tracking-wider hover:bg-accent-violet/90 transition-colors"
                  >
                    Admin Dashboard
                  </a>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="text-lg font-semibold text-red-400">Seeding Failed</h3>
                  <p className="text-sm text-red-300/70">{result.error}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
