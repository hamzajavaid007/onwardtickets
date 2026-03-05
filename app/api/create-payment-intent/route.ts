import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, serviceKey, email, name } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!serviceKey || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Stripe expects amount in smallest currency unit (cents/pence)
    const currencyCode = (currency === '₱' || currency === 'php') ? 'php' : 'gbp';
    const amountInSmallestUnit = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: currencyCode,
      metadata: {
        serviceKey,
        email,
        name: name || '',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: unknown) {
    console.error('Stripe payment intent error:', error);
    const message = error instanceof Error ? error.message : 'Payment initialization failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
