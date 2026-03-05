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

const VisaSupportingDocuments = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  const [travelers, setTravelers] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [travelerInfo, setTravelerInfo] = useState<TravelerInfo[]>([
    { salutation: 'Mr.', firstName: '', lastName: '' },
  ]);
  const [additionalTravelers, setAdditionalTravelers] = useState('');

  // Depart / Destination
  const [departCity, setDepartCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');

  // Flight Details
  const [flightDetails, setFlightDetails] = useState('');
  const [flightRoute, setFlightRoute] = useState('Return');
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

  // Payment
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
        setPricing(data.services['visa-supporting-documents'] || null);
      } catch {
        console.error('Failed to fetch pricing');
      } finally {
        setPricingLoading(false);
      }
    };
    fetchPricing();
  }, []);

  // Fallback defaults while loading
  const basePricePerTraveler = pricing?.basePrice || 30;
  const multiCityPriceVal = pricing?.multiCityPrice || 2.99;
  const speedyPriceVal = pricing?.speedyServicePrice || 7.99;
  const currency = pricing?.currency || '£';

  // Pricing: £30 per traveler
  const basePrice = travelers * basePricePerTraveler;
  const multiCityPrice = flightRoute === 'multicity' ? multiCityPriceVal : 0;
  const speedyPrice = speedyService ? speedyPriceVal : 0;
  const totalPrice = basePrice + multiCityPrice + speedyPrice;

  const handleTravelerCount = (count: number) => {
    setTravelers(count);
    const newInfo = Array.from({ length: Math.min(count, 7) }, (_, i) =>
      travelerInfo[i] || { salutation: 'Mr.', firstName: '', lastName: '' }
    );
    setTravelerInfo(newInfo);
  };

  const updateTraveler = (index: number, field: keyof TravelerInfo, value: string) => {
    const updated = [...travelerInfo];
    updated[index] = { ...updated[index], [field]: value };
    setTravelerInfo(updated);
  };

  const handleFileDrop = (
    e: DragEvent<HTMLDivElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    setDrag: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    setDrag(false);
    const files = Array.from(e.dataTransfer.files).slice(0, 4);
    setFiles((prev) => [...prev, ...files].slice(0, 4));
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4);
      setFiles((prev) => [...prev, ...files].slice(0, 4));
    }
  };

  const removeFile = (
    idx: number,
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    // Validate required fields
    const mainTraveler = travelerInfo[0];
    if (!email || !mainTraveler.firstName || !mainTraveler.lastName) {
      setSubmitError('Please fill in all required fields.');
      return;
    }
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
          service: 'Visa Documents',
          serviceKey: 'visa-documents',
          name: `${mainTraveler.salutation} ${mainTraveler.firstName} ${mainTraveler.lastName}`,
          email,
          phone,
          travelers,
          amount: totalPrice,
          urgency: speedyService ? 'Speedy' : 'Standard',
          details: `${departCity} to ${destinationCity}, ${flightRoute}, ${noOfHotels} hotel(s)`,
          referralCode,
          paymentIntentId,
          formData: {
            travelers, email, phone, travelerInfo, additionalTravelers,
            departCity, destinationCity, flightDetails, flightRoute,
            noOfHotels, noOfRooms, hotelDetails, travelDetails, tripDetails,
            financialStandings, sponsorship, occupation, orgAddress, orgName,
            orgContact, position, speedyService, totalPrice,
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
  const sublabelStyle = {
    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
    fontSize: '13px',
    color: '#2979FF',
  };
  const cardStyle = {
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
    <div>
      <label className="block mb-1" style={labelStyle}>Attachments</label>
      <div
        className={`border-2 border-dashed rounded-[3px] flex flex-col items-center justify-center cursor-pointer transition-colors ${
          dragOver ? 'border-[#2979FF] bg-blue-50' : 'border-gray-300'
        }`}
        style={{ height: '140px' }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => handleFileDrop(e, setFiles, setDragOver)}
        onClick={() => fileRef.current?.click()}
      >
        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-gray-500">Drag & Drop or <span className="text-[#2979FF] font-medium">Choose Files</span></p>
        <p className="text-xs text-gray-400 mt-1">Max 4 files</p>
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
            <div key={i} className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
              <span>{file.name}</span>
              <button type="button" onClick={() => removeFile(i, files, setFiles)} className="text-red-500 hover:text-red-700 ml-2">&times;</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full bg-white">
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
            Visa Supporting Documents
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
      <section id="booking-form" className="w-full" style={{ padding: '20px 0 60px' }}>
        <div className="mx-auto max-w-[1240px] px-6">
          <form onSubmit={handleSubmit}>

            {/* ===== Travelers Details ===== */}
            <div className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5" style={cardStyle}>
              <SectionHeading>Travelers Details</SectionHeading>

              {/* 4 fields in a row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-1">
                <div>
                  <label className="block mb-1" style={labelStyle}>No. of Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => handleTravelerCount(Number(e.target.value))}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1" style={labelStyle}>Delivery Email Address *</label>
                  <input
                    type="email"
                    className={inputClass}
                    style={inputStyle}
                    placeholder="jhon.rick@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="block mt-1" style={sublabelStyle}>Email</span>
                </div>

                <div>
                  <label className="block mb-1" style={labelStyle}>Phone No.</label>
                  <input
                    type="tel"
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Country Code + Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1" style={labelStyle}>Your Visa Supporting Document Price Is:</label>
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
                    {currency}{totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Confirm Email row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div />
                <div>
                  <input
                    type="email"
                    className={inputClass}
                    style={inputStyle}
                    value={''}
                    onChange={() => {}}
                  />
                  <span className="block mt-1" style={sublabelStyle}>Confirm Email</span>
                </div>
                <div />
                <div />
              </div>
            </div>

            {/* ===== Traveler Name Fields ===== */}
            <div
              className="bg-white"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                padding: '30px 60px',
                marginBottom: '20px',
              }}
            >
              {travelerInfo.map((traveler, index) => (
                <div key={index} style={{ marginBottom: index < travelerInfo.length - 1 ? '20px' : '0' }}>
                  <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4">
                    <div>
                      <label className="block mb-1" style={labelStyle}>Salutation</label>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center justify-center rounded-full bg-[#2979FF] text-white"
                          style={{ width: '28px', height: '28px', fontSize: '14px', fontWeight: 600 }}
                        >
                          {index + 1}
                        </div>
                        <select
                          value={traveler.salutation}
                          onChange={(e) => updateTraveler(index, 'salutation', e.target.value)}
                          className="bg-[#EFECEC] border-none rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
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
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional travelers text area (for 8+) */}
            {travelers > 7 && (
              <div className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5" style={cardStyle}>
                <label className="block mb-1" style={labelStyle}>Add More Travelers Names</label>
                <textarea
                  className={`${inputClass} resize-vertical`}
                  style={{ ...inputStyle, height: 'auto', padding: '14px' }}
                  rows={4}
                  placeholder="(Traveler 8 - First Name, Last Name) (Traveler 9 - First Name, Last Name) (Traveler 10 - First Name, Last Name) etc."
                  value={additionalTravelers}
                  onChange={(e) => setAdditionalTravelers(e.target.value)}
                />
              </div>
            )}

            {/* ===== Depart From / Destination ===== */}
            <div className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5" style={cardStyle}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1" style={labelStyle}>Depart From (City)</label>
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    value={departCity}
                    onChange={(e) => setDepartCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1" style={labelStyle}>Destination (City)</label>
                  <input
                    type="text"
                    className={inputClass}
                    style={inputStyle}
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* ===== Flight Details ===== */}
            <div className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5" style={cardStyle}>
              <SectionHeading>Flight Details</SectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-1" style={labelStyle}>Provide Travelers Flight Details: *</label>
                  <textarea
                    className={`${inputClass} resize-vertical`}
                    style={{ ...inputStyle, height: 'auto', padding: '14px' }}
                    rows={5}
                    placeholder='Departing on June 1, 2017 from Los Angeles(LAX) to Frankfurt(FRA); Returning on June 10, 2017 from Frankfurt(FRA) to Los Angeles(LAX) or Type "Please see attachment".'
                    value={flightDetails}
                    onChange={(e) => setFlightDetails(e.target.value)}
                  />
                </div>
                <div>
                  <FileUploadArea
                    files={flightAttachments}
                    setFiles={setFlightAttachments}
                    dragOver={flightDragOver}
                    setDragOver={setFlightDragOver}
                    fileRef={flightFileRef}
                  />
                </div>
              </div>

              {/* Flight Route */}
              <div>
                <label className="block mb-2" style={labelStyle}>Flight Route</label>
                <div className="flex items-center gap-6">
                  {[
                    { label: 'One-Way', value: 'oneway' },
                    { label: 'Return', value: 'Return' },
                    { label: 'Multi City (+$2.99)', value: 'multicity' },
                  ].map((r) => (
                    <label key={r.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="flightRoute"
                        value={r.value}
                        checked={flightRoute === r.value}
                        onChange={(e) => setFlightRoute(e.target.value)}
                        style={{ width: '18px', height: '18px', accentColor: '#2979FF' }}
                      />
                      <span style={{ ...labelStyle, fontWeight: 400 }}>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== Hotel Details ===== */}
            <div className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5" style={cardStyle}>
              <SectionHeading>Hotel Details</SectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-1" style={labelStyle}>No. of Hotels</label>
                  <select
                    value={noOfHotels}
                    onChange={(e) => setNoOfHotels(Number(e.target.value))}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1" style={labelStyle}>No. of Rooms</label>
                  <select
                    value={noOfRooms}
                    onChange={(e) => setNoOfRooms(Number(e.target.value))}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block mb-1" style={labelStyle}>Provide Hotel Details:</label>
                  <textarea
                    className={`${inputClass} resize-vertical`}
                    style={{ ...inputStyle, height: 'auto', padding: '14px' }}
                    rows={5}
                    placeholder="( Hotel 1: in Tokyo, Check-In Date 03 May 2025 to 13 May 2025 Hotel 2: in Osaka , Check- In Date 13 May 2025 to 21 May 2025 )"
                    value={hotelDetails}
                    onChange={(e) => setHotelDetails(e.target.value)}
                  />
                </div>
                <div>
                  <FileUploadArea
                    files={hotelAttachments}
                    setFiles={setHotelAttachments}
                    dragOver={hotelDragOver}
                    setDragOver={setHotelDragOver}
                    fileRef={hotelFileRef}
                  />
                </div>
              </div>
            </div>

            {/* ===== Travel Plan ===== */}
            <div className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5" style={cardStyle}>
              <SectionHeading>Travel Plan</SectionHeading>

              <div>
                <label className="block mb-1" style={labelStyle}>Travel Details</label>
                <textarea
                  className={`${inputClass} resize-vertical`}
                  style={{ ...inputStyle, height: 'auto', padding: '14px' }}
                  rows={5}
                  placeholder="(Provide any relevant details about your trip, such as planned events, meetings, or activities you will be attending.)"
                  value={travelDetails}
                  onChange={(e) => setTravelDetails(e.target.value)}
                />
              </div>
            </div>

            {/* ===== Cover Letter ===== */}
            <div className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5" style={cardStyle}>
              <SectionHeading>Cover Letter</SectionHeading>

              <div className="mb-4">
                <label className="block mb-1" style={labelStyle}>Provide Trip Details</label>
                <textarea
                  className={`${inputClass} resize-vertical`}
                  style={{ ...inputStyle, height: 'auto', padding: '14px' }}
                  rows={5}
                  placeholder="(Tell us the details of your trip. What is the purpose of this trip? How long is it, and when does it start)"
                  value={tripDetails}
                  onChange={(e) => setTripDetails(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1" style={labelStyle}>Financial Standings &amp; Family Ties</label>
                <textarea
                  className={`${inputClass} resize-vertical`}
                  style={{ ...inputStyle, height: 'auto', padding: '14px' }}
                  rows={5}
                  placeholder="(Provide details on your family and financial situation. How many family members do you have? Are you married? Do you have kids? Who depends on you financially? Also, briefly mention your income sources and financial stability.)"
                  value={financialStandings}
                  onChange={(e) => setFinancialStandings(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <FileUploadArea
                  files={coverLetterAttachments}
                  setFiles={setCoverLetterAttachments}
                  dragOver={coverLetterDragOver}
                  setDragOver={setCoverLetterDragOver}
                  fileRef={coverLetterFileRef}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1" style={labelStyle}>Sponsorship</label>
                <textarea
                  className={`${inputClass} resize-vertical`}
                  style={{ ...inputStyle, height: 'auto', padding: '14px' }}
                  rows={4}
                  placeholder="(Please state if someone is sponsoring your trip. State their details and their financial standing)"
                  value={sponsorship}
                  onChange={(e) => setSponsorship(e.target.value)}
                />
              </div>

              {/* Position of employment */}
              <div className="mt-5 pt-4 border-t border-gray-200">
                <p
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#2979FF',
                    marginBottom: '12px',
                  }}
                >
                  Position of employment:
                </p>

                <div className="mb-4">
                  <label className="block mb-1" style={labelStyle}>Occupation</label>
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
                  <label className="block mb-1" style={labelStyle}>Address of Organization</label>
                  <textarea
                    className={`${inputClass} resize-vertical`}
                    style={{ ...inputStyle, height: 'auto', padding: '14px' }}
                    rows={3}
                    placeholder="(Flat, 33 High Street, Taunton England, TA1 3PN)"
                    value={orgAddress}
                    onChange={(e) => setOrgAddress(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1" style={labelStyle}>Name of Organization</label>
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
                  <label className="block mb-1" style={labelStyle}>Contact Information of Organization</label>
                  <textarea
                    className={`${inputClass} resize-vertical`}
                    style={{ ...inputStyle, height: 'auto', padding: '14px' }}
                    rows={3}
                    placeholder="(+44 77561 525115 contact@onwardtickets.com)"
                    value={orgContact}
                    onChange={(e) => setOrgContact(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1" style={labelStyle}>Your Position</label>
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

            {/* ===== Speedy Services ===== */}
            <div className="bg-white px-4 sm:px-8 md:px-[60px] pt-8 sm:pt-10 pb-6 sm:pb-8 mb-5" style={cardStyle}>
              <SectionHeading>Speedy services</SectionHeading>

              <label className="flex items-center gap-3 cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={speedyService}
                  onChange={(e) => setSpeedyService(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#2979FF' }}
                />
                <div>
                  <span style={{ ...labelStyle, color: '#2979FF', fontWeight: 500 }}>
                    Speedy Services - £7.99
                  </span>
                  <p style={{ ...sublabelStyle, color: '#069d26', fontSize: '12px' }}>
                    (Get your visa supporting documents in 20-24 hrs)
                  </p>
                </div>
              </label>
            </div>

            {/* ===== Order Summary ===== */}
            <div
              className="bg-white"
              style={{
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                padding: '40px 60px 40px',
                marginBottom: '20px',
              }}
            >
              <SectionHeading>Order Summary</SectionHeading>

              {/* Price + Stripe side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block mb-1" style={labelStyle}>Your Visa Supporting Document Price Is:</label>
                  <div
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#069d26',
                    }}
                  >
                    {currency}{totalPrice.toFixed(2)}
                  </div>
                </div>

                {showPayment && (
                  <div>
                    <StripePaymentForm
                      amount={totalPrice}
                      currency={currency}
                      serviceKey="visa-supporting-documents"
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
            </div>

            {/* ===== Submit ===== */}
            <div style={{ padding: '15px 0' }}>
              {submitError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm mb-4">{submitError}</div>
              )}
              {submitted && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md text-sm mb-4">
                  Your visa supporting documents request has been submitted successfully!
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
                      background: '#2979FF',
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

export default function VisaSupportingDocumentsPage() {
  return <Suspense><VisaSupportingDocuments /></Suspense>;
}
