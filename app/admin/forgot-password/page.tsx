'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0B1437] relative overflow-hidden"
      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#2979FF]/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#5ec5dc]/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[440px] mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#2979FF] to-[#5ec5dc] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-[24px] font-bold text-white mb-1">Forgot Password</h1>
          <p className="text-[14px] text-gray-400">Enter your admin email to receive a reset link</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#22C55E" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white text-[15px] mb-2">Check your email</p>
              <p className="text-gray-400 text-[13px] mb-6">If this email is associated with an admin account, you&apos;ll receive a password reset link.</p>
              <Link href="/admin/login" className="text-[#5ec5dc] text-[13px] hover:text-[#7dd3e8] transition-colors font-medium">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[13px] font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  required
                  placeholder="admin@onwardtickets.com"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[14px] placeholder:text-gray-500 focus:border-[#5ec5dc] focus:outline-none focus:ring-1 focus:ring-[#5ec5dc]/50 transition-all"
                  autoFocus
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <span className="text-[13px] text-red-400">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3.5 bg-gradient-to-r from-[#2979FF] to-[#0052CC] hover:from-[#1565C0] hover:to-[#004099] text-white rounded-xl text-[14px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div className="text-center">
                <Link href="/admin/login" className="text-[13px] text-gray-400 hover:text-gray-300 transition-colors">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
