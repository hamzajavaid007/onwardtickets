'use client';

import { useEffect } from 'react';

/**
 * Global hover effects component
 * Adds subtle hover lift and shadow effects to buttons and cards
 */
export default function GlobalAnimations() {
  useEffect(() => {
    // Add hover effect class to cards that don't have it yet
    const cards = document.querySelectorAll('.card, .service-card, .blog-card, [class*="card"]');
    cards.forEach((card) => {
      const element = card as HTMLElement;
      element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }, []);

  return null;
}
