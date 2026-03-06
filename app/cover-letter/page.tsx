'use client';

import { useState, useRef, DragEvent, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { airportsByCountry } from '@/lib/airports';
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

interface TravelerInfo {
  salutation: string;
  firstName: string;
  lastName: string;
  maritalStatus: string;
  destinationCountry: string;
  nationality: string;
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
        fontStyle: 'normal',
      }}
    >
      {children}
    </h2>
    <div className="mx-auto" style={{ width: '100px', height: '6px', background: '#5ec5dc' }} />
  </div>
);

const CoverLetter = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  const [travelers, setTravelers] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [airport, setAirport] = useState('');
  const [airportCountry, setAirportCountry] = useState('Pakistan');
  const [tripDetails, setTripDetails] = useState('');
  const [financialStandings, setFinancialStandings] = useState('');
  const [sponsorship, setSponsorship] = useState('');
  const [occupation, setOccupation] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgContact, setOrgContact] = useState('');
  const [position, setPosition] = useState('');
  const [familyTies, setFamilyTies] = useState('');
  const [urgentService, setUrgentService] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<{ type: string; value: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponApplying, setCouponApplying] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [travelerInfo, setTravelerInfo] = useState<TravelerInfo[]>([
    { salutation: 'Mr.', firstName: '', lastName: '', maritalStatus: '', destinationCountry: '', nationality: '' },
  ]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Pricing from API
  const [pricing, setPricing] = useState<ServicePricing | null>(null);
  const [pricingLoading, setPricingLoading] = useState(true);

  // Fetch pricing on mount
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch('/api/pricing');
        const data = await res.json();
        setPricing(data.services['cover-letter'] || null);
      } catch {
        console.error('Failed to fetch pricing');
      } finally {
        setPricingLoading(false);
      }
    };
    fetchPricing();
  }, []);

  // Fallback defaults while loading
  const BASE_PRICE = pricing?.basePrice || 15.0;
  const URGENT_PRICE = pricing?.urgentPrice || 4.99;
  const SUPERFAST_PRICE = pricing?.superfastPrice || 9.99;
  const currency = pricing?.currency || '£';

  const getSpeedAddon = () => {
    if (urgentService === 'urgent') return URGENT_PRICE;
    if (urgentService === 'superfast') return SUPERFAST_PRICE;
    return 0;
  };
  const totalPrice = travelers * BASE_PRICE + getSpeedAddon();
  const discountAmount = couponDiscount
    ? couponDiscount.type === 'percentage'
      ? (totalPrice * couponDiscount.value) / 100
      : couponDiscount.value
    : 0;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  const handleTravelerCount = (count: number) => {
    setTravelers(count);
    const newInfo = Array.from({ length: count }, (_, i) =>
      travelerInfo[i] || { salutation: 'Mr.', firstName: '', lastName: '', maritalStatus: '', destinationCountry: '', nationality: '' }
    );
    setTravelerInfo(newInfo);
  };

  const updateTraveler = (index: number, field: keyof TravelerInfo, value: string) => {
    const updated = [...travelerInfo];
    updated[index] = { ...updated[index], [field]: value };
    setTravelerInfo(updated);
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).slice(0, 4);
    setAttachments((prev) => [...prev, ...files].slice(0, 4));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4);
      setAttachments((prev) => [...prev, ...files].slice(0, 4));
    }
  };

  const removeFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponApplying(true);
    setCouponError('');
    setCouponDiscount(null);
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, serviceKey: 'cover-letter' }),
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

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!email) {
      setSubmitError('Please enter your email address.');
      return;
    }
    if (!travelerInfo[0].firstName || !travelerInfo[0].lastName) {
      setSubmitError('Please enter the first and last name for the primary traveler.');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const urgencyLabel = urgentService === 'superfast' ? 'Super Fast' : urgentService === 'urgent' ? 'Urgent' : 'Standard';
      const mainTraveler = travelerInfo[0];
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'Cover Letter',
          serviceKey: 'cover-letter',
          name: `${mainTraveler.salutation} ${mainTraveler.firstName} ${mainTraveler.lastName}`,
          email,
          phone,
          travelers,
          amount: finalPrice,
          urgency: urgencyLabel,
          details: `${mainTraveler.destinationCountry || country} visa cover letter, ${occupation}`,
          referralCode,
          paymentIntentId,
          formData: {
            travelers, dateFrom, dateTo, email, phone, country, airportCountry, airport, travelerInfo,
            tripDetails, financialStandings, sponsorship, occupation, orgAddress,
            orgName, orgContact, position, familyTies, urgentService,
            couponCode, totalPrice: finalPrice, originalPrice: totalPrice, couponDiscount: couponDiscount ? `${couponDiscount.type === 'percentage' ? couponDiscount.value + '%' : '£' + couponDiscount.value} off` : '',
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
  const sublabelStyle = {
    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
    fontSize: '13px',
    color: '#005CFF',
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden" style={{ minHeight: '340px' }}>
        <div
          className="absolute inset-0"
          style={{ background: 'url(/cl-hero-bg.jpg) center / cover no-repeat' }}
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
            Cover Letter
          </h1>
          <p
            className="text-white mt-3 text-[18px] sm:text-[20px] md:text-[24px]"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 700,
              lineHeight: '1.3',
              fontStyle: 'normal',
            }}
          >
            Fill Details – Pay – Get it via Email
          </p>
          <p
            className="text-white/80 mt-5 max-w-[660px]"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '21px',
            }}
          >
            A strong cover letter can set your visa application apart. Whether you need a letter for tourism,
            business, or an extension request, we craft persuasive cover letters tailored to your purpose. Avoid
            generic templates—get a professionally written cover letter that enhances your visa approval
            chances.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="booking-form" className="w-full" style={{ padding: '20px 0 60px' }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <form onSubmit={handleSubmit}>
            {/* Cover Letter Form */}
            <div
              className="bg-white rounded-lg mb-6"
              style={{ padding: '30px 28px', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
            >
              <SectionHeading>Cover Letter</SectionHeading>

              {/* Trip Details Sub-heading */}
              <h3
                className="text-[#005CFF] mb-4"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: '18px',
                  fontWeight: 500,
                  fontStyle: 'normal',
                }}
              >
                Trip Details
              </h3>

              {/* No. of Travelers */}
              <div className="mb-4">
                <label style={labelStyle}>No. of Travelers</label>
                <select
                  className={inputClass}
                  style={inputStyle}
                  value={travelers}
                  onChange={(e) => handleTravelerCount(Number(e.target.value))}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} - £{((i + 1) * BASE_PRICE).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date From / Date To */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={labelStyle}>Date From</label>
                  <input
                    type="date"
                    className={inputClass}
                    style={inputStyle}
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Date To</label>
                  <input
                    type="date"
                    className={inputClass}
                    style={inputStyle}
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>

              {/* Country */}
              <div className="mb-4">
                <label style={labelStyle}>Country</label>
                <input
                  type="text"
                  className={inputClass}
                  style={inputStyle}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. United Kingdom"
                />
              </div>

              {/* Email / Phone */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={labelStyle}>Delivery Email Address</label>
                  <input
                    type="email"
                    className={inputClass}
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone No.</label>
                  <input
                    type="tel"
                    className={inputClass}
                    style={inputStyle}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <label style={labelStyle}>Your Cover Letter Price Is:</label>
                <div
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#069d26',
                    marginTop: '4px',
                  }}
                >
                  {currency}{finalPrice.toFixed(2)}
                </div>
              </div>

              {/* Traveler Information */}
              {travelerInfo.map((t, i) => (
                <div key={i} className="mb-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-full bg-[#005CFF] text-white"
                      style={{
                        width: '28px',
                        height: '28px',
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        marginTop: '22px',
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      {/* Row 1: Salutation, First Name */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label style={labelStyle}>Salutation</label>
                          <select
                            className={inputClass}
                            style={inputStyle}
                            value={t.salutation}
                            onChange={(e) => updateTraveler(i, 'salutation', e.target.value)}
                          >
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>Traveler {i + 1} First Name</label>
                          <input
                            type="text"
                            className={inputClass}
                            style={inputStyle}
                            value={t.firstName}
                            onChange={(e) => updateTraveler(i, 'firstName', e.target.value)}
                          />
                          <span style={sublabelStyle}>Should match passport</span>
                        </div>
                      </div>
                      {/* Row 2: Marital Status, Last Name */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label style={labelStyle}>Marital Status</label>
                          <input
                            type="text"
                            className={inputClass}
                            style={inputStyle}
                            value={t.maritalStatus}
                            onChange={(e) => updateTraveler(i, 'maritalStatus', e.target.value)}
                            placeholder="e.g. Married, Single"
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Traveler {i + 1} Last Name</label>
                          <input
                            type="text"
                            className={inputClass}
                            style={inputStyle}
                            value={t.lastName}
                            onChange={(e) => updateTraveler(i, 'lastName', e.target.value)}
                          />
                          <span style={sublabelStyle}>Should match passport</span>
                        </div>
                      </div>
                      {/* Row 3: Destination Country, Nationality */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label style={labelStyle}>Destination Country</label>
                          <input
                            type="text"
                            className={inputClass}
                            style={inputStyle}
                            value={t.destinationCountry}
                            onChange={(e) => updateTraveler(i, 'destinationCountry', e.target.value)}
                            placeholder="e.g. Canada"
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Nationality</label>
                          <input
                            type="text"
                            className={inputClass}
                            style={inputStyle}
                            value={t.nationality}
                            onChange={(e) => updateTraveler(i, 'nationality', e.target.value)}
                            placeholder="e.g. Nigerian"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {i < travelerInfo.length - 1 && (
                    <div className="border-b border-[#e0e0e0] mt-5" />
                  )}
                </div>
              ))}

              {/* General Information Sub-heading */}
              <h3
                className="text-[#005CFF] mt-6 mb-4"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: '18px',
                  fontWeight: 500,
                  fontStyle: 'normal',
                }}
              >
                General Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Country *
                  </label>
                  <select
                    value={airportCountry}
                    onChange={(e) => { setAirportCountry(e.target.value); setAirport(''); }}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {Object.keys(airportsByCountry).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Airport *
                  </label>
                  <select
                    value={airport}
                    onChange={(e) => setAirport(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">Select Airport</option>
                    {(airportsByCountry[airportCountry] || []).map((ap) => (
                      <option key={ap} value={ap}>{ap}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Provide Trip Details */}
              <div className="mb-4">
                <label style={labelStyle}>Provide Trip Details</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '140px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  value={tripDetails}
                  onChange={(e) => setTripDetails(e.target.value)}
                  placeholder="E.g. Purpose of travel, places to visit, accommodation details..."
                />
                <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '12px', color: '#999', marginTop: '4px' }}>
                  If you want the best cover letter, provide as much details as you can
                </p>
              </div>

              {/* Attachments */}
              <div className="mb-4">
                <label style={labelStyle}>Attachments</label>
                <div
                  className={`border-2 border-dashed rounded-[3px] flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    dragOver ? 'border-[#005CFF] bg-blue-50' : 'border-[#ccc] bg-[#EFECEC]'
                  }`}
                  style={{ height: '140px' }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                  />
                  <svg className="w-8 h-8 mb-2 text-[#005CFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', color: '#54595F' }}>
                    Drag &amp; Drop Files Here
                  </p>
                  <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '11px', color: '#999', marginTop: '4px' }}>
                    Max file uploads: 4
                  </p>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {attachments.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-[#EFECEC] rounded px-3 py-1">
                        <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '12px', color: '#54595F' }}>
                          {file.name}
                        </span>
                        <button type="button" onClick={() => removeFile(i)} className="text-red-500 hover:text-red-700 ml-2 text-sm">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Financial Standings */}
              <div className="mb-4">
                <label style={labelStyle}>Financial Standings</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '80px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  value={financialStandings}
                  onChange={(e) => setFinancialStandings(e.target.value)}
                  placeholder="E.g. Property owned, savings, income details..."
                />
              </div>

              {/* Name of Organization */}
              <div className="mb-4">
                <label style={labelStyle}>Name of Organization</label>
                <input
                  type="text"
                  className={inputClass}
                  style={inputStyle}
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>

              {/* Sponsorship */}
              <div className="mb-4">
                <label style={labelStyle}>Sponsorship</label>
                <input
                  type="text"
                  className={inputClass}
                  style={inputStyle}
                  value={sponsorship}
                  onChange={(e) => setSponsorship(e.target.value)}
                  placeholder="e.g. No, Self-sponsored"
                />
              </div>

              {/* Occupation */}
              <div className="mb-4">
                <label style={labelStyle}>Occupation</label>
                <input
                  type="text"
                  className={inputClass}
                  style={inputStyle}
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Employed, Self-employed"
                />
              </div>

              {/* Address of Organization */}
              <div className="mb-4">
                <label style={labelStyle}>Address of Organization</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '80px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  value={orgAddress}
                  onChange={(e) => setOrgAddress(e.target.value)}
                />
              </div>

              {/* Contact Information of Organization */}
              <div className="mb-4">
                <label style={labelStyle}>Contact Information of Organization</label>
                <input
                  type="text"
                  className={inputClass}
                  style={inputStyle}
                  value={orgContact}
                  onChange={(e) => setOrgContact(e.target.value)}
                />
              </div>

              {/* Your Position */}
              <div className="mb-4">
                <label style={labelStyle}>Your Position</label>
                <input
                  type="text"
                  className={inputClass}
                  style={inputStyle}
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>

              {/* Family Ties */}
              <div className="mb-4">
                <label style={labelStyle}>Family Ties</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '80px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  value={familyTies}
                  onChange={(e) => setFamilyTies(e.target.value)}
                  placeholder="E.g. Married with 2 kids, spouse and children depend on me..."
                />
              </div>
            </div>

            {/* Urgent Service */}
            <div
              className="bg-white rounded-lg mb-6"
              style={{ padding: '30px 28px', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
            >
              <SectionHeading>Urgent Service</SectionHeading>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#005CFF]"
                    checked={urgentService === 'urgent'}
                    onChange={() => setUrgentService(urgentService === 'urgent' ? '' : 'urgent')}
                  />
                  <span style={{ ...labelStyle, color: '#333' }}>
                    Urgent Services — £{URGENT_PRICE.toFixed(2)}
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#005CFF]"
                    checked={urgentService === 'superfast'}
                    onChange={() => setUrgentService(urgentService === 'superfast' ? '' : 'superfast')}
                  />
                  <span style={{ ...labelStyle, color: '#333' }}>
                    Super Fast Services — £{SUPERFAST_PRICE.toFixed(2)}
                  </span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div
              className="bg-white rounded-lg mb-6"
              style={{ padding: '30px 28px', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
            >
              <SectionHeading>Order Summary</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label style={labelStyle}>Your Cover Letter Price Is:</label>
                  <div
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#069d26',
                      marginTop: '4px',
                    }}
                  >
                    {currency}{finalPrice.toFixed(2)}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Coupon</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className={`${inputClass} flex-1`}
                      style={inputStyle}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
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
                  serviceKey="cover-letter"
                  email={email}
                  name={`${travelerInfo[0].salutation} ${travelerInfo[0].firstName} ${travelerInfo[0].lastName}`}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  disabled={submitting}
                  buttonText={submitting ? 'Processing...' : 'Pay Now'}
                />
              )}

              {/* Pay Now Button */}
              {submitError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm mt-4">{submitError}</div>
              )}
              {submitted && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md text-sm mt-4">
                  Your cover letter request has been submitted successfully! You will receive it via email shortly.
                </div>
              )}
              {!showPayment && !submitted && (
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-6 text-white rounded-[3px] cursor-pointer transition-colors hover:opacity-90 disabled:opacity-50"
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '22px',
                    height: '52px',
                    background: '#005CFF',
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

export default function CoverLetterPage() {
  return <Suspense><CoverLetter /></Suspense>;
}
