'use client';

const MarqueeBanner = () => {
  const messages = [
    '🎉 Get 10% OFF your first order with code WELCOME10',
  ];

  return (
    <div className="w-full bg-[#2979FF] py-2.5 text-center">
      <span
        className="text-white text-sm font-medium"
        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
      >
        {messages[0]}
      </span>
    </div>
  );
};

export default MarqueeBanner;
