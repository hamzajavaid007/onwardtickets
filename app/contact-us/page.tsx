'use client';

import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const font = 'var(--font-poppins), Poppins, sans-serif';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    'w-full bg-[#EFECEC] border-none rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-all duration-300 focus:shadow-lg focus:shadow-[#2979FF]/20';
  const inputStyle = {
    fontFamily: font,
    fontSize: '16px',
    lineHeight: '19px',
    height: '43px',
    padding: '0 14px',
  };
  const labelStyle = {
    fontFamily: font,
    fontSize: '14px',
    lineHeight: '17px',
    color: '#54595F',
    fontWeight: 500 as const,
  };

  return (
    <div className="w-full bg-white">
      {/* Page Content */}
      <div className="mx-auto max-w-[1240px] px-6 py-12">
        {/* Heading */}
        <div className="mb-8 text-center reveal">
          <h1
            className="text-[#2979FF] glow-text mb-2"
            style={{
              fontFamily: font,
              fontSize: '42px',
              fontWeight: 700,
              lineHeight: '1.2',
            }}
          >
            Contact Us
          </h1>
          <p
            className="text-[#54595F]"
            style={{
              fontFamily: font,
              fontSize: '18px',
              lineHeight: '1.6',
            }}
          >
            Have questions? We&apos;d love to hear from you.
          </p>
          <div
            className="mx-auto mt-6 animate-gradient"
            style={{ width: '100px', height: '4px', background: 'linear-gradient(90deg, #2979FF, #005BFE, #2979FF)' }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          {/* Contact Form */}
          <div className="reveal">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block mb-2" style={labelStyle}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={inputStyle}
                  placeholder="Your full name"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2" style={labelStyle}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={inputStyle}
                  placeholder="Your phone number"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2" style={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={inputStyle}
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2" style={labelStyle}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`${inputClass} resize-vertical transition-all duration-300 focus:shadow-lg focus:shadow-[#2979FF]/20`}
                  style={{ ...inputStyle, height: 'auto', padding: '12px 14px' }}
                  placeholder="How can we help you?"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm mb-5 animate-pulse-slow">
                  {error}
                </div>
              )}

              {submitted && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md text-sm mb-5 animate-fade-up">
                  ✓ Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-hover-lift text-white w-full hover:bg-[#1e3a5f] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  fontFamily: font,
                  fontSize: '15px',
                  fontWeight: 600,
                  background: '#2979FF',
                  height: '50px',
                  borderRadius: '8px',
                  border: 'none',
                }}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information Sidebar */}
          <div className="reveal-right">
            <div
              className="bg-white p-6 card-hover-lift"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
                borderRadius: '8px',
              }}
            >
              <h2
                className="text-[#2979FF] mb-6"
                style={{
                  fontFamily: font,
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                }}
              >
                Address & Contact
              </h2>

              {/* Phone */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-full bg-[#2979FF] text-white flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2v3a2 2 0 012 2v3a2 2 0 012-2h3.28a1 1 0 01.948.684L16 17.316M21 12.79a1 1 0 11-1.414-1.414l-2.012-2.012a1 1 0 01-.617-.617l-2.012-2.012a1 1 0 01.707-.293L16 10.684A1 1 0 0116 9V5a1 1 0 00-1-1H3z"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className="block text-[#54595F] text-sm font-medium mb-1"
                    style={{ fontFamily: font }}
                  >
                    Phone
                  </span>
                  <a
                    href="tel:+447763055200"
                    className="text-[#333333] hover:text-[#2979FF] transition-colors duration-300 link-underline text-lg font-medium"
                    style={{ fontFamily: font }}
                  >
                    +44 7763 055200
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-full bg-[#2979FF] text-white flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 011.11 0H14a2 2 0 011.11 0L21 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className="block text-[#54595F] text-sm font-medium mb-1"
                    style={{ fontFamily: font }}
                  >
                    Email
                  </span>
                  <a
                    href="mailto:contact@onwardtickets.com"
                    className="text-[#333333] hover:text-[#2979FF] transition-colors duration-300 link-underline text-lg font-medium block break-all"
                    style={{ fontFamily: font }}
                  >
                    contact@onwardtickets.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full bg-[#2979FF] text-white flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                <div>
                  <span
                    className="block text-[#54595F] text-sm font-medium mb-1"
                    style={{ fontFamily: font }}
                  >
                    Address
                  </span>
                  <p
                    className="text-[#333333]"
                    style={{ fontFamily: font, fontSize: '15px' }}
                  >
                    OnwardTickets<br />
                    123 Main Street<br />
                    London, UK
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-5">
                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  <span
                    className="text-[#54595F] text-sm font-medium"
                    style={{ fontFamily: font }}
                  >
                    Follow Us
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/onwardtickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#2979FF] text-white flex items-center justify-center hover:bg-[#1e3a5f] hover:scale-110 transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3z" />
                    </svg>
                  </a>
                  {/* Twitter / X */}
                  <a
                    href="https://twitter.com/onwardtickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#2979FF] text-white flex items-center justify-center hover:bg-[#1e3a5f] hover:scale-110 transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@onwardtickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:bg-[#CC0000] hover:scale-110 transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#FFFFFF" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/onwardtickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white flex items-center justify-center hover:scale-110 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
