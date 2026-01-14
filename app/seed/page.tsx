'use client';

import { useState } from 'react';

export default function SeedPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);

  const seedDatabase = async () => {
    setStatus('loading');
    setMessage('Populating database... This may take 10-30 seconds');

    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Database seeded successfully!');
        setCredentials(data.credentials);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to seed database');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">🎉 Seed Your Database</h1>

        <div className="bg-yellow-900/30 border border-yellow-600 rounded p-4 mb-6">
          <p className="text-yellow-200">
            <strong>⚠️ Warning:</strong> This will delete all existing data and create fresh demo data including products, artists, and your admin account.
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-4">Click the button below to populate your database with:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>5 Demo products (tees, hoodies, posters, etc.)</li>
            <li>Artist profile (Kelly Layton)</li>
            <li>Music release (Empty Chair Blues)</li>
            <li>6 Product collections</li>
            <li>2 Discount codes (DREAM10, FREESHIP)</li>
            <li>2 Blog posts</li>
            <li>Admin user account</li>
          </ul>
        </div>

        <button
          onClick={seedDatabase}
          disabled={status === 'loading'}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-black font-bold py-4 px-6 rounded transition-colors"
        >
          {status === 'loading' ? 'Seeding... Please wait' : status === 'success' ? '✓ Seeding Complete!' : 'Seed Database Now'}
        </button>

        {status === 'loading' && (
          <div className="mt-6 p-4 bg-blue-900/30 border border-blue-600 rounded">
            <p className="text-blue-200">⏳ {message}</p>
          </div>
        )}

        {status === 'success' && credentials && (
          <div className="mt-6 p-6 bg-green-900/30 border border-green-600 rounded">
            <h3 className="text-xl font-bold text-green-400 mb-3">✅ Success!</h3>
            <p className="mb-4">Your site is now fully populated with demo data.</p>

            <div className="bg-gray-900 p-4 rounded mb-4 font-mono text-sm">
              <p className="text-cyan-400 font-bold mb-2">Admin Login:</p>
              <p>Email: {credentials.email}</p>
              <p>Password: {credentials.password}</p>
            </div>

            <div className="space-y-2">
              <a
                href="/"
                className="block w-full text-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                View Your Store →
              </a>
              <a
                href="/admin"
                className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                Go to Admin Panel →
              </a>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 p-4 bg-red-900/30 border border-red-600 rounded">
            <h3 className="text-xl font-bold text-red-400 mb-2">❌ Error</h3>
            <p className="text-red-200">{message}</p>
            <p className="text-sm text-gray-400 mt-2">Please try again or check the browser console for details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
