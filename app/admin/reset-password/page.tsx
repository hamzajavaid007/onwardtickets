'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-red-400 text-[14px] mb-4">Invalid or missing reset token.</p>
        <Link href="/admin/forgot-password" className="text-[#5ec5dc] text-[13px] hover:text-[#7dd3e8] transition-colors font-medium">
          Request a new reset link
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#22C55E" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white text-[15px] mb-2">Password Reset Successfully</p>
        <p className="text-gray-400 text-[13px] mb-6">Your password has been updated. You can now log in with your new password.</p>
        <Link href="/admin/login" className="text-[#5ec5dc] text-[13px] hover:text-[#7dd3e8] transition-colors font-medium">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[13px] font-medium text-gray-300 mb-2">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
          required
          minLength={8}
          placeholder="Enter new password (min 8 characters)"
          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[14px] placeholder:text-gray-500 focus:border-[#5ec5dc] focus:outline-none focus:ring-1 focus:ring-[#5ec5dc]/50 transition-all"
          autoFocus
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-gray-300 mb-2">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
          required
          placeholder="Confirm new password"
          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[14px] placeholder:text-gray-500 focus:border-[#5ec5dc] focus:outline-none focus:ring-1 focus:ring-[#5ec5dc]/50 transition-all"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <span className="text-[13px] text-red-400">{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !password || !confirmPassword}
        className="w-full py-3.5 bg-gradient-to-r from-[#2979FF] to-[#0052CC] hover:from-[#1565C0] hover:to-[#004099] text-white rounded-xl text-[14px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
}

export default function AdminResetPasswordPage() {
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
          <h1 className="text-[24px] font-bold text-white mb-1">Reset Password</h1>
          <p className="text-[14px] text-gray-400">Enter your new password below</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <Suspense fallback={<div className="text-gray-400 text-center">Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
