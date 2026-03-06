import LegalPageHero from '@/components/LegalPageHero';

const sections = [
  '1. ACCEPTANCE OF TERMS',
  '2. SERVICE OVERVIEW',
  '3. RESERVATION VALIDITY',
  '4. BOOKING PROCESS',
  '5. PRICING AND PAYMENT',
  '6. DELIVERY',
  '7. REFUNDS AND CANCELLATIONS',
  '8. USE OF RESERVATION',
  '9. LIMITATIONS OF LIABILITY',
  '10. CUSTOMER CONDUCT',
  '11. INTELLECTUAL PROPERTY',
  '12. PRIVACY AND DATA',
  '13. THIRD-PARTY SERVICES',
  '14. MODIFICATIONS TO TERMS',
  '15. CUSTOMER SUPPORT',
  '16. DISPUTE RESOLUTION',
  '17. MISCELLANEOUS',
  '18. CONTACT INFORMATION',
];

const TermsConditions = () => {
  return (
    <div className="w-full bg-white">
      <LegalPageHero
        title="Terms & Conditions - OnwardTicket.us"
        subtitle="Last Updated: October 2025"
        imageSrc="/banners/legal-hero.jpg"
      />

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
                className="text-[16px] lg:text-[18px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '32px' }}
              >
                <p className="mb-8">
                  By accessing and using OnwardTicket.us (the &ldquo;Website&rdquo; or &ldquo;Service&rdquo;), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service.
                </p>
                <p className="mb-4">
                  <span className="font-medium">Service Provider:</span> OnwardTicket.us operates as a flight reservation booking service specifically for visa application purposes.
                </p>
                <p>
                  <span className="font-medium">Service Description:</span> We provide temporary flight reservations with valid airline PNR (Passenger Name Record) booking references for use in visa applications and immigration documentation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Acknowledgment Section */}
      <div className="mx-auto max-w-[1240px] px-6 lg:px-0 pt-[50px] pb-[60px]">
        <div
          className="bg-[#E3EDFF] px-6 lg:px-[100px] py-[50px] flex flex-col gap-[16px]"
        >
          <h2
            className="text-[20px] lg:text-[24px] font-medium text-[#1D1D1D]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
          >
            ACKNOWLEDGMENT
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

export default TermsConditions;
