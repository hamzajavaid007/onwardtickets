'use client';

import { useState } from 'react';
import Image from 'next/image';

const services = [
  {
    title: 'Visa Filling',
    price: '£120',
    features: ['Visa Filling', 'Canada | Schengen visas', 'Expert-filled visa form', 'Embassy-compliant'],
    delivery: '48 Hours Delivery',
    href: '/visa-application-form-filling',
    icon: '/service-icon-1.svg',
  },
  {
    title: 'Visa Supporting Documents',
    price: '£35',
    features: ['Flight & Hotel Reservations', 'Cover Letter & Travel Plan', 'Verifiable'],
    delivery: '48 Hours Delivery',
    href: '/visa-supporting-documents',
    icon: '/service-icon-2.svg',
  },
  {
    title: 'Visa Essentials Package',
    price: '£150',
    features: ['Form + Supporting documents', 'Ready-to-submit', 'Saves time & effort'],
    delivery: '72 Hours Delivery',
    href: '/visa-essentials-package',
    icon: '/service-icon-2.svg',
  },
  {
    title: 'Hire an Expert Visa Consultant',
    price: '£70',
    features: ['One-on-one guidance', 'Document review', 'Approval strategies'],
    delivery: 'Appointment-based',
    href: '/hire-an-expert-visa-consultant',
    icon: '/service-icon-3.svg',
  },
];

const faqItems = [
  {
    question: 'How long does it take to receive my visa documents?',
    answer: 'All our documents are delivered within 24 hours, including visa form filling, supporting documents, and complete packages.',
  },
  {
    question: 'How does visa application form filling work?',
    answer: "It's simple! Just provide your basic details (name, email, contact via WhatsApp/Telegram). Our visa expert will reach out and handle everything for you.",
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Absolutely! We use strict privacy measures to keep your data safe & confidential.',
  },
  {
    question: 'Are the flight & hotel reservations verifiable?',
    answer: 'Yes! All our reservations are verifiable and valid for visa purposes.',
  },
  {
    question: 'What if I need revisions or changes?',
    answer: "No worries! If there's any issue with the documents, we offer free corrections.",
  },
  {
    question: 'How can I contact support if I have any issues or concerns?',
    answer: 'You can contact our chat support via WhatsApp & email. We are here to help!',
  },
  {
    question: 'Are support agents available around the clock?',
    answer: 'Yes, our chat support agents are ready to assist you 24/7. Click the WhatsApp button for immediate help.',
  },
];

const VisaAssistant = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  return (
    <div className="w-full bg-white">
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: '#F1FAFF', padding: '75px 10px' }}
      >
        {/* Map background overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'url(/map-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1
                className="text-[#2979FF] mb-5"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  fontSize: 'clamp(34px, 5vw, 64px)',
                  fontWeight: 800,
                  lineHeight: '1.22',
                }}
              >
                Struggling with Your Visa? Let Experts Handle It!
              </h1>
              <p
                className="text-[#54595F] mb-10 max-w-[540px] mx-auto lg:mx-0"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '24px',
                }}
              >
                Get expert assistance with visa application form filling, supporting documents, and
                personalized consultation – delivered within 24 hours!
              </p>
              <a
                href="#services"
                className="inline-flex items-center gap-3 bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0048d4] transition-colors"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  padding: '17px 30px',
                  lineHeight: '24px',
                  marginTop: '70px',
                }}
              >
                GET VISA ASSISTANCE NOW
                <Image src="/visa-hero-arrow.svg" alt="" width={20} height={20} />
              </a>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <Image
                src="/visa-hero-woman.jpg"
                alt="Visa assistance"
                width={500}
                height={462}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#FFFFFF', padding: '40px 10px' }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'url(/map-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-0">
          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-[100px]">
            {/* Stat 1 */}
            <div className="flex-1 md:border-r-2 md:border-[#2979FF] text-center md:text-left">
              <h3
                className="text-[#1D1D1D]"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  fontSize: '40px',
                  fontWeight: 800,
                }}
              >
                10,000+
              </h3>
              <p
                className="text-[#2979FF] md:max-w-[67%]"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '24px',
                }}
              >
                Visa applications processed worldwide
              </p>
            </div>
            {/* Stat 2 */}
            <div className="flex-1 md:border-r-2 md:border-[#2979FF] text-center md:text-left">
              <h3
                className="text-[#1D1D1D]"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  fontSize: '40px',
                  fontWeight: 800,
                }}
              >
                100+
              </h3>
              <p
                className="text-[#2979FF] md:max-w-[81%]"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '24px',
                }}
              >
                Trusted by applicants from 50+ countries.
              </p>
            </div>
            {/* Stat 3 */}
            <div className="flex-1 md:border-r-2 md:border-[#2979FF] text-center md:text-left">
              <h3
                className="text-[#1D1D1D]"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  fontSize: '40px',
                  fontWeight: 800,
                }}
              >
                5+
              </h3>
              <p
                className="text-[#2979FF] md:max-w-[83%]"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '24px',
                }}
              >
                Years Experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: '100px 10px' }}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <div className="flex flex-col items-center mb-10">
            <h2
              className="text-[#54595F] text-center"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontSize: 'clamp(26px, 3vw, 36px)',
                fontWeight: 600,
                lineHeight: '1.3',
              }}
            >
              How It Works
            </h2>
            <p
              className="text-[#8D8D8D] text-center mt-2"
              style={{
                fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '24px',
              }}
            >
              Get your visa application &amp; documents in just a few clicks!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {[
              {
                bg: '#FFF1F1',
                icon: '/circle-step-1.svg',
                title: '\u00A0Step 1: Choose a Service',
                desc: 'Pick the visa assistance service you need.',
              },
              {
                bg: '#F1FFF8',
                icon: '/circle-step-2.svg',
                title: 'Step 2: Submit & Pay',
                desc: 'Fill in details & complete payment.',
              },
              {
                bg: '#F1FAFF',
                icon: '/circle-step-3.svg',
                title: 'Step 3: Get Your Documents',
                desc: 'Receive embassy-approved files in 24 hours.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-lg flex flex-col items-start"
                style={{
                  background: step.bg,
                  boxShadow: '0 13px 19px rgba(0, 0, 0, 0.07)',
                  padding: '35px 40px 53px 40px',
                }}
              >
                <Image
                  src={step.icon}
                  alt=""
                  width={72}
                  height={72}
                  className="mb-5"
                />
                <h3
                  className="text-[#54595F] mb-2"
                  style={{
                    fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    lineHeight: '24px',
                  }}
                >
                  {step.title}
                </h3>
                <div className="w-[50%] h-[2px] bg-[#2979FF] mb-3" />
                <p
                  className="text-[#54595F]"
                  style={{
                    fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '22px',
                    maxWidth: '90%',
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICE CARDS SECTION ===== */}
      <section id="services" className="py-[60px] bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <h2
            className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-center mb-[50px]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
          >
            <span className="text-[#1D1D1D]">Visa Application </span>
            <span className="text-[#005CFF]">Form Filling</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {services.map((service, i) => (
              <div key={i} className="rounded-[20px] border border-[#E3E3E3] bg-white flex flex-col overflow-hidden">
                <div className="pt-[28px] px-[24px] pb-[20px] flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-[56px] h-[56px] rounded-full bg-[#2979FF] flex items-center justify-center mb-[16px]">
                    <Image src={service.icon} alt="" width={28} height={28} />
                  </div>
                  {/* Title */}
                  <h3
                    className="text-[#1D1D1D] mb-[12px]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '22px', fontWeight: 700, lineHeight: '28px' }}
                  >
                    {service.title}
                  </h3>
                  {/* Price */}
                  <p
                    className="text-[#1D1D1D] mb-[20px]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '28px', fontWeight: 700, lineHeight: '34px' }}
                  >
                    {service.price} Per<br />Person
                  </p>
                  {/* Features */}
                  <div className="flex flex-col gap-[10px] mb-[16px]">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-[8px]">
                        <svg className="w-[18px] h-[18px] flex-shrink-0 mt-[2px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="9" cy="9" r="9" fill="#2979FF"/>
                          <path d="M5.5 9L8 11.5L12.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span
                          className="text-[#54595F]"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', lineHeight: '20px' }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Delivery */}
                  <p
                    className="text-[#54595F] mb-[20px]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', lineHeight: '20px' }}
                  >
                    {service.delivery}
                  </p>
                  {/* Button */}
                  <a
                    href={service.href}
                    className="inline-block text-center bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0048d4] transition-colors mt-auto"
                    style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px', lineHeight: '24px' }}
                  >
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section style={{ background: '#F1FAFF', padding: '64px 10px' }}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
            {/* Left - Content */}
            <div className="flex-1 flex flex-col" style={{ gap: '40px' }}>
              <h2
                className="text-[#54595F]"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: 'clamp(26px, 3vw, 36px)',
                  fontWeight: 600,
                  lineHeight: '1.3',
                }}
              >
                Why Choose Us?
              </h2>

              <ul
                className="flex flex-col gap-4 list-disc pl-5"
                style={{
                  fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '30px',
                  color: '#2B2B2B',
                }}
              >
                <li>Fast &amp; Reliable – Get your documents within 24 hours</li>
                <li className="mt-2">100% Embassy-Compliant – Professionally formatted &amp; verifiable</li>
                <li className="mt-2">Hassle-Free Process – Simple steps, no complications</li>
                <li className="mt-2">Expert Assistance – Guided by visa specialists</li>
                <li className="mt-2">Secure &amp; Confidential – Your data is protected with strict privacy measures</li>
                <li className="mt-2">Affordable &amp; Transparent Pricing – No hidden fees</li>
              </ul>
            </div>

            {/* Right - Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/visa-why-choose-woman.svg"
                alt="Why choose our visa services"
                className="w-full h-auto object-contain max-w-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ background: '#2979FF', padding: '64px 10px' }}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <h2
            className="text-white text-center"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 'clamp(26px, 3vw, 36px)',
              fontWeight: 600,
              lineHeight: '1.3',
            }}
          >
            What Traveler&apos;s Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginTop: '80px' }}>
            {[
              {
                name: 'Aisha K., UK',
                review: '\u201C I needed a Schengen visa for my Europe trip, and their supporting documents were perfect! The embassy approved everything without issues.\u201C',
              },
              {
                name: 'James UAE',
                review: '\u201C The expert consultant guided me step by step for my Canada visa. They even reviewed my documents to ensure everything was correct!\u201C',
              },
              {
                name: 'Sophie M., Philippines',
                review: '\u201C Booked their visa form filling service for my Schengen visa. It was error-free, embassy-compliant, and delivered in just a few hours!\u201C',
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-[16px] text-center"
                style={{ padding: '39px 16px' }}
              >
                <h3
                  className="text-[#0A0A0A] mb-4"
                  style={{
                    fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    lineHeight: '30px',
                  }}
                >
                  {testimonial.name}
                </h3>
                <p
                  className="text-[#616161]"
                  style={{
                    fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '27px',
                  }}
                >
                  {testimonial.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[60px]">
          <div className="flex flex-col gap-[50px]">
            {/* Title */}
            <h2
              className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-center text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
            >
              FREQUENTLY ASKED QUESTIONS
            </h2>

            {/* FAQ Items */}
            <div className="flex flex-col gap-[6px]">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`overflow-hidden transition-all duration-1000 ${
                      isOpen
                        ? 'bg-[#E3EDFF] rounded-[16px]'
                        : 'bg-white rounded-[16px] border border-[#D7D7D7]'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between p-[20px] text-left cursor-pointer"
                    >
                      <span
                        className="text-[16px] lg:text-[20px] font-medium text-[#1D1D1D]"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
                      >
                        {item.question}
                      </span>
                      <svg
                        className={`w-[24px] h-[24px] flex-shrink-0 ml-4 transition-transform duration-1000 ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#1D1D1D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div
                      className="grid transition-all duration-1000"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-[20px] pb-[20px]">
                          <p
                            className="text-[14px] lg:text-[16px] font-normal text-[#1D1D1D]"
                            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                          >
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisaAssistant;
