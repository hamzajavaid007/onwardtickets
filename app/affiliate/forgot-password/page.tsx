'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AffiliateForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/affiliates/forgot-password', {
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
      className="min-h-screen bg-gradient-to-br from-[#0B1437] via-[#0B1437] to-[#005CFF] flex items-center justify-center p-6"
      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#005CFF]/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5ec5dc]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo.png" alt="OnwardTickets" className="h-[45px] mx-auto mb-4 brightness-0 invert" />
          </Link>
          <h1 className="text-[24px] font-bold text-white">Forgot Your Credentials?</h1>
          <p className="text-[14px] text-gray-400 mt-1">Enter your email to receive a recovery link</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#22C55E" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white text-[15px] mb-2">Check your email</p>
              <p className="text-gray-400 text-[13px] mb-6">If this email is registered, you&apos;ll receive a link to recover your credentials.</p>
              <Link href="/affiliate/login" className="text-[#5ec5dc] text-[13px] hover:text-white transition-colors font-medium">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[13px] font-medium text-gray-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#5ec5dc] transition-colors"
                  autoFocus
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <span className="text-[13px] text-red-400">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 bg-gradient-to-r from-[#005CFF] to-[#0052CC] text-white rounded-xl text-[14px] font-semibold hover:from-[#0047CC] hover:to-[#005CFF] transition-all disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Recovery Link'}
              </button>

              <div className="text-center">
                <Link href="/affiliate/login" className="text-[13px] text-gray-400 hover:text-gray-300 transition-colors">
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
