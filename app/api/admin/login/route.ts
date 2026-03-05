import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, generateSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, rememberMe } = await req.json();

    if (!(await verifyAdminCredentials(email, password))) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    const sessionToken = generateSessionToken();
    await setSessionCookie(sessionToken);

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token: sessionToken,
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
