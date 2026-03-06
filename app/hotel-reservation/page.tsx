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

const HotelReservation = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  const [hotels, setHotels] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [salutation, setSalutation] = useState('Mr.');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rooms, setRooms] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [nationality, setNationality] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [addressCountry, setAddressCountry] = useState('GB');
  const [hotelDetails, setHotelDetails] = useState('');
  const [urgentService, setUrgentService] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<{ type: string; value: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponApplying, setCouponApplying] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [airport, setAirport] = useState('');
  const [airportCountry, setAirportCountry] = useState('Pakistan');
  const [dragOver, setDragOver] = useState(false);
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
        setPricing(data.services['hotel-reservation'] || null);
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
  const URGENT_PRICE = pricing?.urgentPrice || 2.99;
  const SUPERFAST_PRICE = pricing?.superfastPrice || 4.99;
  const currency = pricing?.currency || '£';

  const getSpeedAddon = () => {
    if (urgentService === 'urgent') return URGENT_PRICE;
    if (urgentService === 'superfast') return SUPERFAST_PRICE;
    return 0;
  };

  // Price = base × hotels + extra travelers × extraTravelerPrice + extra rooms × extraRoomPrice + speed
  const extraTravelersPrice = pricing?.extraTravelerPrice || 5.0;
  const extraRoomsPrice = pricing?.extraRoomPrice || 5.0;
  const extraTravelers = travelers > 1 ? (travelers - 1) * extraTravelersPrice : 0;
  const extraRooms = rooms > 1 ? (rooms - 1) * extraRoomsPrice : 0;
  const totalPrice = hotels * BASE_PRICE + extraTravelers + extraRooms + getSpeedAddon();

  const discountAmount = couponDiscount
    ? couponDiscount.type === 'percentage'
      ? (totalPrice * couponDiscount.value) / 100
      : couponDiscount.value
    : 0;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

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
        body: JSON.stringify({ code: couponCode, serviceKey: 'hotel-reservation' }),
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
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const urgencyLabel = urgentService === 'superfast' ? 'Super Fast' : urgentService === 'urgent' ? 'Urgent' : 'Standard';
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'Hotel Reservation',
          serviceKey: 'hotel-reservation',
          name: `${salutation} ${firstName} ${lastName}`,
          email,
          phone,
          travelers,
          amount: finalPrice,
          urgency: urgencyLabel,
          details: `${hotels} Hotel(s), ${rooms} Room(s), ${checkIn} to ${checkOut}`,
          referralCode,
          paymentIntentId,
          formData: {
            hotels, travelers, salutation, firstName, lastName, email, phone,
            rooms, checkIn, checkOut, nationality, addressLine1, addressLine2,
            city, state, zip, addressCountry, hotelDetails, urgentService,
            couponCode, totalPrice: finalPrice, originalPrice: totalPrice, couponDiscount: couponDiscount ? `${couponDiscount.type === 'percentage' ? couponDiscount.value + '%' : '£' + couponDiscount.value} off` : '', airportCountry, airport,
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
          style={{ background: 'url(/hr-hero-bg.jpg) center / cover no-repeat' }}
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
            Hotel Reservation
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
      <section className="w-full" style={{ padding: '20px 0 60px' }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <form onSubmit={handleSubmit}>

            {/* ===== SECTION: Booking Details ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              }}
            >
              <SectionHeading>Booking Details</SectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    No. of Hotels
                  </label>
                  <select
                    value={hotels}
                    onChange={(e) => setHotels(Number(e.target.value))}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1" style={labelStyle}>
                    No. of Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Your Hotel Reservation Price Is:
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

            {/* ===== SECTION: Guest Information ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              }}
            >
              <SectionHeading>Guest Information</SectionHeading>

              {/* Salutation + First + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4 mb-5">
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Salutation
                  </label>
                  <select
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Guest First Name *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Guest Last Name *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Delivery Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Phone No. *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Rooms + Check-in + Check-out */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Number of Rooms
                  </label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Check-In Date *
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Check-Out Date *
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Nationality */}
              <div className="mb-5">
                <label className="block mb-1" style={labelStyle}>
                  Nationality *
                </label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  required
                  className={inputClass}
                  style={inputStyle}
                  placeholder="e.g. Nigerian, British"
                />
              </div>

              {/* Current Address */}
              <div>
                <label className="block mb-2" style={labelStyle}>
                  Current Address
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="Address Line 1"
                    />
                    <span className="block mt-1" style={sublabelStyle}>Address Line 1</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="Address Line 2"
                    />
                    <span className="block mt-1" style={sublabelStyle}>Address Line 2</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="City"
                    />
                    <span className="block mt-1" style={sublabelStyle}>City</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="State"
                    />
                    <span className="block mt-1" style={sublabelStyle}>State</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="Zip/Postal Code"
                    />
                    <span className="block mt-1" style={sublabelStyle}>Zip/Postal Code</span>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <select
                    value={addressCountry}
                    onChange={(e) => setAddressCountry(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="GB">United Kingdom</option>
                    <option value="NG">Nigeria</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="PK">Pakistan</option>
                    <option value="IN">India</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="AU">Australia</option>
                    <option value="IE">Ireland</option>
                  </select>
                  <span className="block mt-1" style={sublabelStyle}>Country</span>
                </div>
              </div>

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
            </div>

            {/* ===== SECTION: Hotel Details ===== */}
            <div
              className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              }}
            >
              <SectionHeading>Hotel Details</SectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Provide Hotel Details: *
                  </label>
                  <textarea
                    value={hotelDetails}
                    onChange={(e) => setHotelDetails(e.target.value)}
                    required
                    rows={5}
                    className={`${inputClass} resize-vertical`}
                    style={{
                      ...inputStyle,
                      height: 'auto',
                      padding: '14px',
                    }}
                    placeholder="e.g. City: Barcelona&#10;Traveler: John Smith&#10;Check-in: March 10, 2026"
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
                      Get your Hotel Reservation in 8-10 Hours
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
                      Get your Hotel Reservation in 1-2 Hours
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block mb-1" style={labelStyle}>
                    Your Hotel Reservation Price Is:
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

              {showPayment && (
                <div className="mt-6">
                  <StripePaymentForm
                    amount={finalPrice}
                    currency={currency}
                    serviceKey="hotel-reservation"
                    email={email}
                    name={`${salutation} ${firstName} ${lastName}`}
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
                  Your hotel reservation has been submitted successfully! You will receive a confirmation email shortly.
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

export default function HotelReservationPage() {
  return <Suspense><HotelReservation /></Suspense>;
}
