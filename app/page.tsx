import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQSection from '@/components/FAQSection';
import { getPageContent, getFieldValue } from '@/lib/page-content';

export default async function Home() {
  const content = await getPageContent('home');
  const heroHeading = getFieldValue(content, 'hero', 'heading') || 'Verified Onward Ticket for Visa Applications | Starting at $10';
  const heroSubheading = getFieldValue(content, 'hero', 'subheading') || 'Need proof of onward travel for your visa application? Get a real, verifiable flight reservation. Valid 24 hours upto 14 days. Accepted by embassies worldwide.';
  const heroCtaText = getFieldValue(content, 'hero', 'ctaText') || 'Get Onward Ticket Now';
  const heroCtaLink = getFieldValue(content, 'hero', 'ctaLink') || '#pricing';
  const heroSecondaryCtaText = getFieldValue(content, 'hero', 'secondaryCtaText') || 'How It Works';
  const heroSecondaryCtaLink = getFieldValue(content, 'hero', 'secondaryCtaLink') || '#how-it-works';
  const heroImage = getFieldValue(content, 'hero', 'heroImage') || '/hero-girl.png';
  const planeImage = getFieldValue(content, 'hero', 'planeImage') || '/hero-plane.jpg';
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section - Figma Design */}
      <section className="relative bg-white" style={{ marginTop: '-85px', paddingTop: '85px' }}>

        {/* Concentric circle rings - positioned at section level to extend behind header */}
        <div
          className="hidden lg:block absolute rounded-full pointer-events-none"
          style={{
            width: '1126px', height: '1126px',
            border: '72px solid #005CFF',
            opacity: 0.06,
            right: '-10%', top: '-25%',
            transform: 'translate(0, 0)',
          }}
        />
        <div
          className="hidden lg:block absolute rounded-full pointer-events-none"
          style={{
            width: '815px', height: '815px',
            border: '72px solid #005CFF',
            opacity: 0.08,
            right: '2%', top: '-5%',
            transform: 'translate(0, 0)',
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-6 lg:px-0">

          {/* === Desktop Layout === */}
          <div className="hidden lg:flex relative h-[644px] items-center">

            {/* Gradient sphere with world map dots */}
            <div
              className="absolute rounded-full bg-gradient-to-b from-[#005CFF] to-[#003799] overflow-hidden z-[1]"
              style={{ left: '56.2%', top: '11.5%', width: '38.95%', aspectRatio: '1' }}
            >
              {/* World map dots overlay */}
              <img
                src="/world-map-dots.svg"
                alt=""
                className="absolute pointer-events-none"
                style={{ left: '-2%', top: '24%', width: '102%', height: '50%', objectFit: 'contain' }}
              />
            </div>

            {/* Dashed diagonal line */}
            <div className="absolute pointer-events-none z-[2]" style={{ left: '52.3%', top: '28.4%', width: '43.5%', height: '34.3%' }}>
              <svg width="100%" height="100%" viewBox="0 0 540 221" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="221" x2="540" y2="0" stroke="#2e2e2e" strokeWidth="0.75" strokeDasharray="7.55 7.55" />
              </svg>
            </div>

            {/* Girl image */}
            <img
              src={heroImage}
              alt="Traveler with suitcase and passport"
              className="absolute z-[5] object-contain"
              style={{ left: '53.8%', top: '0%', width: '50.1%', height: '104.97%' }}
            />

            {/* Plane image */}
            <img
              src={planeImage}
              alt="Airplane"
              className="absolute z-[6] object-contain"
              style={{ left: '49.8%', top: '34.3%', width: '15.2%', height: '29.3%' }}
            />

            {/* Floating badges */}

            {/* Embassy Accepted */}
            <div
              className="absolute z-[10] flex items-center gap-4 bg-white rounded-lg p-4"
              style={{ left: '41.9%', top: '23.6%', boxShadow: '0 24px 50px rgba(0,0,0,0.10)' }}
            >
              <svg className="w-[30px] h-[30px] flex-shrink-0" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.802 11.0691L12.9403 18.9308L9.19775 15.1884" stroke="#005CFF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28.828 15.0001C28.828 22.6371 22.637 28.8282 15 28.8282C7.36293 28.8282 1.17188 22.6371 1.17188 15.0001C1.17188 7.36307 7.36293 1.17202 15 1.17202C22.637 1.17202 28.828 7.36307 28.828 15.0001Z" stroke="#005CFF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[#333333] text-[16px] whitespace-nowrap" style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', lineHeight: '20.16px' }}>
                Embassy Accepted
              </span>
            </div>

            {/* Airline-Verified PNR */}
            <div
              className="absolute z-[10] flex items-center gap-4 bg-white rounded-lg p-4"
              style={{ left: '82.1%', top: '22%', boxShadow: '0 24px 50px rgba(0,0,0,0.10)' }}
            >
              <svg className="w-[30px] h-[30px] flex-shrink-0" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="clip-passport"><rect width="30" height="30" fill="white"/></clipPath>
                <g clipPath="url(#clip-passport)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.6248 28.125H21.5622C22.3081 28.125 23.0234 27.8287 23.5511 27.3014C24.0783 26.7736 24.3748 26.0583 24.3748 25.3125C24.3748 20.7722 24.3748 9.22781 24.3748 4.6875C24.3748 3.94172 24.0783 3.22641 23.5511 2.6986C23.0234 2.17125 22.3081 1.875 21.5622 1.875C17.8029 1.875 9.38432 1.875 5.62509 1.875C4.87915 1.875 4.16384 2.17125 3.6361 2.6986C3.10891 3.22641 2.8125 3.94172 2.8125 4.6875C2.8125 9.22781 2.8125 20.7722 2.8125 25.3125C2.8125 26.0583 3.10891 26.7736 3.6361 27.3014C4.16384 27.8287 4.87915 28.125 5.62509 28.125C8.19158 28.125 12.9303 28.125 16.8749 28.125C17.3922 28.125 17.8122 27.705 17.8122 27.1875C17.8122 26.67 17.3922 26.25 16.8749 26.25C12.9303 26.25 8.19158 26.25 5.62509 26.25C5.37626 26.25 5.13782 26.1511 4.96173 25.9753C4.78618 25.7995 4.6872 25.5609 4.6872 25.3125C4.6872 20.7722 4.6872 9.22781 4.6872 4.6875C4.6872 4.43906 4.78618 4.20047 4.96173 4.02469C5.13782 3.84891 5.37626 3.75 5.62509 3.75C9.38432 3.75 17.8029 3.75 21.5622 3.75C21.811 3.75 22.0494 3.84891 22.2255 4.02469C22.4011 4.20047 22.5001 4.43906 22.5001 4.6875C22.5001 9.22781 22.5001 20.7722 22.5001 25.3125C22.5001 25.5609 22.4011 25.7995 22.2255 25.9753C22.0494 26.1511 21.811 26.25 21.5622 26.25C21.2756 26.25 20.9617 26.25 20.6248 26.25C20.1075 26.25 19.6875 26.67 19.6875 27.1875C19.6875 27.705 20.1075 28.125 20.6248 28.125Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.62502 14.5312C5.62502 14.2725 5.4155 14.0625 5.15675 14.0625H2.34425C2.0855 14.0625 1.87598 14.2725 1.87598 14.5312V15.4688C1.87598 15.7275 2.0855 15.9375 2.34425 15.9375H5.15675C5.4155 15.9375 5.62502 15.7275 5.62502 15.4688V14.5312Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.62502 9.84375C5.62502 9.585 5.4155 9.375 5.15675 9.375H2.34425C2.0855 9.375 1.87598 9.585 1.87598 9.84375V10.7812C1.87598 11.04 2.0855 11.25 2.34425 11.25H5.15675C5.4155 11.25 5.62502 11.04 5.62502 10.7812V9.84375Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.62502 19.2188C5.62502 18.96 5.4155 18.75 5.15675 18.75H2.34425C2.0855 18.75 1.87598 18.96 1.87598 19.2188V20.1562C1.87598 20.415 2.0855 20.625 2.34425 20.625H5.15675C5.4155 20.625 5.62502 20.415 5.62502 20.1562V19.2188Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.0611 4.68713C9.92184 4.68713 6.56104 8.04794 6.56104 12.1872C6.56104 16.3265 9.92184 19.6873 14.0611 19.6873C18.2004 19.6873 21.5612 16.3265 21.5612 12.1872C21.5612 8.04794 18.2004 4.68713 14.0611 4.68713ZM14.0611 6.56236C17.1657 6.56236 19.686 9.08262 19.686 12.1872C19.686 15.2918 17.1657 17.8121 14.0611 17.8121C10.9565 17.8121 8.43627 15.2918 8.43627 12.1872C8.43627 9.08262 10.9565 6.56236 14.0611 6.56236Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.0646 4.68713C13.36 4.68713 12.6629 5.04178 12.0776 5.77049C11.1091 6.97579 10.3926 9.39051 10.3926 12.1872C10.3926 14.9839 11.1091 17.3986 12.0776 18.6039C12.6629 19.3326 13.36 19.6873 14.0646 19.6873C14.7691 19.6873 15.4662 19.3326 16.0516 18.6039C17.02 17.3986 17.7366 14.9839 17.7366 12.1872C17.7366 9.39051 17.02 6.97579 16.0516 5.77049C15.4662 5.04178 14.7691 4.68713 14.0646 4.68713ZM14.0646 6.56236C14.2015 6.56236 14.316 6.65779 14.4358 6.774C14.5901 6.92411 14.7314 7.12153 14.8639 7.35477C15.4828 8.44387 15.8614 10.2062 15.8614 12.1872C15.8614 14.1683 15.4828 15.9305 14.8639 17.0196C14.7314 17.2529 14.5901 17.4503 14.4358 17.6004C14.316 17.7166 14.2015 17.8121 14.0646 17.8121C13.9276 17.8121 13.8131 17.7166 13.6934 17.6004C13.539 17.4503 13.3977 17.2529 13.2652 17.0196C12.6463 15.9305 12.2677 14.1683 12.2677 12.1872C12.2677 10.2062 12.6463 8.44387 13.2652 7.35477C13.3977 7.12153 13.539 6.92411 13.6934 6.774C13.8131 6.65779 13.9276 6.56236 14.0646 6.56236Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M23.6053 5.23028C23.3315 5.1806 23.0503 5.25514 22.8366 5.43326C22.6233 5.61139 22.5 5.87482 22.5 6.15279V23.3044C22.5 23.7576 22.8239 24.1458 23.2697 24.2268L24.0024 24.36C24.5119 24.4523 24.9999 24.1144 25.0922 23.6053L28.11 7.00216C28.2024 6.49263 27.8644 6.00466 27.3553 5.91185L23.6053 5.23028ZM24.375 17.0662L26.0976 7.58904L24.375 7.27639V17.0662Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.1875 22.5H15.9375C16.455 22.5 16.875 22.08 16.875 21.5625C16.875 21.045 16.455 20.625 15.9375 20.625H12.1875C11.67 20.625 11.25 21.045 11.25 21.5625C11.25 22.08 11.67 22.5 12.1875 22.5Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.2495 25.3125H16.8745C17.392 25.3125 17.8124 24.8925 17.8124 24.375C17.8124 23.8575 17.392 23.4375 16.8745 23.4375H11.2495C10.732 23.4375 10.3115 23.8575 10.3115 24.375C10.3115 24.8925 10.732 25.3125 11.2495 25.3125Z" fill="#005CFF"/>
                </g>
              </svg>
              <span className="text-[#333333] text-[16px] whitespace-nowrap" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '40px' }}>
                Airline-Verified PNR
              </span>
            </div>

            {/* One-Way, Return & Multi-City Options */}
            <div
              className="absolute z-[10] flex items-center gap-4 bg-white rounded-lg p-4"
              style={{ left: '75.7%', top: '80.6%', boxShadow: '0 24px 50px rgba(0,0,0,0.10)' }}
            >
              <svg className="w-[40px] h-[40px] flex-shrink-0" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="clip-direction"><rect width="40" height="40" fill="white"/></clipPath>
                <g clipPath="url(#clip-direction)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.625 34.9999C20.625 34.3105 21.1852 33.7504 21.8752 33.7504C22.5652 33.7504 23.1253 34.3105 23.1253 34.9999V36.2501C23.1253 36.9402 22.5656 37.5003 21.8752 37.5003H18.1252C17.4347 37.5003 16.875 36.9402 16.875 36.2501V3.75018C16.875 3.06007 17.4347 2.49997 18.1252 2.49997H21.8752C22.5656 2.49997 23.1253 3.06007 23.1253 3.75018V30.0004C23.1253 30.6898 22.5652 31.2499 21.8752 31.2499C21.1852 31.2499 20.625 30.6898 20.625 30.0004V5.00039H19.3753V34.9999H20.625Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M33.125 6.24951H21.875V12.4996H33.125L36.25 9.37454L33.125 6.24951Z" fill="#005CFF" fillOpacity="0.28"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M34.0087 5.36539C33.7744 5.1313 33.4562 4.99948 33.125 4.99948H21.875C21.1844 4.99948 20.625 5.55915 20.625 6.24949V12.4996C20.625 13.1899 21.1844 13.7496 21.875 13.7496H33.125C33.4562 13.7496 33.7744 13.6177 34.0087 13.3837L37.1337 10.2586C37.6219 9.76998 37.6219 8.97907 37.1337 8.49043L34.0087 5.36539ZM23.125 7.49951V11.2495H32.6075L34.4825 9.37452L32.6075 7.49951H23.125Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.875 8.74948C6.54375 8.74948 6.22562 8.8813 5.99125 9.11539L2.86625 12.2404C2.37812 12.7291 2.37812 13.52 2.86625 14.0086L5.99125 17.1337C6.22562 17.3677 6.54375 17.4996 6.875 17.4996H18.125C18.8156 17.4996 19.375 16.9399 19.375 16.2496V9.99949C19.375 9.30915 18.8156 8.74948 18.125 8.74948H6.875ZM7.3925 11.2495L5.5175 13.1245L7.3925 14.9995H16.875V11.2495H7.3925Z" fill="#005CFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 37.5H30C30.69 37.5 31.25 36.94 31.25 36.25C31.25 35.56 30.69 35 30 35H10C9.31 35 8.75 35.56 8.75 36.25C8.75 36.94 9.31 37.5 10 37.5Z" fill="#005CFF"/>
                </g>
              </svg>
              <span className="text-[#333333] text-[16px] whitespace-nowrap" style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', lineHeight: '20.16px' }}>
                One-Way, Return &amp; Multi-City Options
              </span>
            </div>

            {/* Text Content - positioned above illustration */}
            <div className="relative z-[20] w-[699px] flex-shrink-0 flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[16px]">
                <h1
                  className="text-[52px] font-semibold text-[#080808] max-w-[659px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '78px' }}
                >
                  {heroHeading}
                </h1>
                <p
                  className="text-[20px] font-medium text-[#919090]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                >
                  {heroSubheading}
                </p>
              </div>
              <div className="flex gap-[20px]">
                <a
                  href={heroCtaLink}
                  className="inline-flex items-center justify-center bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0047CC] transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px', lineHeight: '24px' }}
                >
                  {heroCtaText}
                </a>
                <a
                  href={heroSecondaryCtaLink}
                  className="inline-flex items-center justify-center border border-[#434343] text-[#2D2B2B] font-semibold text-[16px] rounded-[16px] hover:bg-gray-100 transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px', lineHeight: '24px', width: '224px' }}
                >
                  {heroSecondaryCtaText}
                </a>
              </div>
            </div>

          </div>

          {/* === Mobile Layout === */}
          <div className="lg:hidden py-10">
            {/* Text */}
            <div className="flex flex-col gap-6">
              <h1
                className="text-[32px] md:text-[42px] font-semibold text-[#080808]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.5' }}
              >
                {heroHeading}
              </h1>
              <p
                className="text-[16px] md:text-[18px] font-medium text-[#919090]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
              >
                {heroSubheading}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={heroCtaLink} className="inline-flex items-center justify-center bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0047CC] transition-colors" style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px' }}>
                  {heroCtaText}
                </a>
                <a href={heroSecondaryCtaLink} className="inline-flex items-center justify-center border border-[#434343] text-[#2D2B2B] font-semibold text-[16px] rounded-[16px] hover:bg-gray-100 transition-colors" style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px' }}>
                  {heroSecondaryCtaText}
                </a>
              </div>
            </div>
            {/* Illustration */}
            <div className="relative h-[400px] md:h-[500px] mt-8 overflow-hidden">
              <div className="absolute rounded-full pointer-events-none" style={{ width: '600px', height: '600px', border: '50px solid #005CFF', opacity: 0.06, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
              <div className="absolute rounded-full pointer-events-none" style={{ width: '420px', height: '420px', border: '50px solid #005CFF', opacity: 0.08, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
              <div className="absolute rounded-full bg-gradient-to-b from-[#005CFF] to-[#003799] overflow-hidden" style={{ left: '10%', top: '10%', width: '280px', height: '280px' }}>
                <img src="/world-map-dots.svg" alt="" className="absolute pointer-events-none" style={{ left: '-2%', top: '24%', width: '102%', height: '50%', objectFit: 'contain' }} />
              </div>
              <img src={heroImage} alt="Traveler" className="absolute bottom-0 left-[10%] h-[95%] w-auto object-contain z-[5]" />
              <img src={planeImage} alt="Airplane" className="absolute top-[15%] right-[5%] w-[100px] h-auto object-contain z-[6]" />
            </div>
            {/* Mobile badges */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 text-[14px]" style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 30 30" fill="none"><path d="M20.802 11.0691L12.9403 18.9308L9.19775 15.1884" stroke="#005CFF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M28.828 15.0001C28.828 22.6371 22.637 28.8282 15 28.8282C7.36293 28.8282 1.17188 22.6371 1.17188 15.0001C1.17188 7.36307 7.36293 1.17202 15 1.17202C22.637 1.17202 28.828 7.36307 28.828 15.0001Z" stroke="#005CFF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-[#333333]">Embassy Accepted</span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 text-[14px]" style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 30 30" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M20.6248 28.125H21.5622C22.3081 28.125 23.0234 27.8287 23.5511 27.3014C24.0783 26.7736 24.3748 26.0583 24.3748 25.3125C24.3748 20.7722 24.3748 9.22781 24.3748 4.6875C24.3748 3.94172 24.0783 3.22641 23.5511 2.6986C23.0234 2.17125 22.3081 1.875 21.5622 1.875C17.8029 1.875 9.38432 1.875 5.62509 1.875C4.87915 1.875 4.16384 2.17125 3.6361 2.6986C3.10891 3.22641 2.8125 3.94172 2.8125 4.6875C2.8125 9.22781 2.8125 20.7722 2.8125 25.3125C2.8125 26.0583 3.10891 26.7736 3.6361 27.3014C4.16384 27.8287 4.87915 28.125 5.62509 28.125C8.19158 28.125 12.9303 28.125 16.8749 28.125C17.3922 28.125 17.8122 27.705 17.8122 27.1875C17.8122 26.67 17.3922 26.25 16.8749 26.25C12.9303 26.25 8.19158 26.25 5.62509 26.25C5.37626 26.25 5.13782 26.1511 4.96173 25.9753C4.78618 25.7995 4.6872 25.5609 4.6872 25.3125C4.6872 20.7722 4.6872 9.22781 4.6872 4.6875C4.6872 4.43906 4.78618 4.20047 4.96173 4.02469C5.13782 3.84891 5.37626 3.75 5.62509 3.75C9.38432 3.75 17.8029 3.75 21.5622 3.75C21.811 3.75 22.0494 3.84891 22.2255 4.02469C22.4011 4.20047 22.5001 4.43906 22.5001 4.6875C22.5001 9.22781 22.5001 20.7722 22.5001 25.3125C22.5001 25.5609 22.4011 25.7995 22.2255 25.9753C22.0494 26.1511 21.811 26.25 21.5622 26.25C21.2756 26.25 20.9617 26.25 20.6248 26.25C20.1075 26.25 19.6875 26.67 19.6875 27.1875C19.6875 27.705 20.1075 28.125 20.6248 28.125Z" fill="#005CFF"/><path fillRule="evenodd" clipRule="evenodd" d="M14.0611 4.68713C9.92184 4.68713 6.56104 8.04794 6.56104 12.1872C6.56104 16.3265 9.92184 19.6873 14.0611 19.6873C18.2004 19.6873 21.5612 16.3265 21.5612 12.1872C21.5612 8.04794 18.2004 4.68713 14.0611 4.68713ZM14.0611 6.56236C17.1657 6.56236 19.686 9.08262 19.686 12.1872C19.686 15.2918 17.1657 17.8121 14.0611 17.8121C10.9565 17.8121 8.43627 15.2918 8.43627 12.1872C8.43627 9.08262 10.9565 6.56236 14.0611 6.56236Z" fill="#005CFF"/></svg>
                <span className="text-[#333333]">Airline-Verified PNR</span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 text-[14px]" style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 40 40" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M20.625 34.9999C20.625 34.3105 21.1852 33.7504 21.8752 33.7504C22.5652 33.7504 23.1253 34.3105 23.1253 34.9999V36.2501C23.1253 36.9402 22.5656 37.5003 21.8752 37.5003H18.1252C17.4347 37.5003 16.875 36.9402 16.875 36.2501V3.75018C16.875 3.06007 17.4347 2.49997 18.1252 2.49997H21.8752C22.5656 2.49997 23.1253 3.06007 23.1253 3.75018V30.0004C23.1253 30.6898 22.5652 31.2499 21.8752 31.2499C21.1852 31.2499 20.625 30.6898 20.625 30.0004V5.00039H19.3753V34.9999H20.625Z" fill="#005CFF"/><path fillRule="evenodd" clipRule="evenodd" d="M34.0087 5.36539C33.7744 5.1313 33.4562 4.99948 33.125 4.99948H21.875C21.1844 4.99948 20.625 5.55915 20.625 6.24949V12.4996C20.625 13.1899 21.1844 13.7496 21.875 13.7496H33.125C33.4562 13.7496 33.7744 13.6177 34.0087 13.3837L37.1337 10.2586C37.6219 9.76998 37.6219 8.97907 37.1337 8.49043L34.0087 5.36539ZM23.125 7.49951V11.2495H32.6075L34.4825 9.37452L32.6075 7.49951H23.125Z" fill="#005CFF"/><path fillRule="evenodd" clipRule="evenodd" d="M6.875 8.74948C6.54375 8.74948 6.22562 8.8813 5.99125 9.11539L2.86625 12.2404C2.37812 12.7291 2.37812 13.52 2.86625 14.0086L5.99125 17.1337C6.22562 17.3677 6.54375 17.4996 6.875 17.4996H18.125C18.8156 17.4996 19.375 16.9399 19.375 16.2496V9.99949C19.375 9.30915 18.8156 8.74948 18.125 8.74948H6.875ZM7.3925 11.2495L5.5175 13.1245L7.3925 14.9995H16.875V11.2495H7.3925Z" fill="#005CFF"/></svg>
                <span className="text-[#333333]">Multi-City Options</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What is an Onward Ticket Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] flex flex-col lg:flex-row items-center justify-center px-6 lg:px-0 py-10 lg:py-[60px] gap-8 lg:gap-[170px]">
          {/* Left - Heading */}
          <h2
            className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-[#1D1D1D] lg:w-[565px] lg:flex-shrink-0"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.5' }}
          >
            What is an ONWARD TICKET For Visa Application?
          </h2>

          {/* Right - Description */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[18px] lg:text-[20px] font-normal text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.5' }}
            >
              An onward ticket is a confirmed flight reservation required by embassies and consulates as proof you plan to leave a country after your visit.
            </p>
            <p
              className="text-[14px] lg:text-[16px] font-normal text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', lineHeight: '1.26' }}
            >
              Most visa applications demand this documentation before approval
            </p>
          </div>
        </div>
      </section>

      {/* Why You Need an Onward Ticket Section */}
      <section className="pt-16 lg:pt-20 pb-10 bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <div className="relative bg-[#f6f6f6] rounded-[20px] p-5 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-5">

              {/* Left Column - Title + Bullet Points */}
              <div className="flex-1 flex flex-col justify-center" style={{ padding: '60px 0' }}>
                <h2
                  className="text-[32px] md:text-[40px] lg:text-[48px] font-medium text-[#1d1d1d] leading-[1.15] mb-[43px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Why You Need an Onward Ticket for Your Visa:
                </h2>
                <ul className="flex flex-col gap-4">
                  {[
                    'Embassy visa requirements mandate proof of exit plans',
                    'Consulates verify you won\'t overstay your visa',
                    'Flight reservations prove legitimate travel intentions',
                    'Required for tourist, business, and student visa applications',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-[10px] w-[6px] h-[6px] rounded-full bg-[#666666] flex-shrink-0" />
                      <span
                        className="text-[16px] text-[#666666] leading-[28px]"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column - Image + Problem/Solution Cards */}
              <div className="w-full lg:w-[479px] flex-shrink-0 flex flex-col gap-[9px]">
                {/* Image - centered within the gray box */}
                <div className="w-[321px] h-[196px] mx-auto rounded-[12px] overflow-hidden">
                  <img
                    src="/visa-document.jpg"
                    alt="Traveler with visa documents"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Problem & Solution Cards */}
                <div className="flex flex-col gap-[9px]">
                  {/* The Problem */}
                  <div className="bg-[#ffd4d4] rounded-[12px] py-[14px] px-4">
                    <h3
                      className="text-[20px] font-semibold text-[#262626] mb-[10px]"
                      style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      The  Problem
                    </h3>
                    <p
                      className="text-[16px] text-[#666666] leading-relaxed"
                      style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      Buying a full-price ticket before visa approval is risky. What if your visa gets rejected? You lose hundreds of dollars
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="bg-[#e3edff] rounded-[12px] py-[14px] px-4">
                    <h3
                      className="text-[20px] font-semibold text-[#262626] mb-[10px]"
                      style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      The  Solution
                    </h3>
                    <p
                      className="text-[16px] text-[#666666] leading-relaxed"
                      style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      OnwardTicket.us provides legitimate, verifiable flight reservations specifically for visa applications without the full ticket cost.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* How Onward Ticket Works */}
      <section id="how-it-works" className="py-[60px] bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <h2
            className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-[#1d1d1d] text-center mb-[50px]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            HOW ONWARD TICKET WORKS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {/* Card 1 - Blue Gradient */}
            <div
              className="rounded-[36px] pt-[20px] pb-[20px] px-[30px] flex flex-col gap-[12px] text-white lg:min-h-[331px]"
              style={{ background: 'linear-gradient(180deg, #005CFF 0%, #003798 100%)' }}
            >
              {/* Icon - Airplane */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <circle cx="20" cy="20" r="20" fill="white"/>
                <path d="M16.7478 29.75H15.5C15.3746 29.75 15.2513 29.7185 15.1412 29.6585C15.0311 29.5984 14.9378 29.5118 14.8699 29.4064C14.802 29.301 14.7615 29.1803 14.7523 29.0552C14.7431 28.9302 14.7653 28.8048 14.817 28.6906L17.8386 22.0227L13.3016 21.9219L11.6469 23.9267C11.3314 24.3233 11.0797 24.5 10.4375 24.5H9.59751C9.46451 24.5043 9.33244 24.4764 9.21249 24.4188C9.09254 24.3612 8.98825 24.2755 8.90844 24.1691C8.79688 24.0186 8.68719 23.7636 8.79407 23.3998L9.72313 20.0717C9.73016 20.0469 9.7386 20.022 9.74798 19.9977C9.74842 19.9953 9.74842 19.9929 9.74798 19.9906C9.73831 19.9663 9.73002 19.9414 9.72313 19.9161L8.79313 16.5669C8.69235 16.2102 8.80251 15.9608 8.91313 15.8141C8.98742 15.7155 9.08379 15.6357 9.19451 15.5812C9.30524 15.5266 9.42721 15.4988 9.55063 15.5H10.4375C10.917 15.5 11.3825 15.7152 11.6563 16.0625L13.2767 18.0336L17.8386 17.9661L14.818 11.3098C14.7662 11.1957 14.7438 11.0704 14.753 10.9453C14.7621 10.8203 14.8024 10.6996 14.8703 10.5941C14.9381 10.4887 15.0313 10.402 15.1413 10.3419C15.2513 10.2817 15.3746 10.2502 15.5 10.25H16.7614C16.9374 10.2535 17.1103 10.2967 17.2673 10.3762C17.4244 10.4557 17.5615 10.5696 17.6684 10.7094L23.5302 17.8344L26.2381 17.7631C26.4364 17.7523 26.9858 17.7486 27.1128 17.7486C29.7031 17.75 31.25 18.5909 31.25 20C31.25 20.4434 31.0728 21.2656 29.8874 21.7887C29.1875 22.0981 28.2538 22.2547 27.1119 22.2547C26.9863 22.2547 26.4383 22.2509 26.2372 22.2402L23.5297 22.168L17.6534 29.293C17.5464 29.4321 17.4094 29.5454 17.2526 29.6246C17.0959 29.7037 16.9234 29.7465 16.7478 29.75Z" fill="#005CFF"/>
              </svg>
              {/* Title */}
              <h3
                className="text-[22px] lg:text-[24px] font-medium leading-[1.3]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Enter Flight &amp; Traveler Details
              </h3>
              {/* Description */}
              <p
                className="text-[16px] font-normal leading-[1.6] text-white"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Enter your flight information (departure, destination, dates) and traveler details. Choose one-way, return, or multi-city ticket.
              </p>
            </div>

            {/* Card 2 - Light Blue */}
            <div
              className="rounded-[36px] pt-[20px] pb-[20px] px-[30px] flex flex-col gap-[12px] bg-[#e3edff] lg:min-h-[331px]"
            >
              {/* Icon - Settings/Speed */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <circle cx="20" cy="20" r="20" fill="white"/>
                <path d="M20.1837 32C18.1569 32.0037 16.1782 31.3931 14.5169 30.2514C14.3319 30.1246 14.2057 29.9307 14.1661 29.7124C14.1264 29.4941 14.1766 29.2692 14.3056 29.0873C14.4345 28.9054 14.6317 28.7813 14.8537 28.7423C15.0757 28.7033 15.3043 28.7527 15.4894 28.8795C16.7215 29.723 18.1651 30.2184 19.6634 30.312C21.1617 30.4056 22.6574 30.0937 23.9882 29.4103C25.3189 28.7269 26.4338 27.698 27.2118 26.4354C27.9898 25.1728 28.4011 23.7247 28.4011 22.2484C28.4011 20.7721 27.9898 19.324 27.2118 18.0614C26.4338 16.7988 25.3189 15.7699 23.9882 15.0865C22.6574 14.403 21.1617 14.0912 19.6634 14.1848C18.1651 14.2784 16.7215 14.7738 15.4894 15.6173C15.3043 15.7441 15.0757 15.7935 14.8537 15.7545C14.6317 15.7155 14.4345 15.5914 14.3056 15.4095C14.1766 15.2276 14.1264 15.0027 14.1661 14.7844C14.2057 14.5661 14.3319 14.3722 14.5169 14.2454C15.7944 13.3709 17.2632 12.8043 18.8046 12.5915C20.346 12.3787 21.9167 12.5257 23.3897 13.0206C24.8626 13.5155 26.1964 14.3444 27.2831 15.4402C28.3698 16.536 29.179 17.8679 29.6451 19.3283C30.1112 20.7886 30.2211 22.3364 29.9661 23.8463C29.711 25.3561 29.0981 26.7858 28.1769 28.0196C27.2558 29.2533 26.0522 30.2565 24.6635 30.948C23.2749 31.6395 21.7403 31.9999 20.1837 32Z" fill="#005CFF"/>
                <path d="M14.5168 23.6416H9.98338C9.75794 23.6416 9.54173 23.5535 9.38232 23.3967C9.22291 23.24 9.13336 23.0274 9.13336 22.8057C9.13336 22.584 9.22291 22.3714 9.38232 22.2147C9.54173 22.0579 9.75794 21.9699 9.98338 21.9699H14.5168C14.7423 21.9699 14.9585 22.0579 15.1179 22.2147C15.2773 22.3714 15.3668 22.584 15.3668 22.8057C15.3668 23.0274 15.2773 23.24 15.1179 23.3967C14.9585 23.5535 14.7423 23.6416 14.5168 23.6416ZM15.2875 20.2982H8.85002C8.62458 20.2982 8.40837 20.2101 8.24896 20.0534C8.08956 19.8966 8 19.684 8 19.4623C8 19.2406 8.08956 19.028 8.24896 18.8713C8.40837 18.7145 8.62458 18.6265 8.85002 18.6265H15.2875C15.5129 18.6265 15.7291 18.7145 15.8885 18.8713C16.048 19.028 16.1375 19.2406 16.1375 19.4623C16.1375 19.684 16.048 19.8966 15.8885 20.0534C15.7291 20.2101 15.5129 20.2982 15.2875 20.2982ZM15.6502 26.985H8.85002C8.62458 26.985 8.40837 26.8969 8.24896 26.7401C8.08956 26.5834 8 26.3708 8 26.1491C8 25.9274 8.08956 25.7148 8.24896 25.5581C8.40837 25.4013 8.62458 25.3133 8.85002 25.3133H15.6502C15.8756 25.3133 16.0918 25.4013 16.2512 25.5581C16.4106 25.7148 16.5002 25.9274 16.5002 26.1491C16.5002 26.3708 16.4106 26.5834 16.2512 26.7401C16.0918 26.8969 15.8756 26.985 15.6502 26.985ZM31.0854 10.7037L27.2637 8.3043C26.8198 8.02692 26.2822 7.93392 25.7687 8.04569C25.2552 8.15746 24.8077 8.46487 24.5244 8.90053L23.9146 9.84003C23.6319 10.276 23.5368 10.8046 23.6503 11.3095C23.7638 11.8144 24.0766 12.2544 24.5198 12.5326L28.3438 14.9309C28.7874 15.2074 29.3243 15.3 29.8371 15.1885C30.35 15.077 30.7971 14.7704 31.0808 14.3358L31.6906 13.3963C31.9724 12.96 32.067 12.4317 31.9535 11.9271C31.8401 11.4224 31.5279 10.9826 31.0854 10.7037Z" fill="#005CFF"/>
                <path d="M25.6681 15.7422C25.5159 15.7419 25.3666 15.7014 25.2357 15.6249C25.1049 15.5485 24.9973 15.4389 24.9242 15.3076C24.8511 15.1763 24.8152 15.0281 24.8203 14.8785C24.8254 14.7289 24.8712 14.5834 24.953 14.4572L26.1713 12.5782C26.2314 12.4856 26.3094 12.4056 26.4009 12.3427C26.4924 12.2798 26.5956 12.2352 26.7047 12.2115C26.8137 12.1878 26.9264 12.1854 27.0364 12.2046C27.1463 12.2237 27.2514 12.2639 27.3455 12.323C27.4396 12.382 27.521 12.4588 27.585 12.5487C27.649 12.6387 27.6943 12.7402 27.7184 12.8474C27.7425 12.9546 27.7449 13.0655 27.7255 13.1736C27.706 13.2817 27.6651 13.385 27.605 13.4776L26.3855 15.3555C26.3087 15.4741 26.2027 15.5717 26.0773 15.6393C25.9519 15.7069 25.8111 15.7423 25.6681 15.7422ZM20.1838 15.8402C18.8949 15.8402 17.6349 16.2161 16.5633 16.9202C15.4916 17.6244 14.6563 18.6252 14.1631 19.7961C13.6698 20.9671 13.5408 22.2555 13.7922 23.4986C14.0437 24.7417 14.6643 25.8835 15.5757 26.7797C16.4871 27.6759 17.6483 28.2862 18.9124 28.5335C20.1766 28.7807 21.4869 28.6538 22.6777 28.1688C23.8685 27.6838 24.8863 26.8624 25.6023 25.8086C26.3184 24.7548 26.7006 23.5158 26.7006 22.2484C26.7066 21.4052 26.5422 20.5693 26.2168 19.7891C25.8915 19.009 25.4117 18.3002 24.8053 17.7039C24.199 17.1077 23.4782 16.6359 22.6848 16.316C21.8914 15.996 21.0413 15.8343 20.1838 15.8402ZM23.0081 20.9445L21.851 21.9319C21.8721 22.0361 21.8831 22.1421 21.8838 22.2484C21.8896 22.61 21.7778 22.964 21.5648 23.2589C21.3518 23.5537 21.0486 23.7739 20.6994 23.8875C20.3502 24.0011 19.9733 24.0022 19.6234 23.8905C19.2736 23.7788 18.9692 23.5602 18.7545 23.2666C18.5397 22.973 18.426 22.6196 18.4297 22.2579C18.4334 21.8963 18.5544 21.5452 18.7751 21.2559C18.9958 20.9666 19.3046 20.7541 19.6567 20.6494C20.0087 20.5447 20.3856 20.5532 20.7324 20.6737L21.8929 19.6818C22.0632 19.5364 22.2852 19.4634 22.5102 19.479C22.7352 19.4946 22.9447 19.5974 23.0926 19.7648C23.2405 19.9323 23.3146 20.1506 23.2988 20.3719C23.283 20.5931 23.1784 20.7991 23.0081 20.9445Z" fill="#005CFF"/>
              </svg>
              {/* Title */}
              <h3
                className="text-[18px] lg:text-[20px] font-medium text-[#1d1d1d] leading-[1.3]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Select Delivery Speed &amp; Make Payment
              </h3>
              {/* Description */}
              <p
                className="text-[16px] font-normal text-[#666666] leading-[1.6]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Choose your delivery speed (standard, fast, or express) and complete secure payment using credit/debit card, Apple Pay, or Google Pay.
              </p>
            </div>

            {/* Card 3 - Light Blue */}
            <div
              className="rounded-[36px] pt-[20px] pb-[20px] px-[30px] flex flex-col gap-[12px] bg-[#e3edff] lg:min-h-[331px]"
            >
              {/* Icon - Ticket/Document */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <circle cx="20" cy="20" r="20" fill="white"/>
                <path d="M31.0002 20.9998C31.2502 20.9998 31.5003 20.7497 31.5003 20.4996V17.4996C31.5003 16.6496 30.8504 15.9996 30.0003 15.9996H26V29.9998H29.9998C30.8499 29.9998 31.4998 29.3499 31.4998 28.4998V25.4998C31.4996 25.3672 31.4468 25.2402 31.3531 25.1464C31.2593 25.0527 31.1323 24.9999 30.9997 24.9996C30.4746 24.9915 29.9738 24.7772 29.6054 24.403C29.237 24.0289 29.0305 23.5248 29.0305 22.9997C29.0305 22.4746 29.237 21.9706 29.6054 21.5964C29.9738 21.2222 30.4746 21.0079 30.9997 20.9998H31.0002Z" fill="#005CFF"/>
                <path d="M30.6501 14.5002C30.9002 14.4004 31.0499 14.1004 30.9501 13.8503L29.9498 11C29.6997 10.1999 28.7978 9.80005 28.0499 10.0501L13.8501 14.95H29.8499C30.0871 14.7526 30.3582 14.6002 30.6501 14.5002Z" fill="#005CFF"/>
                <path d="M8.5 17.5001V20.5001C8.5 20.8001 8.70016 21.0003 9.00016 21.0003C9.2654 20.9962 9.52881 21.0449 9.77505 21.1435C10.0213 21.2422 10.2455 21.3888 10.4345 21.575C10.6235 21.7611 10.7736 21.9829 10.8761 22.2276C10.9785 22.4723 11.0313 22.7349 11.0313 23.0002C11.0313 23.2655 10.9785 23.5281 10.8761 23.7728C10.7736 24.0175 10.6235 24.2393 10.4345 24.4254C10.2455 24.6116 10.0213 24.7582 9.77505 24.8569C9.52881 24.9555 9.2654 25.0042 9.00016 25.0001C8.70016 25.0001 8.5 25.2003 8.5 25.5003V28.5003C8.5 29.3504 9.14992 30.0003 10 30.0003H25V16.0001H10C9.15184 16.0001 8.5 16.65 8.5 17.5001ZM14.5 20H17.5C17.8 20 18.0002 20.2001 18.0002 20.5001C18.0002 20.8001 17.8 21.0003 17.5 21.0003H14.5C14.2 21.0003 13.9998 20.8001 13.9998 20.5001C13.9998 20.2001 14.2 20 14.5 20ZM14.5 22.4998H20.9997C21.2997 22.4998 21.4998 22.7 21.4998 23C21.4998 23.3 21.2997 23.5001 20.9997 23.5001H14.5C14.2 23.5001 13.9998 23.3 13.9998 23C13.9998 22.7 14.2 22.4998 14.5 22.4998ZM14.5 24.9996H20.9997C21.2997 24.9996 21.4998 25.1998 21.4998 25.4998C21.4998 25.7998 21.2997 26 20.9997 26H14.5C14.2 26 13.9998 25.7998 13.9998 25.4998C13.9998 25.1998 14.2 25.0001 14.5 25.0001V24.9996Z" fill="#005CFF"/>
              </svg>
              {/* Title */}
              <h3
                className="text-[18px] lg:text-[20px] font-medium text-[#1d1d1d] leading-[1.3]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Receive Your Ticket via Email
              </h3>
              {/* Description */}
              <p
                className="text-[16px] font-normal text-[#666666] leading-[1.6]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Get your verifiable flight reservation with PNR (booking reference) delivered directly to your email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose OnwardTicket.us Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 pt-[51px] pb-[60px]">
          <div className="flex flex-col gap-[50px]">
            {/* Heading */}
            <h2
              className="text-[32px] md:text-[40px] lg:text-[48px] font-medium max-w-[686px]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.5' }}
            >
              <span className="text-[#1D1D1D]">WHY CHOOSE </span>
              <span className="text-[#005CFF]">ONWARDTICKET.US FOR YOUR VISA?</span>
            </h2>

            {/* 2x3 Grid of Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[43px] gap-y-[25px]">

              {/* Card 1 - Real Airline Reservations */}
              <div className="bg-[#E3EDFF] rounded-[12px] p-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-[29px] leading-none">✈️</span>
                  </div>
                  <h3
                    className="text-[20px] lg:text-[24px] font-medium text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                  >
                    Real Airline Reservations
                  </h3>
                </div>
                <p
                  className="text-[16px] lg:text-[18px] font-normal text-[#676767]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                >
                  We create actual bookings in airline systems with valid PNRs. Embassy visa officers can verify your reservation directly with carriers.
                </p>
              </div>

              {/* Card 2 - Quick Delivery */}
              <div className="bg-[#E3EDFF] rounded-[12px] p-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <div className="w-[50px] h-[50px] rounded-[26px] bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-[29px] leading-none">⏰</span>
                  </div>
                  <h3
                    className="text-[16px] lg:text-[18px] font-medium text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                  >
                    Quick Delivery
                  </h3>
                </div>
                <p
                  className="text-[16px] lg:text-[18px] font-normal text-[#676767]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                >
                  Receive your ticket via email within your selected timeframe. Delivery speed options available at checkout.
                </p>
              </div>

              {/* Card 3 - Validity */}
              <div className="bg-[#E3EDFF] rounded-[12px] p-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <div className="w-[50px] h-[50px] rounded-[26px] bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-[29px] leading-none">📅</span>
                  </div>
                  <h3
                    className="text-[16px] lg:text-[18px] font-medium text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                  >
                    Validity
                  </h3>
                </div>
                <p
                  className="text-[16px] lg:text-[18px] font-normal text-[#676767]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                >
                  Ticket validity typically ranges from 24 hours up to 14 days
                </p>
              </div>

              {/* Card 4 - Flexible Options */}
              <div className="bg-[#E3EDFF] rounded-[12px] p-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <div className="w-[50px] h-[50px] rounded-[26px] bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-[29px] leading-none">💰</span>
                  </div>
                  <h3
                    className="text-[16px] lg:text-[18px] font-medium text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                  >
                    Flexible Options
                  </h3>
                </div>
                <p
                  className="text-[16px] lg:text-[18px] font-normal text-[#676767]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                >
                  One-way tickets from $10, return tickets from $10, or multi-city itineraries for $17. Choose what matches your visa requirements.
                </p>
              </div>

              {/* Card 5 - Embassy Accepted */}
              <div className="bg-[#E3EDFF] rounded-[12px] p-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <div className="w-[50px] h-[50px] rounded-[26px] bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-[29px] leading-none">🔒</span>
                  </div>
                  <h3
                    className="text-[16px] lg:text-[18px] font-medium text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                  >
                    Embassy Accepted
                  </h3>
                </div>
                <p
                  className="text-[16px] lg:text-[18px] font-normal text-[#676767]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                >
                  Our reservations meet all embassy and consulate requirements. Successfully used for thousands of visa applications worldwide.
                </p>
              </div>

              {/* Card 6 - Global Coverage */}
              <div className="bg-[#E3EDFF] rounded-[12px] p-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <div className="w-[50px] h-[50px] rounded-[26px] bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-[29px] leading-none">🌍</span>
                  </div>
                  <h3
                    className="text-[16px] lg:text-[18px] font-medium text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                  >
                    Global Coverage
                  </h3>
                </div>
                <p
                  className="text-[16px] lg:text-[18px] font-normal text-[#676767]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                >
                  Book tickets for any visa application: Schengen visas, US visas, UK visas, Australian visas, and 190+ countries worldwide.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Is Onward Ticket Legal Section */}
      <section>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 bg-[#E3EDFF]">

          {/* === Desktop Layout - Absolute positioning matching Figma (scaled for 1240px content area) === */}
          <div className="hidden lg:block relative" style={{ height: '631px' }}>
            {/* Blue background panel */}
            <div className="absolute top-0 bottom-0 bg-[#005CFF]" style={{ left: '447px', width: '410px' }} />

            {/* Heading */}
            <h2
              className="absolute text-[40px] font-medium"
              style={{ left: '100px', top: '93px', width: '330px', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
            >
              <span className="text-[#1D1D1D]">IS ONWARD </span>
              <span className="text-[#005CFF]">TICKET LEGAL?</span>
            </h2>

            {/* Body text */}
            <p
              className="absolute text-[24px] font-medium text-[#1D1D1D]"
              style={{ left: '100px', top: '297px', width: '320px', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
            >
              Yes, onward tickets from OnwardTicket.us are completely legal.
            </p>

            {/* Sub text */}
            <p
              className="absolute text-[18px] font-normal text-[#333333]"
              style={{ left: '100px', top: '445px', width: '292px', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
            >
              Many travelers worry about using onward ticket services. Here&apos;s the truth:
            </p>

            {/* Passport Image */}
            <img
              src="/legal-section.png"
              alt="Passports for travel"
              className="absolute object-contain"
              style={{ left: '470px', top: '107px', width: '368px', height: '341px' }}
            />

            {/* Bullet Cards */}
            {[
              { text: 'We create real reservations in airline systems', top: 92 },
              { text: 'Immigration officers can verify your booking', top: 180 },
              { text: 'No fake documents or fraudulent bookings', top: 268 },
              { text: 'Used successfully by thousands for visas worldwide', top: 356 },
              { text: 'Complies with international travel requirements', top: 468 },
            ].map((card, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-[12px]"
                style={{ left: '875px', top: `${card.top}px`, width: '265px', padding: '12px 16px' }}
              >
                <p
                  className="text-[16px] font-normal text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  <span className="mr-2">&#8226;</span>{card.text}
                </p>
              </div>
            ))}
          </div>

          {/* === Mobile Layout === */}
          <div className="lg:hidden px-6 py-[60px] flex flex-col gap-10">
            <div className="flex flex-col gap-[36px]">
              <h2
                className="text-[32px] font-medium"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.5' }}
              >
                <span className="text-[#1D1D1D]">IS ONWARD </span>
                <span className="text-[#005CFF]">TICKET LEGAL?</span>
              </h2>
              <p
                className="text-[20px] font-medium text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.5' }}
              >
                Yes, onward tickets from OnwardTicket.us are completely legal.
              </p>
              <p
                className="text-[16px] font-normal text-[#333333]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.5' }}
              >
                Many travelers worry about using onward ticket services. Here&apos;s the truth:
              </p>
            </div>

            <div className="relative bg-[#005CFF] rounded-[12px] p-6">
              <img
                src="/legal-section.png"
                alt="Passports for travel"
                className="w-full max-w-[439px] h-auto object-contain mx-auto"
              />
            </div>

            <div className="flex flex-col gap-[16px]">
              {[
                'We create real reservations in airline systems',
                'Immigration officers can verify your booking',
                'No fake documents or fraudulent bookings',
                'Used successfully by thousands for visas worldwide',
                'Complies with international travel requirements',
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-[12px] px-4 py-3">
                  <p
                    className="text-[15px] font-normal text-[#1D1D1D]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>{item}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Countries Requiring Onward Tickets */}
      <section className="py-[60px] bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <h2
            className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-[#1d1d1d] text-center mb-[50px]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
          >
            COUNTRIES REQUIRING ONWARD TICKETS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[31px] gap-y-[32px]">
            {/* Southeast Asia Card */}
            <div className="bg-[#e3edff] rounded-[6px] p-[30px] flex flex-col gap-[20px]">
              <h3
                className="text-[20px] lg:text-[24px] font-medium text-[#1d1d1d]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
              >
                Southeast Asia
              </h3>
              <div className="flex flex-col gap-[12px]">
                {[
                  '- Thailand - Required for visa exemption',
                  '- Indonesia - Mandatory for visa on arrival',
                  '- Philippines - Immigration strictly enforces',
                  '- Malaysia - Often checked at immigration',
                  '- Singapore - Required for visa-free entry',
                ].map((item, i) => (
                  <p
                    key={i}
                    className="text-[16px] lg:text-[18px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Flags Collage Image */}
            <div className="rounded-[6px] overflow-hidden h-[299px]">
              <img
                src="/flags-collage.png"
                alt="Flags of Southeast Asian countries - Singapore, Indonesia, Thailand, Malaysia, Philippines, Vietnam"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Americas Card */}
            <div className="bg-[#e3edff] rounded-[6px] p-[30px] flex flex-col gap-[20px] min-h-[299px]">
              <h3
                className="text-[20px] lg:text-[24px] font-medium text-[#1d1d1d]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
              >
                Americas:
              </h3>
              <div className="flex flex-col gap-[12px]">
                {[
                  '- Costa Rica - Strictly enforced',
                  '- Panama - Required for entry',
                  '- Brazil - Visa applications need proof',
                  '- Peru - Immigration may request',
                  '- Mexico - Occasionally required',
                ].map((item, i) => (
                  <p
                    key={i}
                    className="text-[16px] lg:text-[18px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Oceania Card */}
            <div className="bg-[#e3edff] rounded-[6px] p-[30px] flex flex-col gap-[20px] min-h-[299px]">
              <h3
                className="text-[20px] lg:text-[24px] font-medium text-[#1d1d1d]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
              >
                Oceania:
              </h3>
              <div className="flex flex-col gap-[12px]">
                {[
                  '- New Zealand - Mandatory requirement',
                  '- Australia - Required for tourist visas',
                  '- Fiji - Immigration enforcement varies',
                ].map((item, i) => (
                  <p
                    key={i}
                    className="text-[16px] lg:text-[18px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Testimonials */}
      <TestimonialsCarousel />

      {/* Visa Application Guide Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[60px]">
          <div className="flex flex-col gap-[50px]">
            {/* Title */}
            <h2
              className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-center"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
            >
              <span className="text-[#005CFF]">VISA APPLICATION GUIDE: </span>
              <span className="text-[#1D1D1D]">PROOF OF ONWARD TRAVEL</span>
            </h2>

            {/* Cards */}
            <div className="flex flex-col gap-[20px]">

              {/* Card 1 - When Do You Need Proof for Your Visa? */}
              <div
                className="bg-white rounded-[16px] px-[40px] py-[50px] flex flex-col gap-[40px]"
                style={{ boxShadow: '20px 10px 35px rgba(0, 0, 0, 0.09)' }}
              >
                <h3
                  className="text-[20px] lg:text-[24px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  When Do You Need Proof for Your Visa?
                </h3>
                <ul className="flex flex-col gap-[16px]">
                  <li
                    className="text-[16px] text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>
                    <span className="font-medium">Schengen Visa Applications:</span>
                    <span className="font-normal"> Most Schengen countries require proof of return or onward travel. Upload your flight reservation as part of visa documentation.</span>
                  </li>
                  <li
                    className="text-[16px] text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>
                    <span className="font-medium">Tourist Visa Requirements:</span>
                    <span className="font-normal"> Countries like Thailand, Indonesia, Philippines, and many others mandate onward tickets for tourist visa approval.</span>
                  </li>
                  <li
                    className="text-[16px] text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>
                    <span className="font-medium">Business Visas:</span>
                    <span className="font-normal"> Even business visa applications often require proof you&apos;ll depart after your authorized stay.</span>
                  </li>
                </ul>
              </div>

              {/* Card 2 - What Embassy Officers Verify (blue background) */}
              <div
                className="bg-[#E3EDFF] rounded-[16px] px-[40px] py-[50px] flex flex-col gap-[40px]"
                style={{ boxShadow: '20px 10px 35px rgba(0, 0, 0, 0.09)' }}
              >
                <h3
                  className="text-[20px] lg:text-[24px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  What Embassy Officers Verify:
                </h3>
                <ul className="flex flex-col gap-[16px]">
                  <li
                    className="text-[16px] text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>
                    <span className="font-medium">Valid PNR:</span>
                    <span className="font-normal"> They check your booking reference with airline reservation systems</span>
                  </li>
                  <li
                    className="text-[16px] text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>
                    <span className="font-medium">Departure Date:</span>
                    <span className="font-normal"> Must align with your requested visa duration</span>
                  </li>
                  <li
                    className="text-[16px] text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>
                    <span className="font-medium">Return/Onward Destination:</span>
                    <span className="font-normal"> Must show clear exit from their country</span>
                  </li>
                  <li
                    className="text-[16px] text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>
                    <span className="font-medium">Passenger Details:</span>
                    <span className="font-normal"> Must match your passport information exactly</span>
                  </li>
                </ul>
              </div>

              {/* Card 3 - Tips for Visa Applications */}
              <div
                className="bg-white rounded-[16px] px-[40px] py-[50px] flex flex-col gap-[40px]"
                style={{ boxShadow: '20px 10px 35px rgba(0, 0, 0, 0.09)' }}
              >
                <h3
                  className="text-[20px] lg:text-[24px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  Tips for Visa Applications:
                </h3>
                <ul className="flex flex-col gap-[16px]">
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Book your ticket 24-48 hours before your appointment
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Choose 14-day validity for flexibility with appointment dates
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Ensure passenger name matches passport precisely
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Save confirmation email for upload to visa portal
                  </li>
                </ul>
              </div>

              {/* Card 4 - Common Visa Types Requiring Onward Tickets */}
              <div
                className="bg-white rounded-[16px] px-[40px] py-[50px] flex flex-col gap-[40px]"
                style={{ boxShadow: '20px 10px 35px rgba(0, 0, 0, 0.09)' }}
              >
                <h3
                  className="text-[20px] lg:text-[24px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  Common Visa Types Requiring Onward Tickets:
                </h3>
                <ul className="flex flex-col gap-[16px]">
                  <li
                    className="text-[16px] text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>
                    <span className="font-medium">Tourist Visas:</span>
                    <span className="font-normal"> Thailand, Indonesia, Bali, Philippines, Vietnam, Malaysia, Singapore</span>
                  </li>
                  <li
                    className="text-[16px] text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>
                    <span className="font-medium">Schengen Visas:</span>
                    <span className="font-normal"> France, Germany, Italy, Spain, Netherlands, Switzerland Other Popular:</span>
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>UK, Australia, New Zealand, Japan, South Korea, Dubai/UAE
                  </li>
                </ul>
              </div>

              {/* Card 5 - What's Included */}
              <div
                className="bg-white rounded-[16px] px-[40px] py-[50px] flex flex-col gap-[40px]"
                style={{ boxShadow: '20px 10px 35px rgba(0, 0, 0, 0.09)' }}
              >
                <h3
                  className="text-[20px] lg:text-[24px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  What&apos;s Included:
                </h3>
                <ul className="flex flex-col gap-[16px]">
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Verified flight reservation with booking reference
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Email confirmation with PNR
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Airline-verifiable documentation
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Ready for embassy submission
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Delivery speed options available
                  </li>
                </ul>
                {/* See More Button */}
                <button
                  className="self-start rounded-[16px] border border-[#434343] bg-transparent text-[#2D2B2B] font-semibold text-[16px] hover:bg-gray-100 transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px', lineHeight: '24px' }}
                >
                  see more
                </button>
              </div>

              {/* Card 6 - Simple Process */}
              <div
                className="bg-white rounded-[16px] px-[40px] py-[50px] flex flex-col gap-[40px]"
                style={{ boxShadow: '20px 10px 35px rgba(0, 0, 0, 0.09)' }}
              >
                <h3
                  className="text-[20px] lg:text-[24px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  Simple Process:
                </h3>
                <ul className="flex flex-col gap-[16px]">
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Enter flight &amp; traveler details
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Select delivery speed &amp; make payment
                  </li>
                  <li
                    className="text-[16px] font-normal text-[#262626]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="mr-2">&#8226;</span>Receive your ticket via email
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Why Trust OnwardTicket.us Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[60px]">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[99px]">

            {/* Left Column - Text */}
            <div className="flex flex-col gap-[10px] lg:max-w-[562px]">
              <h2
                className="text-[32px] md:text-[40px] lg:text-[48px] font-medium"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.5' }}
              >
                <span className="text-[#1D1D1D]">Why Trust </span>
                <span className="text-[#005CFF]">OnwardTicket</span>
                <span className="text-[#1D1D1D]">.us?</span>
              </h2>
              <p
                className="text-[16px] font-normal text-[#262626] max-w-[487px]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                All onward tickets are generated through real flight bookings, ensuring authenticity and acceptance by airlines and immigration authorities.
              </p>
            </div>

            {/* Right Column - 2x2 Cards Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-[29px]">
              {[
                { title: '10,000+ Happy Customers', subtitle: 'Successfully helped travelers worldwide' },
                { title: 'Instant Support:', subtitle: '24/7 customer service team' },
                { title: 'Secure Platform', subtitle: 'SSL encrypted payment processing' },
                { title: 'Established Service', subtitle: 'Operating since 2019' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="w-full max-w-[225px] h-[172px] bg-white rounded-[12px] border border-[#D1CDCD] flex flex-col items-center justify-center p-[20px] gap-[12px]"
                  style={{ boxShadow: '20px 10px 34px rgba(0, 0, 0, 0.09)' }}
                >
                  <h3
                    className="text-[24px] font-medium text-[#1D1D1D] text-center"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[16px] font-normal text-[#1D1D1D] text-center"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    {card.subtitle}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-[60px] bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          {/* Section Title */}
          <h2
            className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-center mb-[50px]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
          >
            <span className="text-[#1D1D1D]">Common Visa Types Requiring </span>
            <span className="text-[#005CFF]">Onward Tickets</span>
          </h2>

          {/* Cards Row - 4 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">

            {/* Card 1 - Flight Itinerary */}
            <div className="rounded-[20px] border border-[#E3E3E3] bg-white flex flex-col overflow-hidden">
              <div className="pt-[28px] px-[24px] pb-[20px]">
                {/* Icon */}
                <div className="w-[56px] h-[56px] rounded-full bg-[#005CFF] flex items-center justify-center mb-[16px]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="white"/>
                  </svg>
                </div>
                {/* Title */}
                <h3
                  className="text-[#1D1D1D] mb-[12px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '22px', fontWeight: 700, lineHeight: '28px' }}
                >
                  Flight<br />Itinerary
                </h3>
                {/* Price */}
                <p
                  className="text-[#1D1D1D] mb-[20px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '28px', fontWeight: 700, lineHeight: '34px' }}
                >
                  £5 Per<br />Person
                </p>
                {/* Features */}
                <div className="flex flex-col gap-[10px] mb-[16px]">
                  {[
                    'Verifiable –24 Hours up to 14 days',
                    '24 Hours Delivery',
                    'Upto 2 Corrections',
                    'PNR / Reference No',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-[8px]">
                      <svg className="w-[18px] h-[18px] flex-shrink-0 mt-[2px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="9" fill="#005CFF"/>
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
                {/* Description */}
                <p
                  className="text-[#54595F] mb-[20px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', lineHeight: '20px' }}
                >
                  Get Itinerary in few hours via email
                </p>
                {/* Button */}
                <a
                  href="/flight-itinerary"
                  className="inline-block text-center bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0047CC] transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px', lineHeight: '24px' }}
                >
                  Order Now
                </a>
              </div>
            </div>

            {/* Card 2 - Hotel Reservation */}
            <div className="rounded-[20px] border border-[#E3E3E3] bg-white flex flex-col overflow-hidden">
              <div className="pt-[28px] px-[24px] pb-[20px]">
                {/* Icon */}
                <div className="w-[56px] h-[56px] rounded-full bg-[#005CFF] flex items-center justify-center mb-[16px]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 21V7C4 5.9 4.9 5 6 5H18C19.1 5 20 5.9 20 7V21H4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 21H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 9H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14 9H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 13H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14 13H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 17H15V21H9V17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {/* Title */}
                <h3
                  className="text-[#1D1D1D] mb-[12px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '22px', fontWeight: 700, lineHeight: '28px' }}
                >
                  Hotel<br />Reservation
                </h3>
                {/* Price */}
                <p
                  className="text-[#1D1D1D] mb-[20px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '28px', fontWeight: 700, lineHeight: '34px' }}
                >
                  £5 Per<br />Person
                </p>
                {/* Features */}
                <div className="flex flex-col gap-[10px] mb-[16px]">
                  {[
                    'Verifiable',
                    '24 Hours Delivery',
                    'Upto 2 Corrections',
                    'PNR / Reference No',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-[8px]">
                      <svg className="w-[18px] h-[18px] flex-shrink-0 mt-[2px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="9" fill="#005CFF"/>
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
                {/* Description */}
                <p
                  className="text-[#54595F] mb-[20px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', lineHeight: '20px' }}
                >
                  Get Hotel Reservation in few hours via email
                </p>
                {/* Button */}
                <a
                  href="/hotel-reservation"
                  className="inline-block text-center bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0047CC] transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px', lineHeight: '24px' }}
                >
                  Order Now
                </a>
              </div>
            </div>

            {/* Card 3 - Travel Plan */}
            <div className="rounded-[20px] border border-[#E3E3E3] bg-white flex flex-col overflow-hidden">
              <div className="pt-[28px] px-[24px] pb-[20px]">
                {/* Icon */}
                <div className="w-[56px] h-[56px] rounded-full bg-[#005CFF] flex items-center justify-center mb-[16px]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 5C9 3.9 9.9 3 11 3H13C14.1 3 15 3.9 15 5C15 6.1 14.1 7 13 7H11C9.9 7 9 6.1 9 5Z" stroke="white" strokeWidth="2"/>
                    <path d="M9 12H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 16H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                {/* Title */}
                <h3
                  className="text-[#1D1D1D] mb-[12px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '22px', fontWeight: 700, lineHeight: '28px' }}
                >
                  Travel Plan
                </h3>
                {/* Price */}
                <p
                  className="text-[#1D1D1D] mb-[20px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '28px', fontWeight: 700, lineHeight: '34px' }}
                >
                  £15 Per<br />Person
                </p>
                {/* Features */}
                <div className="flex flex-col gap-[10px] mb-[16px]">
                  {[
                    '15 days',
                    'Specific for Visa purpose',
                    '24 Hours Delivery',
                    '3 Revisions',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-[8px]">
                      <svg className="w-[18px] h-[18px] flex-shrink-0 mt-[2px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="9" fill="#005CFF"/>
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
                {/* Description */}
                <p
                  className="text-[#54595F] mb-[20px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', lineHeight: '20px' }}
                >
                  Get Travel Plan in few hours via email
                </p>
                {/* Button */}
                <a
                  href="/travel-plan"
                  className="inline-block text-center bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0047CC] transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px', lineHeight: '24px' }}
                >
                  Order Now
                </a>
              </div>
            </div>

            {/* Card 4 - Cover Letter */}
            <div className="rounded-[20px] border border-[#E3E3E3] bg-white flex flex-col overflow-hidden">
              <div className="pt-[28px] px-[24px] pb-[20px]">
                {/* Icon */}
                <div className="w-[56px] h-[56px] rounded-full bg-[#005CFF] flex items-center justify-center mb-[16px]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {/* Title */}
                <h3
                  className="text-[#1D1D1D] mb-[12px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '22px', fontWeight: 700, lineHeight: '28px' }}
                >
                  Cover letter
                </h3>
                {/* Price */}
                <p
                  className="text-[#1D1D1D] mb-[20px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '28px', fontWeight: 700, lineHeight: '34px' }}
                >
                  £15 Per<br />Person
                </p>
                {/* Features */}
                <div className="flex flex-col gap-[10px] mb-[16px]">
                  {[
                    '15 days',
                    'Specific for Visa purpose',
                    '24 Hours Delivery',
                    '3 Revisions',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-[8px]">
                      <svg className="w-[18px] h-[18px] flex-shrink-0 mt-[2px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="9" fill="#005CFF"/>
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
                {/* Description */}
                <p
                  className="text-[#54595F] mb-[20px]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', lineHeight: '20px' }}
                >
                  Get Cover Letter in few hours via email
                </p>
                {/* Button */}
                <a
                  href="/cover-letter"
                  className="inline-block text-center bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0047CC] transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif', padding: '17px 30px', lineHeight: '24px' }}
                >
                  Order Now
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Secure Payment Options Section */}
      <section className="py-[60px] bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <h2
            className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-[#1D1D1D] text-center mb-[50px]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
          >
            Secure Payment Options
          </h2>

          <div className="flex flex-wrap justify-center gap-[40px]">
            {/* Credit/Debit Cards */}
            <div className="flex flex-col items-center" style={{ width: '234px' }}>
              <div className="w-[234px] h-[186px] flex items-center justify-center">
                <img
                  src="/credit-cards.png"
                  alt="Credit and Debit Cards"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3
                className="text-[20px] lg:text-[24px] font-medium text-[#1D1D1D] text-center mt-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
              >
                Credit/Debit Cards
              </h3>
            </div>

            {/* Apple Pay */}
            <div className="flex flex-col items-center" style={{ width: '234px' }}>
              <div className="w-[234px] h-[186px] flex items-center justify-center">
                <img
                  src="/apple-pay.png"
                  alt="Apple Pay"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3
                className="text-[20px] lg:text-[24px] font-medium text-[#1D1D1D] text-center mt-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
              >
                Apple Pay
              </h3>
            </div>

            {/* Google Pay */}
            <div className="flex flex-col items-center" style={{ width: '234px' }}>
              <div className="w-[234px] h-[186px] flex items-center justify-center">
                <img
                  src="/google-pay.png"
                  alt="Google Pay"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3
                className="text-[20px] lg:text-[24px] font-medium text-[#1D1D1D] text-center mt-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
              >
                Google Pay
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

    </div>
  );
}
