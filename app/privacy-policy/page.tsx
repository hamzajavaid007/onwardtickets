const sections = [
  '1. INFORMATION WE COLLECT',
  '2. HOW WE USE YOUR INFORMATION',
  '3. HOW WE SHARE YOUR INFORMATION',
  '4. COOKIES AND TRACKING TECHNOLOGIES',
  '5. DATA RETENTION',
  '6. DATA SECURITY',
  '7. YOUR PRIVACY RIGHTS',
  '8. INTERNATIONAL DATA TRANSFERS',
  '9. CHILDREN\'S PRIVACY',
  '10. THIRD-PARTY LINKS',
  '11. CALIFORNIA PRIVACY RIGHTS (CCPA)',
  '12. EUROPEAN PRIVACY RIGHTS (GDPR)',
  '13. CHANGES TO THIS PRIVACY POLICY',
  '14. CONTACT US',
  '15. DATA BREACH NOTIFICATION',
];

import { getPageContent, getFieldValue } from '@/lib/page-content';

const PrivacyPolicy = async () => {
  const content = await getPageContent('privacy-policy');
  const heroHeading = getFieldValue(content, 'hero', 'heading') || 'Privacy Policy - OnwardTicket.us';
  const heroLastUpdated = getFieldValue(content, 'hero', 'lastUpdated') || 'Last Updated: October 2025';
  const introHeading = getFieldValue(content, 'introduction', 'heading') || 'INTRODUCTION';
  const introBody = getFieldValue(content, 'introduction', 'body') || '';

  return (
    <div className="w-full bg-white">

      {/* Hero Section */}
      <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: '479px' }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'linear-gradient(135deg, #061a2e 0%, #0a2540 50%, #061a2e 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(319deg, transparent 0%, black 100%)',
              opacity: 0.8,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(224deg, transparent 0%, black 100%)',
              opacity: 0.8,
            }}
          />
          <div
            className="relative h-full flex flex-col justify-center px-4 sm:px-[30px] lg:pr-[270px] py-[50px] sm:py-[70px] lg:py-[90px]"
          >
            <div className="flex flex-col gap-[12px]">
              <h1
                className="text-[36px] md:text-[48px] lg:text-[60px] font-semibold text-white"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.3' }}
              >
                {heroHeading}
              </h1>
              <p
                className="text-[16px] font-normal text-white"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                {heroLastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="mx-auto max-w-[1240px] px-6 lg:px-0" style={{ marginTop: '80px' }}>
        <div className="flex flex-col gap-[24px]">
          <h2
            className="text-[20px] lg:text-[25px] font-medium text-[#1D1D1D]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '37.5px' }}
          >
            {introHeading}
          </h2>
          <p
            className="text-[16px] lg:text-[18px] font-normal text-[#1D1D1D]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '32px' }}
          >
            {introBody || (<>OnwardTicket.us (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.<br />By using OnwardTicket.us, you agree to the collection and use of information in accordance with this policy.</>)}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ marginTop: '80px' }}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">

            {/* Left Sidebar - Table of Contents */}
            <div className="lg:w-[425px] flex-shrink-0 bg-[#F4F4F4]">
              <div className="py-8 lg:pt-[16px] lg:pb-[16px] lg:pl-[16px] lg:pr-[16px]">
                <nav className="flex flex-col gap-[20px]">
                  {sections.map((section, i) => (
                    <a
                      key={i}
                      href={`#section-${i + 1}`}
                      className={`text-[18px] lg:text-[24px] font-medium hover:text-[#1D1D1D] transition-colors ${
                        i === 0 ? 'text-[#1D1D1D]' : 'text-[#787171]'
                      }`}
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                    >
                      {section}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 py-8 lg:pt-[16px] lg:pb-[16px] lg:pl-[49px]">
              <div
                className="text-[16px] lg:text-[18px] font-normal text-[#1D1D1D] whitespace-pre-line"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '32px' }}
              >
{`1.1 Personal Information You Provide
When You Book a Reservation, We Collect:
Full name (as it appears on passport)
Email address
Phone number (if provided)
Travel dates and destinations
Departure and arrival cities
Passport details (if required for certain routes)
When You Contact Support:
Name and email address
Message content and communication history
Order number (if applicable)
When You Create an Account (if applicable):
Username and password
Profile information
Communication preferences
1.2 Payment Information
Payment Processing:
We do NOT store credit card information on our servers
Payment data is processed securely by third-party payment processors (Stripe, PayPal, etc.)
We receive only confirmation of successful payment
We may retain transaction ID and payment status
Information Shared with Payment Processors:
Cardholder name
Billing address
Payment amount
Transaction details
1.3 Automatically Collected Information
When You Visit Our Website:
IP address
Browser type and version
Device information (type, operating system)
Pages visited and time spent
Referring website
Date and time of visit
Clickstream data
Cookies and Tracking Technologies:
Session cookies (essential for functionality)
Analytics cookies (Google Analytics, etc.)
Marketing cookies (with your consent)
Pixel tags and web beacons`}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mx-auto max-w-[1240px] px-6 lg:px-0 pt-[80px] pb-[60px]">
        <div
          className="bg-[#E3EDFF] px-6 lg:px-[30px] py-[50px] flex flex-col gap-[17px]"
        >
          <h2
            className="text-[20px] lg:text-[24px] font-medium text-[#1D1D1D]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
          >
            SUMMARY
          </h2>
          <div className="flex flex-col gap-[22px]">
            <div
              className="text-[16px] lg:text-[20px] font-normal text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
            >
              <p className="mb-2"><span className="font-medium">Key Points:</span></p>
              <p>&#10003; We collect information necessary to provide flight reservation services</p>
              <p>&#10003; We share data with airlines and essential service providers only</p>
              <p>&#10003; We do NOT sell your personal information</p>
              <p>&#10003; We use industry-standard security measures</p>
              <p>&#10003; You have rights to access, correct, and delete your data</p>
              <p>&#10003; We comply with GDPR, CCPA, and applicable privacy laws</p>
              <p>&#10003; Contact us with any privacy concerns</p>
              <p className="mt-2">Your Privacy Matters to Us.</p>
            </div>
            <p
              className="text-[16px] lg:text-[20px] font-medium text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
            >
              Last Updated: October 2025 OnwardTickets - Privacy Policy Questions? Contact: contact@onwardtickets.com
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PrivacyPolicy;
