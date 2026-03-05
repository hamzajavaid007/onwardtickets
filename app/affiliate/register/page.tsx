'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AffiliateRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    platform: '',
    audience: '',
    promotion: '',
    bankDetails: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/affiliates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="btn-hover-lift w-full bg-white" style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif' }}>

      {/* ===== HERO SECTION ===== */}
      <section
        className="btn-hover-lift relative w-full flex flex-col items-center justify-center text-center"
        style={{ marginTop: '-85px', paddingTop: '85px' }}
      >
        <div
          className="btn-hover-lift absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/partner-hero-bg.jpg)' }}
        />
        <div className="btn-hover-lift absolute inset-0 bg-black/50" />
        <div className="btn-hover-lift relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0 py-[60px] sm:py-[80px] lg:py-[100px] flex flex-col items-center gap-[16px]">
          <h1
            className="btn-hover-lift text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-white"
            style={{ lineHeight: '1.3' }}
          >
            Apply to Join Our Affiliate Program
          </h1>
          <p
            className="btn-hover-lift text-[18px] lg:text-[20px] font-normal text-white/90 max-w-[700px]"
            style={{ lineHeight: '1.5' }}
          >
            Fill in the form below and we&apos;ll review your application within 24&ndash;48 hours.
          </p>
        </div>
      </section>

      {/* ===== REGISTRATION FORM ===== */}
      <section className="btn-hover-lift w-full py-[40px] sm:py-[60px] lg:py-[80px]" style={{ background: '#F5F9FE' }}>
        <div className="btn-hover-lift mx-auto max-w-[800px] px-4 sm:px-6 lg:px-0">

          {submitted ? (
            <div className="btn-hover-lift bg-white rounded-[20px] p-[30px] sm:p-[40px] lg:p-[60px] text-center" style={{ boxShadow: '0 14px 30px rgba(109, 109, 109, 0.15)' }}>
              <div className="btn-hover-lift w-[80px] h-[80px] rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-[24px]">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="btn-hover-lift text-[24px] font-bold text-[#2979FF] mb-[12px]">Application Submitted!</h3>
              <p className="btn-hover-lift text-[16px] text-[#2B2B2B]" style={{ lineHeight: '1.6' }}>
                Thank you for applying to our affiliate program. We&apos;ll review your application and get back to you within 24&ndash;48 hours at the email address you provided.
              </p>
              <Link
                href="/become-a-partner"
                className="btn-hover-lift inline-flex items-center gap-[8px] mt-[24px] text-[#2979FF] font-semibold text-[15px] hover:underline"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Partner Page
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="btn-hover-lift bg-white rounded-[20px] p-[20px] sm:p-[30px] lg:p-[50px]"
              style={{ boxShadow: '0 14px 30px rgba(109, 109, 109, 0.15)' }}
            >
              <div className="btn-hover-lift grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                {/* Name */}
                <div>
                  <label className="btn-hover-lift block text-[14px] font-medium text-[#54595F] mb-[6px]">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="btn-hover-lift w-full bg-[#EFECEC] rounded-[3px] px-[14px] py-[12px] text-[14px] text-[#333] focus:outline-none focus:ring-2 focus:ring-[#2979FF] border-none"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="btn-hover-lift block text-[14px] font-medium text-[#54595F] mb-[6px]">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="btn-hover-lift w-full bg-[#EFECEC] rounded-[3px] px-[14px] py-[12px] text-[14px] text-[#333] focus:outline-none focus:ring-2 focus:ring-[#2979FF] border-none"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="btn-hover-lift block text-[14px] font-medium text-[#54595F] mb-[6px]">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+44 77561 525115"
                    className="btn-hover-lift w-full bg-[#EFECEC] rounded-[3px] px-[14px] py-[12px] text-[14px] text-[#333] focus:outline-none focus:ring-2 focus:ring-[#2979FF] border-none"
                  />
                </div>
                {/* Website */}
                <div>
                  <label className="btn-hover-lift block text-[14px] font-medium text-[#54595F] mb-[6px]">Website / Blog URL</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourblog.com"
                    className="btn-hover-lift w-full bg-[#EFECEC] rounded-[3px] px-[14px] py-[12px] text-[14px] text-[#333] focus:outline-none focus:ring-2 focus:ring-[#2979FF] border-none"
                  />
                </div>
                {/* Platform */}
                <div>
                  <label className="btn-hover-lift block text-[14px] font-medium text-[#54595F] mb-[6px]">Platform Type *</label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    required
                    className="btn-hover-lift w-full bg-[#EFECEC] rounded-[3px] px-[14px] py-[12px] text-[14px] text-[#333] focus:outline-none focus:ring-2 focus:ring-[#2979FF] border-none appearance-none"
                  >
                    <option value="">Select your platform</option>
                    <option value="Blog">Blog / Website</option>
                    <option value="YouTube">YouTube Channel</option>
                    <option value="Social Media">Social Media (Instagram, TikTok, etc.)</option>
                    <option value="Forum">Forum / Community</option>
                    <option value="Email List">Email Newsletter</option>
                    <option value="Visa Consultant">Visa Consultant / Travel Agency</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* Audience Size */}
                <div>
                  <label className="btn-hover-lift block text-[14px] font-medium text-[#54595F] mb-[6px]">Audience Size</label>
                  <select
                    name="audience"
                    value={formData.audience}
                    onChange={handleChange}
                    className="btn-hover-lift w-full bg-[#EFECEC] rounded-[3px] px-[14px] py-[12px] text-[14px] text-[#333] focus:outline-none focus:ring-2 focus:ring-[#2979FF] border-none appearance-none"
                  >
                    <option value="">Select audience size</option>
                    <option value="Under 1K">Under 1,000</option>
                    <option value="1K-5K">1,000 - 5,000</option>
                    <option value="5K-10K">5,000 - 10,000</option>
                    <option value="10K-50K">10,000 - 50,000</option>
                    <option value="50K-100K">50,000 - 100,000</option>
                    <option value="100K+">100,000+</option>
                  </select>
                </div>
              </div>

              {/* How will you promote */}
              <div className="btn-hover-lift mt-[20px]">
                <label className="btn-hover-lift block text-[14px] font-medium text-[#54595F] mb-[6px]">How will you promote OnwardTickets?</label>
                <textarea
                  name="promotion"
                  value={formData.promotion}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your content strategy, audience demographics, and how you plan to promote our services..."
                  className="btn-hover-lift w-full bg-[#EFECEC] rounded-[3px] px-[14px] py-[12px] text-[14px] text-[#333] focus:outline-none focus:ring-2 focus:ring-[#2979FF] border-none resize-none"
                />
              </div>

              {/* Bank Details */}
              <div className="btn-hover-lift mt-[20px]">
                <label className="btn-hover-lift block text-[14px] font-medium text-[#54595F] mb-[6px]">Bank Details for Payouts</label>
                <textarea
                  name="bankDetails"
                  value={formData.bankDetails}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Account holder name, bank name, sort code, account number (or IBAN for international transfers)"
                  className="btn-hover-lift w-full bg-[#EFECEC] rounded-[3px] px-[14px] py-[12px] text-[14px] text-[#333] focus:outline-none focus:ring-2 focus:ring-[#2979FF] border-none resize-none"
                />
              </div>

              {/* Terms checkbox */}
              <div className="btn-hover-lift mt-[20px] flex items-start gap-[10px]">
                <input type="checkbox" required id="terms" className="btn-hover-lift mt-1 accent-[#2979FF]" />
                <label htmlFor="terms" className="btn-hover-lift text-[13px] text-[#54595F]">
                  I agree to the affiliate program terms and conditions. I understand that my application will be reviewed and I will be notified via email.
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="btn-hover-lift mt-[16px] bg-red-50 text-red-600 px-[16px] py-[12px] rounded-[8px] text-[14px]">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-hover-lift mt-[24px] w-full bg-[#2979FF] text-white rounded-[15px] px-[16px] py-[16px] text-[16px] font-bold hover:bg-[#1565C0] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          )}

          {/* Already have an account */}
          <div className="btn-hover-lift text-center mt-[24px]">
            <p className="btn-hover-lift text-[14px] text-[#54595F]">
              Already an affiliate?{' '}
              <Link href="/affiliate/login" className="btn-hover-lift text-[#2979FF] font-semibold hover:underline">
                Log in to your dashboard
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
