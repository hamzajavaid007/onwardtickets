import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import Submission from '@/lib/models/Submission';
import { sendEmailVerification } from '@/lib/email';

// Generate verification token
function generateVerificationToken(): string {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(16).toString('hex');
  const combined = `${timestamp}-${random}`;
  return Buffer.from(combined).toString('base64');
}

// Verify token validity (24 hour expiry)
function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [timestamp] = decoded.split('-');
    const age = Date.now() - parseInt(timestamp);
    return age < 24 * 60 * 60 * 1000; // 24 hours
  } catch {
    return false;
  }
}

// GET - Verify email using token from URL
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, error: 'Invalid verification link' }, { status: 400 });
    }

    if (!verifyToken(token)) {
      return NextResponse.json({ success: false, error: 'Verification link expired' }, { status: 400 });
    }

    await dbConnect();

    const submission = await Submission.findOne({ emailVerificationToken: token });

    if (!submission) {
      return NextResponse.json({ success: false, error: 'Invalid verification link' }, { status: 400 });
    }

    submission.emailVerified = true;
    submission.emailVerificationToken = undefined;
    await submission.save();

    return NextResponse.json({ success: true, message: 'Email verified successfully!' });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
  }
}

// POST - Resend verification email
export async function POST(req: NextRequest) {
  try {
    const { email, submissionId } = await req.json();

    if (!email || !submissionId) {
      return NextResponse.json({ success: false, error: 'Email and submission ID required' }, { status: 400 });
    }

    await dbConnect();

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
    }

    if (submission.emailVerified) {
      return NextResponse.json({ success: false, error: 'Email already verified' }, { status: 400 });
    }

    // Generate new verification token
    const token = generateVerificationToken();
    submission.emailVerificationToken = token;
    await submission.save();

    // Actually send the verification email
    await sendEmailVerification({
      name: submission.name || 'Customer',
      email,
      token,
    });

    return NextResponse.json({
      success: true,
      message: 'Verification email sent',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send verification email' }, { status: 500 });
  }
}
