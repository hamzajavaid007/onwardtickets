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
      className="text-[#005CFF] mb-2"
      style={{
        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
        fontSize: '22px',
        fontWeight: 500,
        lineHeight: '26px',
      }}
    >
      {children}
    </h2>
    <div className="mx-auto" style={{ width: '100px', height: '6px', background: '#5ec5dc' }} />
  </div>
);

const VisaApplicationFormFilling = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [visaType, setVisaType] = useState('Canada');
  const [entryType, setEntryType] = useState('Single');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<{ type: string; value: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponApplying, setCouponApplying] = useState(false);
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
        setPricing(data.services['visa-application-form-filling'] || null);
      } catch {
        console.error('Failed to fetch pricing');
      } finally {
        setPricingLoading(false);
      }
    };
    fetchPricing();
  }, []);

  // Fallback defaults while loading
  const BASE_PRICE = pricing?.basePrice || 120.0;
  const currency = pricing?.currency || '£';
  const totalPrice = BASE_PRICE;

  const discountAmount = couponDiscount
    ? couponDiscount.type === 'percentage'
      ? (totalPrice * couponDiscount.value) / 100
      : couponDiscount.value
    : 0;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponApplying(true);
    setCouponError('');
    setCouponDiscount(null);
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, serviceKey: 'visa-form-filling' }),
      });
      const data = await res.json();
      if (!data.success) {
        setCouponError(data.error);
      } else {
        setCouponDiscount({ type: data.data.discountType, value: data.data.discountValue });
      }
    } catch {
      setCouponError('Failed to validate coupon');
    } finally {
      setCouponApplying(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!fullName || !whatsapp || !email || !confirmEmail || !nationality) {
      setSubmitError('Please fill in all required fields.');
      return;
    }
    if (email !== confirmEmail) {
      setSubmitError('Email addresses do not match.');
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
          service: 'Visa Form Filling',
          serviceKey: 'visa-form-filling',
          name: fullName,
          email,
          phone: whatsapp,
          travelers: 1,
          amount: finalPrice,
          urgency: 'Standard',
          details: `${visaType} Visa, ${entryType}, ${nationality}`,
          referralCode,
          paymentIntentId,
          formData: {
            fullName, whatsapp, visaType, entryType, email, confirmEmail,
            nationality, couponCode, totalPrice: finalPrice, originalPrice: totalPrice, couponDiscount: couponDiscount ? `${couponDiscount.type === 'percentage' ? couponDiscount.value + '%' : '£' + couponDiscount.value} off` : '',
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
    'w-full bg-[#EFECEC] border-none rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#005CFF]';
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
          style={{
            backgroundImage: 'url(/visa-form-hero-bg.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
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
            Visa Application Form Filling
          </h1>
          <p
            className="text-white/80 mt-3"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '28px',
            }}
          >
            Get your visa application form filled accurately and with ease.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="booking-form" className="w-full" style={{ padding: '20px 0 60px' }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <form onSubmit={handleSubmit}>

            {/* ===== SECTION: Applicant Details ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                marginBottom: '20px',
              }}
            >
              <SectionHeading>Applicant Details</SectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="fullName" className="block mb-1" style={labelStyle}>
                    Full Name (as per passport) *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block mb-1" style={labelStyle}>
                    WhatsApp / Telegram Contact *
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2" style={labelStyle}>
                    Visa Type *
                  </label>
                  <div className="flex items-center gap-6">
                    {['Canada', 'Schengen'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="visaType"
                          value={type}
                          checked={visaType === type}
                          onChange={(e) => setVisaType(e.target.value)}
                          style={{ width: '18px', height: '18px', accentColor: '#005CFF' }}
                        />
                        <span style={{ ...labelStyle, fontWeight: 400 }}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-2" style={labelStyle}>
                    Entry Type *
                  </label>
                  <div className="flex items-center gap-6">
                    {['Single', 'Multiple'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="entryType"
                          value={type}
                          checked={entryType === type}
                          onChange={(e) => setEntryType(e.target.value)}
                          style={{ width: '18px', height: '18px', accentColor: '#005CFF' }}
                        />
                        <span style={{ ...labelStyle, fontWeight: 400 }}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block mb-1" style={labelStyle}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="confirmEmail" className="block mb-1" style={labelStyle}>
                    Confirm Email Address *
                  </label>
                  <input
                    type="email"
                    id="confirmEmail"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nationality" className="block mb-1" style={labelStyle}>
                    Nationality *
                  </label>
                  <select
                    id="nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">Select Nationality</option>
                    <option value="Pakistani">Pakistani</option>
                    <option value="British">British</option>
                    <option value="American">American</option>
                    <option value="Canadian">Canadian</option>
                    <option value="Nigerian">Nigerian</option>
                    <option value="Indian">Indian</option>
                    <option value="German">German</option>
                    <option value="French">French</option>
                    <option value="Australian">Australian</option>
                    <option value="Filipino">Filipino</option>
                    <option value="Bangladeshi">Bangladeshi</option>
                    <option value="Egyptian">Egyptian</option>
                    <option value="Saudi">Saudi</option>
                    <option value="Emirati">Emirati</option>
                    <option value="South African">South African</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Your Price Is:
                  </label>
                  <div
                    className="flex items-center"
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#069d26',
                      height: '43px',
                    }}
                  >
                    {currency}{finalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* ===== SECTION: Order Summary ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-8 sm:pb-10"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                marginBottom: '20px',
              }}
            >
              <SectionHeading>Order Summary</SectionHeading>

              {/* Price + Coupon side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Total Amount:
                  </label>
                  <div
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#069d26',
                    }}
                  >
                    {currency}{finalPrice.toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Coupon
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className={`${inputClass} flex-1`}
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      disabled={couponApplying}
                      className="text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                      style={{
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        background: '#5ec5dc',
                        padding: '0 24px',
                        height: '43px',
                        borderRadius: '3px',
                        border: 'none',
                      }}
                    >
                      {couponApplying ? '...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-xs mt-1">{couponError}</p>
                  )}
                  {couponDiscount && (
                    <p className="text-green-600 text-xs mt-1">
                      Coupon applied! {couponDiscount.type === 'percentage' ? `${couponDiscount.value}%` : `£${couponDiscount.value}`} off
                      {discountAmount > 0 && ` (-£${discountAmount.toFixed(2)})`}
                    </p>
                  )}
                </div>
              </div>

              {/* Stripe Payment */}
              {showPayment && (
                <StripePaymentForm
                  amount={finalPrice}
                  currency={currency}
                  serviceKey="visa-form-filling"
                  email={email}
                  name={fullName}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  buttonText="Pay Now"
                  buttonClassName="text-white hover:bg-[#1e3a5f] transition-colors disabled:opacity-50"
                  buttonStyle={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    background: '#005CFF',
                    height: '40px',
                    padding: '0 30px',
                    borderRadius: '3px',
                    border: 'none',
                  }}
                />
              )}
            </div>

            {/* ===== Submit ===== */}
            <div style={{ padding: '15px 0' }}>
              {submitError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm mb-4">{submitError}</div>
              )}
              {submitted && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md text-sm mb-4">
                  Your visa application form filling request has been submitted successfully!
                </div>
              )}
              {!showPayment && !submitted && (
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="text-white hover:bg-[#1e3a5f] transition-colors disabled:opacity-50"
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      background: '#005CFF',
                      height: '40px',
                      padding: '0 30px',
                      borderRadius: '3px',
                      border: 'none',
                    }}
                  >
                    Proceed to Payment
                  </button>
                </div>
              )}
            </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default function VisaApplicationFormFillingPage() {
  return <Suspense><VisaApplicationFormFilling /></Suspense>;
}
