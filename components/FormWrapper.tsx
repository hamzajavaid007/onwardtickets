'use client';

import { ReactNode } from 'react';

interface FormWrapperProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function FormWrapper({ children, title, description }: FormWrapperProps) {
  const font = 'var(--font-poppins), Poppins, sans-serif';

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Form Container */}
      <div className="mx-auto max-w-[1240px] px-6 py-12">
        {title && (
          <div className="text-center mb-10 reveal">
            <h1
              className="text-[#2979FF] glow-text"
              style={{ fontFamily: font, fontSize: '42px', fontWeight: 700, lineHeight: '1.2' }}
            >
              {title}
            </h1>
            {description && (
              <p
                className="mt-4 text-[#54595F]"
                style={{ fontFamily: font, fontSize: '18px', lineHeight: '1.6' }}
              >
                {description}
              </p>
            )}
            <div
              className="mx-auto mt-6 animate-gradient"
              style={{ width: '100px', height: '4px', background: 'linear-gradient(90deg, #2979FF, #005BFE, #2979FF)' }}
            />
          </div>
        )}
        <div className="reveal">{children}</div>
      </div>
    </div>
  );
}
