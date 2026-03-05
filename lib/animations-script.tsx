'use client';

import { useEffect } from 'react';

/**
 * Hook to enable scroll reveal animations on a component
 * Simply add this to any client component that needs scroll animations
 */
export function useScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Add reveal classes to common elements if not present
    const addRevealClasses = () => {
      // Headers
      document.querySelectorAll('h1, h2, h3').forEach(el => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
          el.classList.add('reveal');
        }
      });

      // Cards
      document.querySelectorAll('.card, .service-card').forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
        }
      });

      // Forms
      document.querySelectorAll('form').forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
        }
      });

      // Images
      document.querySelectorAll('img').forEach(el => {
        if (!el.parentElement?.classList.contains('img-zoom')) {
          el.parentElement?.classList.add('img-zoom');
        }
      });
    };

    addRevealClasses();

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null;
}

/**
 * Component to add animations to all pages
 * Include this in your layout or individual pages
 */
export default function PageAnimations() {
  useEffect(() => {
    // Add animation classes to buttons
    const buttons = document.querySelectorAll('button:not([class*="btn-"]), a.btn:not([class*="btn-"])');
    buttons.forEach(btn => {
      if (!btn.classList.contains('btn-hover-lift') && !btn.classList.contains('btn-hover-scale')) {
        btn.classList.add('btn-hover-lift');
      }
    });

    // Add animation classes to cards
    const cards = document.querySelectorAll('.card:not([class*="card-hover"])');
    cards.forEach(card => {
      if (!card.classList.contains('card-hover-lift') && !card.classList.contains('card-hover-scale')) {
        card.classList.add('card-hover-lift');
      }
    });

    // Add link underline to nav links
    const navLinks = document.querySelectorAll('nav a, header a:not(.no-animate)');
    navLinks.forEach(link => {
      if (!link.classList.contains('link-underline')) {
        link.classList.add('link-underline');
      }
    });

    // Add input focus effects
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (!input.classList.contains('transition-all')) {
        input.classList.add('transition-all', 'duration-300', 'focus:shadow-lg', 'focus:ring-2', 'focus:ring-[#2979FF]/20');
      }
    });
  }, []);

  return null;
}
