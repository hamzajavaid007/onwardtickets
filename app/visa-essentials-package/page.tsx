'use client';

import { useState, useRef, DragEvent, Suspense, useEffect } from 'react';
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
        fontStyle: 'normal',
      }}
    >
      {children}
    </h2>
    <div className="mx-auto" style={{ width: '100px', height: '6px', background: '#5ec5dc' }} />
  </div>
);

const VisaEssentialsPackage = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  const [travelers, setTravelers] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [visaType, setVisaType] = useState('Temporary Resident');
  const [entryType, setEntryType] = useState('Single Entry');
  const [applyFor, setApplyFor] = useState('');

  // Traveler info (up to 7 + additional text)
  const [travelerInfo, setTravelerInfo] = useState<TravelerInfo[]>([
    { salutation: 'Mr.', firstName: '', lastName: '' },
  ]);
  const [additionalTravelers, setAdditionalTravelers] = useState('');

  // Flight Details
  const [flightDetails, setFlightDetails] = useState('');
  const [flightRoute, setFlightRoute] = useState('One-Way');
  const [flightAttachments, setFlightAttachments] = useState<File[]>([]);
  const [flightDragOver, setFlightDragOver] = useState(false);
  const flightFileRef = useRef<HTMLInputElement | null>(null);

  // Hotel Details
  const [noOfHotels, setNoOfHotels] = useState(1);
  const [noOfRooms, setNoOfRooms] = useState(1);
  const [hotelDetails, setHotelDetails] = useState('');
  const [hotelAttachments, setHotelAttachments] = useState<File[]>([]);
  const [hotelDragOver, setHotelDragOver] = useState(false);
  const hotelFileRef = useRef<HTMLInputElement | null>(null);

  // Travel Plan
  const [travelDetails, setTravelDetails] = useState('');

  // Cover Letter
  const [tripDetails, setTripDetails] = useState('');
  const [financialStandings, setFinancialStandings] = useState('');
  const [sponsorship, setSponsorship] = useState('');
  const [coverLetterAttachments, setCoverLetterAttachments] = useState<File[]>([]);
  const [coverLetterDragOver, setCoverLetterDragOver] = useState(false);
  const coverLetterFileRef = useRef<HTMLInputElement | null>(null);

  // Position of employment
  const [occupation, setOccupation] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgContact, setOrgContact] = useState('');
  const [position, setPosition] = useState('');

  // Speedy Services
  const [speedyService, setSpeedyService] = useState(false);

  // Order Summary
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
        setPricing(data.services['visa-essentials-package'] || null);
      } catch {
        console.error('Failed to fetch pricing');
      } finally {
        setPricingLoading(false);
      }
    };
    fetchPricing();
  }, []);

  // Fallback defaults while loading
  const basePricePerTraveler = pricing?.basePrice || 70;
  const canadaVisaPrice = pricing?.canadaVisaPrice || 80;
  const schengenVisaPrice = pricing?.schengenVisaPrice || 20;
  const multiCityPriceVal = pricing?.multiCityPrice || 2.99;
  const speedyPriceVal = pricing?.speedyServicePrice || 9.99;
  const currency = pricing?.currency || '£';

  // Pricing
  const basePrice = travelers * basePricePerTraveler;
  const applyForPrice = applyFor === 'Canada Visa' ? canadaVisaPrice : applyFor === 'Schengen Visa' ? schengenVisaPrice : 0;
  const multiCityPrice = flightRoute === 'Multi City (+$2.99)' ? multiCityPriceVal : 0;
  const speedyPrice = speedyService ? speedyPriceVal : 0;
  const totalPrice = basePrice + applyForPrice + multiCityPrice + speedyPrice;
  const discountAmount = couponDiscount
    ? couponDiscount.type === 'percentage'
      ? (totalPrice * couponDiscount.value) / 100
      : couponDiscount.value
    : 0;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  // Update traveler info when slider changes
  const handleTravelerChange = (val: number) => {
    setTravelers(val);
    const newInfo: TravelerInfo[] = [];
    for (let i = 0; i < Math.min(val, 7); i++) {
      newInfo.push(
        travelerInfo[i] || { salutation: 'Mr.', firstName: '', lastName: '' }
      );
    }
    setTravelerInfo(newInfo);
  };

  const updateTraveler = (idx: number, field: keyof TravelerInfo, value: string) => {
    const updated = [...travelerInfo];
    updated[idx] = { ...updated[idx], [field]: value };
    setTravelerInfo(updated);
  };

  // File upload helpers
  const handleFileDrop = (
    e: DragEvent<HTMLDivElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    setDrag: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    setDrag(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (
    idx: number,
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    setFiles(files.filter((_, i) => i !== idx));
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
        body: JSON.stringify({ code: couponCode, serviceKey: 'visa-essentials' }),
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
      const mainTraveler = travelerInfo[0];
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'Visa Essentials',
          serviceKey: 'visa-essentials',
          name: `${mainTraveler.salutation} ${mainTraveler.firstName} ${mainTraveler.lastName}`,
          email,
          phone,
          travelers,
          amount: finalPrice,
          urgency: speedyService ? 'Speedy' : 'Standard',
          details: `${applyFor || 'Visa'}, ${visaType}, ${entryType}`,
          referralCode,
          paymentIntentId,
          formData: {
            travelers, email, phone, nationality, visaType, entryType, applyFor,
            travelerInfo, additionalTravelers, flightDetails, flightRoute,
            noOfHotels, noOfRooms, hotelDetails, travelDetails, tripDetails,
            financialStandings, sponsorship, occupation, orgAddress, orgName,
            orgContact, position, speedyService, couponCode, totalPrice: finalPrice, originalPrice: totalPrice, couponDiscount: couponDiscount ? `${couponDiscount.type === 'percentage' ? couponDiscount.value + '%' : '£' + couponDiscount.value} off` : '',
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
  const cardStyle = {
    padding: '30px 28px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
  };

  const FileUploadArea = ({
    files,
    setFiles,
    dragOver,
    setDragOver,
    fileRef,
  }: {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    dragOver: boolean;
    setDragOver: React.Dispatch<React.SetStateAction<boolean>>;
    fileRef: React.RefObject<HTMLInputElement | null>;
  }) => (
    <div className="mb-4">
      <label style={labelStyle}>Attachments</label>
      <div
        className={`mt-1 border-2 border-dashed rounded-[3px] text-center cursor-pointer transition-colors ${
          dragOver ? 'border-[#005CFF] bg-blue-50' : 'border-gray-300 bg-[#EFECEC]'
        }`}
        style={{ padding: '24px 14px' }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => handleFileDrop(e, setFiles, setDragOver)}
        onClick={() => fileRef.current?.click()}
      >
        <p style={{ ...sublabelStyle, color: '#54595F' }}>
          Drag & Drop or <span className="text-[#005CFF] underline">Browse</span>
        </p>
        <input
          ref={fileRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e, setFiles)}
        />
      </div>
      {files.length > 0 && (
        <div className="mt-2 space-y-1">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between bg-[#EFECEC] rounded px-3 py-1">
              <span style={{ ...sublabelStyle, color: '#54595F' }}>{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i, files, setFiles)}
                className="text-red-500 text-sm ml-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden" style={{ minHeight: '340px' }}>
        <div
          className="absolute inset-0"
          style={{ background: 'url(/ve-hero-bg.jpg) center / cover no-repeat' }}
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
            Visa Essentials Package
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
            Ensure you have the right documents to strengthen your visa application.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="booking-form" className="w-full" style={{ padding: '40px 0 60px' }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <form onSubmit={handleSubmit}>
            {/* Travelers Details */}
            <div className="bg-white rounded-lg mb-6" style={cardStyle}>
              <SectionHeading>Travelers Details</SectionHeading>

              {/* No. of Travelers slider */}
              <div className="mb-4">
                <label style={labelStyle}>
                  No. of Travelers: <strong>{travelers}</strong>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={travelers}
                  onChange={(e) => handleTravelerChange(Number(e.target.value))}
                  className="w-full mt-2 accent-[#005CFF]"
                />
                <div className="flex justify-between" style={{ ...sublabelStyle, fontSize: '12px', color: '#999' }}>
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>

              {/* Email / Phone */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={labelStyle}>Delivery Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    className={inputClass}
                    style={inputStyle}
                    placeholder="jhon.rick@gmail.com"
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
                    placeholder="Country Code + Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Price display */}
              <div className="mb-6">
                <label style={labelStyle}>Your Visa Essentials Package Price Is:</label>
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

              {/* Traveler Names */}
              {travelerInfo.map((t, idx) => (
                <div key={idx} className="mb-5 pb-4 border-b border-gray-200 last:border-b-0">
                  <p
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#005CFF',
                      marginBottom: '8px',
                    }}
                  >
                    Traveler {idx + 1}
                  </p>

                  {/* Salutation */}
                  <div className="mb-3">
                    <label style={labelStyle}>Salutation</label>
                    <div className="flex gap-4 mt-1">
                      {['Mr.', 'Ms.', 'Mrs.'].map((s) => (
                        <label key={s} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name={`salutation-${idx}`}
                            value={s}
                            checked={t.salutation === s}
                            onChange={() => updateTraveler(idx, 'salutation', s)}
                            className="accent-[#005CFF]"
                          />
                          <span style={{ ...labelStyle, fontWeight: 400 }}>{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* First / Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>First Name (Should match passport)</label>
                      <input
                        type="text"
                        className={inputClass}
                        style={inputStyle}
                        value={t.firstName}
                        onChange={(e) => updateTraveler(idx, 'firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name (Should match passport)</label>
                      <input
                        type="text"
                        className={inputClass}
                        style={inputStyle}
                        value={t.lastName}
                        onChange={(e) => updateTraveler(idx, 'lastName', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional travelers text area (for 8+) */}
              {travelers > 7 && (
                <div className="mb-4">
                  <label style={labelStyle}>Add More Travelers Names</label>
                  <textarea
                    className={inputClass}
                    style={{
                      ...inputStyle,
                      height: '100px',
                      padding: '12px 14px',
                      resize: 'vertical' as const,
                    }}
                    placeholder="(Traveler 8 - First Name, Last Name) (Traveler 9 - First Name, Last Name) (Traveler 10 - First Name, Last Name) etc."
                    value={additionalTravelers}
                    onChange={(e) => setAdditionalTravelers(e.target.value)}
                  />
                </div>
              )}

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

              {/* Type selectors */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={labelStyle}>Type</label>
                  <select
                    className={inputClass}
                    style={inputStyle}
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                  >
                    <option>Temporary Resident</option>
                    <option>Visit Visa</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Type</label>
                  <select
                    className={inputClass}
                    style={inputStyle}
                    value={entryType}
                    onChange={(e) => setEntryType(e.target.value)}
                  >
                    <option>Single Entry</option>
                    <option>Multiple Entry</option>
                  </select>
                </div>
              </div>

              {/* Divider note */}
              <div
                className="mb-4 text-center"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: '13px',
                  color: '#54595F',
                  fontStyle: 'italic',
                  padding: '10px 0',
                  borderTop: '1px solid #e5e5e5',
                  borderBottom: '1px solid #e5e5e5',
                }}
              >
                Note: Once you place your order, our visa expert will reach out and handle everything for you.
              </div>

              {/* Apply for */}
              <div className="mb-2">
                <label style={labelStyle}>Apply for</label>
                <div className="flex gap-4 mt-1">
                  {[
                    { label: 'Canada Visa', price: '£80.00' },
                    { label: 'Schengen Visa', price: '£20.00' },
                  ].map((opt) => (
                    <label key={opt.label} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="applyFor"
                        value={opt.label}
                        checked={applyFor === opt.label}
                        onChange={() => setApplyFor(opt.label)}
                        className="accent-[#005CFF]"
                      />
                      <span style={{ ...labelStyle, fontWeight: 400 }}>
                        {opt.label} ({opt.price})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div className="bg-white rounded-lg mb-6" style={cardStyle}>
              <SectionHeading>Flight Details</SectionHeading>

              <div className="mb-4">
                <label style={labelStyle}>Provide Travelers Flight Details:</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '120px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  placeholder="Departing on June 1, 2017 from Los Angeles(LAX) to Frankfurt(FRA); Returning on June 10, 2017 from Frankfurt(FRA) to Los Angeles(LAX) or Type &quot;Please see attachment&quot;."
                  value={flightDetails}
                  onChange={(e) => setFlightDetails(e.target.value)}
                />
              </div>

              {/* Flight Route */}
              <div className="mb-4">
                <label style={labelStyle}>Flight Route</label>
                <div className="flex gap-4 mt-1">
                  {['One-Way', 'Return', 'Multi City (+$2.99)'].map((r) => (
                    <label key={r} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="flightRoute"
                        value={r}
                        checked={flightRoute === r}
                        onChange={() => setFlightRoute(r)}
                        className="accent-[#005CFF]"
                      />
                      <span style={{ ...labelStyle, fontWeight: 400 }}>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <FileUploadArea
                files={flightAttachments}
                setFiles={setFlightAttachments}
                dragOver={flightDragOver}
                setDragOver={setFlightDragOver}
                fileRef={flightFileRef}
              />
            </div>

            {/* Hotel Details */}
            <div className="bg-white rounded-lg mb-6" style={cardStyle}>
              <SectionHeading>Hotel Details</SectionHeading>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={labelStyle}>
                    No. of Hotels: <strong>{noOfHotels}</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={noOfHotels}
                    onChange={(e) => setNoOfHotels(Number(e.target.value))}
                    className="w-full mt-2 accent-[#005CFF]"
                  />
                  <div className="flex justify-between" style={{ ...sublabelStyle, fontSize: '12px', color: '#999' }}>
                    <span>1</span>
                    <span>5</span>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>
                    No. of Rooms: <strong>{noOfRooms}</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={noOfRooms}
                    onChange={(e) => setNoOfRooms(Number(e.target.value))}
                    className="w-full mt-2 accent-[#005CFF]"
                  />
                  <div className="flex justify-between" style={{ ...sublabelStyle, fontSize: '12px', color: '#999' }}>
                    <span>1</span>
                    <span>5</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label style={labelStyle}>Provide Hotel Details:</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '120px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  placeholder="( Hotel 1: in Tokyo, Check-In Date 03 May 2025 to 13 May 2025 Hotel 2: in Osaka , Check- In Date 13 May 2025 to 21 May 2025 )"
                  value={hotelDetails}
                  onChange={(e) => setHotelDetails(e.target.value)}
                />
              </div>

              <FileUploadArea
                files={hotelAttachments}
                setFiles={setHotelAttachments}
                dragOver={hotelDragOver}
                setDragOver={setHotelDragOver}
                fileRef={hotelFileRef}
              />
            </div>

            {/* Travel Plan */}
            <div className="bg-white rounded-lg mb-6" style={cardStyle}>
              <SectionHeading>Travel Plan</SectionHeading>

              <div className="mb-4">
                <label style={labelStyle}>Travel Details</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '120px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  placeholder="(Provide any relevant details about your trip, such as planned events, meetings, or activities you will be attending.)"
                  value={travelDetails}
                  onChange={(e) => setTravelDetails(e.target.value)}
                />
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-white rounded-lg mb-6" style={cardStyle}>
              <SectionHeading>Cover Letter</SectionHeading>

              <div className="mb-4">
                <label style={labelStyle}>Provide Trip Details</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '120px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  placeholder="(Tell us the details of your trip. What is the purpose of this trip? How long is it, and when does it start)"
                  value={tripDetails}
                  onChange={(e) => setTripDetails(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label style={labelStyle}>Financial Standings &amp; Family Ties</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '120px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  placeholder="(Provide details on your family and financial situation. How many family members do you have? Are you married? Do you have kids? Who depends on you financially? Also, briefly mention your income sources and financial stability.)"
                  value={financialStandings}
                  onChange={(e) => setFinancialStandings(e.target.value)}
                />
              </div>

              <FileUploadArea
                files={coverLetterAttachments}
                setFiles={setCoverLetterAttachments}
                dragOver={coverLetterDragOver}
                setDragOver={setCoverLetterDragOver}
                fileRef={coverLetterFileRef}
              />

              <div className="mb-4">
                <label style={labelStyle}>Sponsorship</label>
                <textarea
                  className={inputClass}
                  style={{
                    ...inputStyle,
                    height: '100px',
                    padding: '12px 14px',
                    resize: 'vertical' as const,
                  }}
                  placeholder="(Please state if someone is sponsoring your trip. State their details and their financial standing)"
                  value={sponsorship}
                  onChange={(e) => setSponsorship(e.target.value)}
                />
              </div>

              {/* Position of employment */}
              <div
                className="mt-5 pt-4 border-t border-gray-200"
                style={{ marginBottom: '4px' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#005CFF',
                    marginBottom: '12px',
                  }}
                >
                  Position of employment:
                </p>

                <div className="mb-4">
                  <label style={labelStyle}>Occupation</label>
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Employed/ Business"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>

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
                    placeholder="(Flat, 33 High Street, Taunton England, TA1 3PN)"
                    value={orgAddress}
                    onChange={(e) => setOrgAddress(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label style={labelStyle}>Name of Organization</label>
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    placeholder="(The CloudOps LTD)"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label style={labelStyle}>Contact Information of Organization</label>
                  <textarea
                    className={inputClass}
                    style={{
                      ...inputStyle,
                      height: '80px',
                      padding: '12px 14px',
                      resize: 'vertical' as const,
                    }}
                    placeholder="(+44 77561 525115 contact@onwardtickets.com)"
                    value={orgContact}
                    onChange={(e) => setOrgContact(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label style={labelStyle}>Your Position</label>
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    placeholder="(Technical Content Writer)"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Speedy Services */}
            <div className="bg-white rounded-lg mb-6" style={cardStyle}>
              <SectionHeading>Speedy Services</SectionHeading>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={speedyService}
                  onChange={(e) => setSpeedyService(e.target.checked)}
                  className="accent-[#005CFF] w-5 h-5"
                />
                <span style={{ ...labelStyle, fontWeight: 400 }}>
                  Speedy Services (£9.99)
                </span>
              </label>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg mb-6" style={cardStyle}>
              <SectionHeading>Order Summary</SectionHeading>

              {/* Price breakdown */}
              <div className="mb-4 space-y-2">
                <div className="flex justify-between" style={labelStyle}>
                  <span>Base ({travelers} traveler{travelers > 1 ? 's' : ''}):</span>
                  <span>£{basePrice.toFixed(2)}</span>
                </div>
                {applyFor && (
                  <div className="flex justify-between" style={labelStyle}>
                    <span>{applyFor}:</span>
                    <span>£{applyForPrice.toFixed(2)}</span>
                  </div>
                )}
                {multiCityPrice > 0 && (
                  <div className="flex justify-between" style={labelStyle}>
                    <span>Multi City:</span>
                    <span>£{multiCityPrice.toFixed(2)}</span>
                  </div>
                )}
                {speedyService && (
                  <div className="flex justify-between" style={labelStyle}>
                    <span>Speedy Services:</span>
                    <span>£{speedyPrice.toFixed(2)}</span>
                  </div>
                )}
                <div
                  className="flex justify-between pt-2 border-t border-gray-200"
                  style={{ ...labelStyle, fontWeight: 700 }}
                >
                  <span>Total:</span>
                  <span style={{ color: '#069d26', fontSize: '22px' }}>{currency}{finalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Total display */}
              <div className="mb-4">
                <label style={labelStyle}>Your Visa Essentials Package Price Is:</label>
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

              {/* Coupon */}
              <div className="mb-4">
                <label style={labelStyle}>Coupon</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    disabled={couponApplying}
                    className="px-6 text-white rounded-[3px] whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      height: '43px',
                      background: '#005CFF',
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

              {/* Stripe Payment */}
              {showPayment && (
                <div className="mt-6">
                  <StripePaymentForm
                    amount={finalPrice}
                    currency={currency}
                    serviceKey="visa-essentials"
                    email={email}
                    name={`${travelerInfo[0].salutation} ${travelerInfo[0].firstName} ${travelerInfo[0].lastName}`}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                    disabled={submitting}
                    buttonText={submitting ? 'Processing...' : 'Pay Now'}
                  />
                </div>
              )}

              {/* Submit Button */}
              {submitError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm mt-4">{submitError}</div>
              )}
              {submitted && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md text-sm mt-4">
                  Your visa essentials package request has been submitted successfully!
                </div>
              )}
              {!showPayment && !submitted && (
                <button
                  type="submit"
                  className="w-full mt-4 text-white rounded-[3px] cursor-pointer transition-colors hover:opacity-90 disabled:opacity-50"
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

export default function VisaEssentialsPackagePage() {
  return <Suspense><VisaEssentialsPackage /></Suspense>;
}
