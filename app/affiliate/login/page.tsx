'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AffiliateLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/affiliates/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, referralCode }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      router.push('/affiliate/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="btn-hover-lift min-h-screen bg-gradient-to-br from-[#0B1437] via-[#0B1437] to-[#2979FF] flex items-center justify-center p-6" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
      {/* Background decoration */}
      <div className="btn-hover-lift absolute inset-0 overflow-hidden">
        <div className="btn-hover-lift absolute -top-40 -right-40 w-80 h-80 bg-[#2979FF]/30 rounded-full blur-3xl" />
        <div className="btn-hover-lift absolute -bottom-40 -left-40 w-80 h-80 bg-[#5ec5dc]/20 rounded-full blur-3xl" />
      </div>

      <div className="btn-hover-lift relative z-10 w-full max-w-[440px]">
        {/* Logo */}
        <div className="btn-hover-lift text-center mb-8">
          <Link href="/">
            <img src="/logo.png" alt="OnwardTickets" className="btn-hover-lift h-[45px] mx-auto mb-4 brightness-0 invert" />
          </Link>
          <h1 className="btn-hover-lift text-[24px] font-bold text-white">Affiliate Portal</h1>
          <p className="btn-hover-lift text-[14px] text-gray-400 mt-1">Sign in to your affiliate dashboard</p>
        </div>

        {/* Login Card */}
        <div className="btn-hover-lift bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="btn-hover-lift space-y-5">
            {/* Email */}
            <div>
              <label className="btn-hover-lift block text-[13px] font-medium text-gray-300 mb-1.5">Email Address</label>
              <div className="btn-hover-lift relative">
                <svg className="btn-hover-lift absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="btn-hover-lift w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#5ec5dc] transition-colors"
                />
              </div>
            </div>

            {/* Referral Code */}
            <div>
              <label className="btn-hover-lift block text-[13px] font-medium text-gray-300 mb-1.5">Referral Code</label>
              <div className="btn-hover-lift relative">
                <svg className="btn-hover-lift absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <input
                  type={showCode ? 'text' : 'password'}
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  required
                  placeholder="Enter your referral code"
                  className="btn-hover-lift w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#5ec5dc] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="btn-hover-lift absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showCode ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="btn-hover-lift flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#EF4444" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="btn-hover-lift text-[13px] text-red-400">{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-hover-lift w-full py-3 bg-gradient-to-r from-[#2979FF] to-[#0052CC] text-white rounded-xl text-[14px] font-semibold hover:from-[#1565C0] hover:to-[#2979FF] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="btn-hover-lift animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="btn-hover-lift opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="btn-hover-lift opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="btn-hover-lift text-center mt-6 space-y-3">
          <p className="btn-hover-lift text-[13px] text-gray-500">
            <Link href="/affiliate/forgot-password" className="btn-hover-lift text-[#5ec5dc] hover:text-white transition-colors font-medium">
              Forgot your credentials?
            </Link>
          </p>
          <p className="btn-hover-lift text-[13px] text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/affiliate/register" className="btn-hover-lift text-[#5ec5dc] hover:text-white transition-colors font-medium">
              Apply Now
            </Link>
          </p>
          <Link href="/" className="btn-hover-lift inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-white transition-colors">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
