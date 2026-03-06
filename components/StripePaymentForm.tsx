'use client';

import { useState, useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  serviceKey: string;
  email: string;
  name: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
  buttonText?: string;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
}

function CheckoutForm({
  onPaymentSuccess,
  onPaymentError,
  disabled,
  buttonText = 'Pay Now',
  buttonClassName,
  buttonStyle,
}: {
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
  buttonText?: string;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      onPaymentError(error.message || 'Payment failed');
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onPaymentSuccess(paymentIntent.id);
      setProcessing(false);
    } else {
      onPaymentError('Payment was not completed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="flex items-center justify-end mt-4">
        <button
          type="submit"
          disabled={!stripe || processing || disabled}
          className={
            buttonClassName ||
            'bg-[#005CFF] text-white font-semibold text-[16px] rounded-[16px] hover:bg-[#0047CC] transition-colors disabled:opacity-50'
          }
          style={
            buttonStyle || {
              fontFamily:
                'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif',
              padding: '17px 30px',
              lineHeight: '24px',
              border: 'none',
            }
          }
        >
          {processing ? 'Processing...' : buttonText}
        </button>
      </div>
    </form>
  );
}

export default function StripePaymentForm({
  amount,
  currency,
  serviceKey,
  email,
  name,
  onPaymentSuccess,
  onPaymentError,
  disabled,
  buttonText,
  buttonClassName,
  buttonStyle,
}: StripePaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = useCallback(async () => {
    if (amount <= 0 || !email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, serviceKey, email, name }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setClientSecret(data.clientSecret);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to initialize payment';
      setError(msg);
      onPaymentError(msg);
    } finally {
      setLoading(false);
    }
  }, [amount, currency, serviceKey, email, name, onPaymentError]);

  useEffect(() => {
    createPaymentIntent();
  }, [createPaymentIntent]);

  if (loading) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        Initializing payment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500 text-sm mb-2">{error}</p>
        <button
          type="button"
          onClick={createPaymentIntent}
          className="text-blue-600 text-sm underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!clientSecret) {
    return null;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#005CFF',
            fontFamily: 'Poppins, sans-serif',
          },
        },
      }}
    >
      <CheckoutForm
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={disabled}
        buttonText={buttonText}
        buttonClassName={buttonClassName}
        buttonStyle={buttonStyle}
      />
    </Elements>
  );
}
