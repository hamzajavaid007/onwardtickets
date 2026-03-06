'use client';

import { useState, useRef, DragEvent, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { airportsByCountry } from '@/lib/airports';
import { uploadFile, formatFileSize, validateFile, UploadedFile } from '@/lib/utils/file-upload';
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

const FlightItinerary = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  const [travelers, setTravelers] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [flightDetails, setFlightDetails] = useState('');
  const [flightRoute, setFlightRoute] = useState('Return');
  const [urgentService, setUrgentService] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<{ type: string; value: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponApplying, setCouponApplying] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [airport, setAirport] = useState('');
  const [airportCountry, setAirportCountry] = useState('Pakistan');
  const [dragOver, setDragOver] = useState(false);
  const [travelerInfo, setTravelerInfo] = useState<TravelerInfo[]>([
    { salutation: 'Mr.', firstName: '', lastName: '' },
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
        setPricing(data.services['flight-itinerary'] || null);
      } catch {
        console.error('Failed to fetch pricing');
      } finally {
        setPricingLoading(false);
      }
    };
    fetchPricing();
  }, []);

  // Fallback defaults while loading
  const BASE_PRICE = pricing?.basePrice || 5.0;
  const MULTI_CITY_PRICE = pricing?.multiCityPrice || 4.99;
  const URGENT_PRICE = pricing?.urgentPrice || 2.99;
  const SUPERFAST_PRICE = pricing?.superfastPrice || 4.99;
  const currency = pricing?.currency || '£';

  const getRouteAddon = () => (flightRoute === 'multicity' ? MULTI_CITY_PRICE : 0);
  const getSpeedAddon = () => {
    if (urgentService === 'urgent') return URGENT_PRICE;
    if (urgentService === 'superfast') return SUPERFAST_PRICE;
    return 0;
  };
  const totalPrice = travelers * BASE_PRICE + getRouteAddon() + getSpeedAddon();
  const discountAmount = couponDiscount
    ? couponDiscount.type === 'percentage'
      ? (totalPrice * couponDiscount.value) / 100
      : couponDiscount.value
    : 0;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  const handleTravelerCount = (count: number) => {
    setTravelers(count);
    const newInfo = Array.from({ length: count }, (_, i) =>
      travelerInfo[i] || { salutation: 'Mr.', firstName: '', lastName: '' }
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
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4);
      processFiles(files);
    }
  };

  const processFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);

    const validFiles: File[] = [];
    const errors: string[] = [];

    for (const file of files) {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(validation.error || 'Invalid file');
      }
    }

    // Upload valid files
    for (const file of validFiles) {
      const result = await uploadFile(file, 'flight-itinerary');
      if (result) {
        setUploadedFiles((prev) => [...prev, result]);
      }
    }

    // Also store original files for preview
    setAttachments((prev) => [...prev, ...validFiles].slice(0, 4));

    setUploading(false);

    if (errors.length > 0) {
      console.warn('Upload errors:', errors);
    }
  };

  const removeFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
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
        body: JSON.stringify({ code: couponCode, serviceKey: 'flight-itinerary' }),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Validate required fields
    const mainTraveler = travelerInfo[0];
    if (!mainTraveler.firstName || !mainTraveler.lastName) {
      setSubmitError('Please fill in traveler details');
      return;
    }
    if (!email) {
      setSubmitError('Please enter your email');
      return;
    }
    if (!phone) {
      setSubmitError('Please enter your phone number');
      return;
    }

    // Upload pending files before showing payment
    if (attachments.length > 0 && uploadedFiles.length < attachments.length) {
      await processFiles(attachments);
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
          service: 'Flight Itinerary',
          serviceKey: 'flight-itinerary',
          name: `${mainTraveler.salutation} ${mainTraveler.firstName} ${mainTraveler.lastName}`,
          email,
          phone,
          travelers,
          amount: finalPrice,
          urgency: urgencyLabel,
          details: `${flightRoute} flight, ${travelers} traveler(s)`,
          referralCode,
          paymentIntentId,
          formData: {
            travelers, email, phone, travelerInfo, flightDetails, flightRoute, airportCountry, airport,
            urgentService, couponCode, totalPrice: finalPrice, originalPrice: totalPrice, couponDiscount: couponDiscount ? `${couponDiscount.type === 'percentage' ? couponDiscount.value + '%' : '£' + couponDiscount.value} off` : '',
            attachments: uploadedFiles,
            paymentIntentId,
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
          style={{ background: 'url(/fi-hero-bg.jpg) center / cover no-repeat' }}
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
            Flight Itinerary / Dummy Ticket
          </h1>
          <p
            className="text-white mt-3 text-[18px] sm:text-[20px] md:text-[24px]"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 700,
              lineHeight: '1.3',
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
            The Embassy recommends not purchasing tickets until the visa is approved. Why would you
            risk your time and money? We provide confirmed flight and hotel reservations. Perfect
            solution for digital nomads and travelers who want to extend or apply for visas.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="booking-form" className="w-full" style={{ padding: '20px 0 60px' }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <form onSubmit={handleSubmit}>

            {/* ===== SECTION: Travelers Details ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              }}
            >
              <SectionHeading>Travelers Details</SectionHeading>

              {/* 4 fields in a row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="travelers" className="block mb-1" style={labelStyle}>
                    No. of Travelers
                  </label>
                  <select
                    id="travelers"
                    value={travelers}
                    onChange={(e) => handleTravelerCount(Number(e.target.value))}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <span className="block mt-1" style={sublabelStyle}>Volunteer Roles ?</span>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1" style={labelStyle}>
                    Delivery Email Address *
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
                  <label htmlFor="phone" className="block mb-1" style={labelStyle}>
                    Phone No. *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Your Flight Price Is:
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

            {/* ===== Traveler Name Fields ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] py-6 sm:py-8 mb-5"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              }}
            >
              {travelerInfo.map((traveler, index) => (
                <div key={index} style={{ marginBottom: index < travelerInfo.length - 1 ? '20px' : '0' }}>
                  {/* Salutation label + Traveler N First Name + Last Name headers */}
                  <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4">
                    <div>
                      <label className="block mb-1" style={labelStyle}>
                        Salutation
                      </label>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center justify-center rounded-full bg-[#005CFF] text-white"
                          style={{ width: '28px', height: '28px', fontSize: '14px', fontWeight: 600 }}
                        >
                          {index + 1}
                        </div>
                        <select
                          value={traveler.salutation}
                          onChange={(e) => updateTraveler(index, 'salutation', e.target.value)}
                          className="bg-[#EFECEC] border-none rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#005CFF]"
                          style={{ ...inputStyle, width: '70px' }}
                        >
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Mrs.">Mrs.</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1" style={labelStyle}>
                        Traveler {index + 1} First Name{' '}
                        <span style={sublabelStyle}>(Should match passport)</span>
                      </label>
                      <input
                        type="text"
                        value={traveler.firstName}
                        onChange={(e) => updateTraveler(index, 'firstName', e.target.value)}
                        required
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={labelStyle}>
                        Traveler {index + 1} Last Name{' '}
                        <span style={sublabelStyle}>(Should match passport)</span>
                      </label>
                      <input
                        type="text"
                        value={traveler.lastName}
                        onChange={(e) => updateTraveler(index, 'lastName', e.target.value)}
                        required
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== SECTION: General Information ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              }}
            >
              <SectionHeading>General Information</SectionHeading>

              {/* Flight Details + Attachments side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="flightDetails" className="block mb-1" style={labelStyle}>
                    Provide Travelers Flight Details: *
                  </label>
                  <textarea
                    id="flightDetails"
                    value={flightDetails}
                    onChange={(e) => setFlightDetails(e.target.value)}
                    required
                    rows={5}
                    className={`${inputClass} resize-vertical`}
                    style={{
                      ...inputStyle,
                      height: 'auto',
                      padding: '14px',
                    }}
                    placeholder="e.g. Departing on April 10, 2026 from Manchester (MAN) to Stockholm (ARN); Returning on April 14..."
                  />
                </div>

                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Attachments
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-[3px] flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      dragOver ? 'border-[#005CFF] bg-blue-50' : 'border-gray-300'
                    }`}
                    style={{ height: '140px' }}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleFileDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-500">Drag & Drop or <span className="text-[#005CFF] font-medium">Choose Files</span></p>
                    <p className="text-xs text-gray-400 mt-1">Max 4 files</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {attachments.map((file, i) => (
                        <div key={i} className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                          <span>{file.name}</span>
                          <button type="button" onClick={() => removeFile(i)} className="text-red-500 hover:text-red-700 ml-2">&times;</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Country & Airport Dropdown */}
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

              {/* Flight Route - radio buttons inline */}
              <div>
                <label className="block mb-2" style={labelStyle}>
                  Flight Route *
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="flightRoute"
                      value="oneway"
                      checked={flightRoute === 'oneway'}
                      onChange={(e) => setFlightRoute(e.target.value)}
                      style={{ width: '18px', height: '18px', accentColor: '#005CFF' }}
                    />
                    <span style={{ ...labelStyle, fontWeight: 400 }}>One-Way</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="flightRoute"
                      value="Return"
                      checked={flightRoute === 'Return'}
                      onChange={(e) => setFlightRoute(e.target.value)}
                      style={{ width: '18px', height: '18px', accentColor: '#005CFF' }}
                    />
                    <span style={{ ...labelStyle, fontWeight: 400 }}>Return</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="flightRoute"
                      value="multicity"
                      checked={flightRoute === 'multicity'}
                      onChange={(e) => setFlightRoute(e.target.value)}
                      style={{ width: '18px', height: '18px', accentColor: '#005CFF' }}
                    />
                    <span style={{ ...labelStyle, fontWeight: 400 }}>Multi City (+£4.99)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* ===== SECTION: Urgent Service ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              }}
            >
              <SectionHeading>Urgent Service</SectionHeading>

              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={urgentService === 'urgent'}
                    onChange={() => setUrgentService(urgentService === 'urgent' ? '' : 'urgent')}
                    style={{ width: '18px', height: '18px', accentColor: '#005CFF' }}
                  />
                  <div>
                    <span style={{ ...labelStyle, color: '#005CFF', fontWeight: 500 }}>
                      Urgent Services - £2.99
                    </span>
                    <p style={{ ...sublabelStyle, color: '#005CFF', fontSize: '12px' }}>
                      Get your Flight Itinerary in 8-10 Hours
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={urgentService === 'superfast'}
                    onChange={() => setUrgentService(urgentService === 'superfast' ? '' : 'superfast')}
                    style={{ width: '18px', height: '18px', accentColor: '#005CFF' }}
                  />
                  <div>
                    <span style={{ ...labelStyle, color: '#005CFF', fontWeight: 500 }}>
                      Super Fast Services - £4.99
                    </span>
                    <p style={{ ...sublabelStyle, color: '#005CFF', fontSize: '12px' }}>
                      Get your Flight Itinerary in 1-2 Hours
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* ===== SECTION: Order Summary ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-8 sm:pb-10 mb-5"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              }}
            >
              <SectionHeading>Order Summary</SectionHeading>

              {/* Price + Coupon side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Your Flight Price Is:
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
                      className="text-white hover:opacity-90 transition-opacity"
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
                <div className="mt-6">
                  <StripePaymentForm
                    amount={finalPrice}
                    currency={currency}
                    serviceKey="flight-itinerary"
                    email={email}
                    name={`${travelerInfo[0].salutation} ${travelerInfo[0].firstName} ${travelerInfo[0].lastName}`}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                    disabled={submitting}
                    buttonText={submitting ? 'Processing...' : 'Pay Now'}
                  />
                </div>
              )}
            </div>

            {/* ===== Submit ===== */}
            <div style={{ padding: '15px 0' }}>
              {submitError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm mb-4">{submitError}</div>
              )}
              {submitted && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md text-sm mb-4">
                  Your flight itinerary has been submitted successfully! You will receive it via email shortly.
                </div>
              )}
              {!showPayment && !submitted && (
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0047CC] transition-colors disabled:opacity-50"
                    style={{
                      fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                      padding: '17px 30px',
                      lineHeight: '24px',
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

export default function FlightItineraryPage() {
  return <Suspense><FlightItinerary /></Suspense>;
}
