'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = await res.json();

      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="btn-hover-lift min-h-screen flex items-center justify-center bg-[#0B1437] relative overflow-hidden"
      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
    >
      {/* Background decoration */}
      <div className="btn-hover-lift absolute inset-0 pointer-events-none">
        <div className="btn-hover-lift absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#2979FF]/20 blur-3xl" />
        <div className="btn-hover-lift absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#5ec5dc]/10 blur-3xl" />
      </div>

      <div className="btn-hover-lift relative w-full max-w-[440px] mx-4">
        {/* Logo / Brand */}
        <div className="btn-hover-lift text-center mb-8">
          <div className="btn-hover-lift w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#2979FF] to-[#5ec5dc] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="btn-hover-lift text-[24px] font-bold text-white mb-1">Welcome Back</h1>
          <p className="btn-hover-lift text-[14px] text-gray-400">Sign in to your admin dashboard</p>
        </div>

        {/* Login Card */}
        <div className="btn-hover-lift bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="btn-hover-lift space-y-5">
            {/* Email Field */}
            <div>
              <label className="btn-hover-lift block text-[13px] font-medium text-gray-300 mb-2">Email Address</label>
              <div className="btn-hover-lift relative">
                <svg className="btn-hover-lift absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="admin@onwardtickets.com"
                  className="btn-hover-lift w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[14px] placeholder:text-gray-500 focus:border-[#5ec5dc] focus:outline-none focus:ring-1 focus:ring-[#5ec5dc]/50 transition-all"
                  autoFocus
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="btn-hover-lift block text-[13px] font-medium text-gray-300 mb-2">Password</label>
              <div className="btn-hover-lift relative">
                <svg className="btn-hover-lift absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter your password"
                  className="btn-hover-lift w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[14px] placeholder:text-gray-500 focus:border-[#5ec5dc] focus:outline-none focus:ring-1 focus:ring-[#5ec5dc]/50 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn-hover-lift absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.464 6.464m7.072 7.072l3.536 3.536M3 3l18 18" />
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

            {/* Remember Me & Forgot Password */}
            <div className="btn-hover-lift flex items-center justify-between">
              <label className="btn-hover-lift flex items-center gap-2 cursor-pointer group">
                <div className="btn-hover-lift relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="btn-hover-lift sr-only peer"
                  />
                  <div className="btn-hover-lift w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-[#2979FF] peer-checked:border-[#2979FF] transition-all flex items-center justify-center">
                    {rememberMe && (
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="btn-hover-lift text-[13px] text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
              </label>
              <Link
                href="/admin/forgot-password"
                className="btn-hover-lift text-[13px] text-[#5ec5dc] hover:text-[#7dd3e8] transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div className="btn-hover-lift flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <svg className="btn-hover-lift flex-shrink-0" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#EF4444" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="btn-hover-lift text-[13px] text-red-400">{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="btn-hover-lift w-full py-3.5 bg-gradient-to-r from-[#2979FF] to-[#0052CC] hover:from-[#1565C0] hover:to-[#004099] text-white rounded-xl text-[14px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <span className="btn-hover-lift flex items-center justify-center gap-2">
                  <svg className="btn-hover-lift animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="btn-hover-lift opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="btn-hover-lift opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="btn-hover-lift text-center mt-6 space-y-2">
          <p className="btn-hover-lift text-[12px] text-gray-500">
            OnwardTickets Admin Panel
          </p>
          <Link href="/" className="btn-hover-lift inline-flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-gray-300 transition-colors">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
