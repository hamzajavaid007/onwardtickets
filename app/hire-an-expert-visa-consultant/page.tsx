'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import StripePaymentForm from '@/components/StripePaymentForm';

interface ServicePricing {
  basePrice: number;
  urgentPrice: number;
  superfastPrice: number;
  multiCityPrice: number;
  extraTravelerPrice: number;
  extraRoomPrice: number;
  canadaVisaPrice: number;
  schengenVisaPrice: number;
  speedyServicePrice: number;
  currency: string;
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 text-center">
    <h2
      className="text-[#2979FF] mb-2"
      style={{
        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
        fontSize: '22px',
        fontWeight: 500,
        lineHeight: '26px',
        fontStyle: 'normal',
      }}
    >
      {children}
    </h2>
    <div className="mx-auto" style={{ width: '100px', height: '6px', background: '#5ec5dc' }} />
  </div>
);

const HireExpertVisaConsultant = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [concerns, setConcerns] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  // Pricing from API
  const [pricing, setPricing] = useState<ServicePricing | null>(null);
  const [pricingLoading, setPricingLoading] = useState(true);

  // Fetch pricing on mount
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch('/api/pricing');
        const data = await res.json();
        setPricing(data.services['hire-an-expert-visa-consultant'] || null);
      } catch {
        console.error('Failed to fetch pricing');
      } finally {
        setPricingLoading(false);
      }
    };
    fetchPricing();
  }, []);

  // Fallback defaults while loading
  const consultantPrice = pricing?.basePrice || 70.0;
  const currency = pricing?.currency || '£';

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!firstName || !lastName || !email) {
      setSubmitError('Please fill in all required fields.');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'Expert Consultant',
          serviceKey: 'expert-consultant',
          name: `${firstName} ${lastName}`,
          email,
          phone,
          travelers: 1,
          amount: consultantPrice,
          urgency: 'Standard',
          details: `Destination: ${destination}, Purpose: ${purpose}`,
          referralCode,
          paymentIntentId,
          formData: {
            firstName, lastName, email, nationality, phone,
            destination, purpose, concerns, totalPrice: consultantPrice,
          },
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSubmitted(true);
      setShowPayment(false);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setSubmitError(error);
  };

  const inputClass =
    'w-full bg-[#EFECEC] border-none rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#2979FF]';
  const inputStyle = {
    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
    fontSize: '16px',
    lineHeight: '19px',
    height: '43px',
    padding: '0 14px',
  };
  const labelStyle = {
    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#54595F',
    fontWeight: 500 as const,
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden" style={{ minHeight: '340px' }}>
        <div
          className="absolute inset-0"
          style={{ background: 'url(/vc-hero-bg.jpg) center / cover no-repeat' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-[60px]"
          style={{ minHeight: '340px' }}
        >
          <h1
            className="text-white text-[28px] sm:text-[36px] md:text-[48px]"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 700,
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
            }}
          >
            Hire an Expert Visa Consultant
          </h1>
          <p
            className="text-white/80 mt-5 max-w-[660px]"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '28px',
            }}
          >
            Get professional advice and assistance for a smooth visa approval.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="booking-form" className="w-full" style={{ padding: '20px 0 60px' }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <form onSubmit={handleSubmit}>
            {/* Consultant Form */}
            <div
              className="bg-white rounded-lg mb-6"
              style={{ padding: '30px 28px', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
            >
              {/* First Name / Last Name - 2 columns */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={labelStyle}>First Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email / Phone - 2 columns */}
              <div className="grid grid-cols-2 gap-4 mb-1">
                <div>
                  <label style={labelStyle}>Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    className={inputClass}
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', color: '#2979FF' }}>Email</span>
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input
                    type="tel"
                    className={inputClass}
                    style={inputStyle}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Confirm Email / Destination - 2 columns */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="email"
                    className={inputClass}
                    style={inputStyle}
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                  />
                  <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', color: '#2979FF' }}>Confirm Email</span>
                </div>
                <div>
                  <label style={labelStyle}>Destination</label>
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              {/* Nationality */}
              <div className="mb-4">
                <label style={labelStyle}>Nationality</label>
                <input
                  type="text"
                  className={inputClass}
                  style={inputStyle}
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
              </div>
            </div>

            {/* Purpose of travel */}
            <div
              className="bg-white rounded-lg mb-6"
              style={{ padding: '30px 28px', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
            >
              <div className="mb-4">
                <label style={labelStyle}>Purpose of travel</label>
                <input
                  type="text"
                  className={inputClass}
                  style={inputStyle}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>
            </div>

            {/* Your Concerns */}
            <div
              className="bg-white rounded-lg mb-6"
              style={{ padding: '30px 28px', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
            >
              <div>
                <label style={labelStyle}>Your Concerns</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '140px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  placeholder="Example: I'm concerned about the processing time and my chances of approval. I want to ensure that my documents are sufficient, and understand if I need to prepare for an interview. Additionally, I'd like guidance on how a previous visa rejection might affect my application."
                />
              </div>
            </div>

            {/* Payment Section - Total + Stripe side by side */}
            <div
              className="bg-white rounded-lg mb-6"
              style={{ padding: '30px 28px', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Left - Total */}
                <div>
                  <label style={labelStyle}>Total</label>
                  <div
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#069d26',
                      marginTop: '4px',
                    }}
                  >
                    {currency}{consultantPrice.toFixed(2)}
                  </div>
                </div>

                {/* Right - Stripe Payment */}
                {showPayment && (
                  <div>
                    <StripePaymentForm
                      amount={consultantPrice}
                      currency={currency}
                      serviceKey="expert-consultant"
                      email={email}
                      name={`${firstName} ${lastName}`}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                      disabled={submitting}
                      buttonText={submitting ? 'Processing...' : 'Pay Now'}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              {submitError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm mt-4">{submitError}</div>
              )}
              {submitted && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md text-sm mt-4">
                  Your consultation request has been submitted successfully! An expert will contact you shortly.
                </div>
              )}
              {!showPayment && !submitted && (
                <button
                  type="submit"
                  className="btn-hover-lift w-full mt-6 text-white rounded-[3px] cursor-pointer transition-colors hover:opacity-90 disabled:opacity-50"
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '22px',
                    height: '52px',
                    background: '#2979FF',
                  }}
                >
                  Proceed to Payment
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default function HireExpertVisaConsultantPage() {
  return <Suspense><HireExpertVisaConsultant /></Suspense>;
}
