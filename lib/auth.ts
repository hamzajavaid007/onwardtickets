import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@onwardtickets.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_SECRET = process.env.SESSION_SECRET || 'onward-tickets-secret-key';
const SESSION_NAME = 'admin_session';

// Generate cryptographically secure session token with HMAC signature
export function generateSessionToken(): string {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(32).toString('hex');
  const payload = `${timestamp}:${random}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

// Verify session token signature and expiry
export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;
    const [timestamp, random, signature] = parts;
    const payload = `${timestamp}:${random}`;
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const age = Date.now() - parseInt(timestamp);
    return age < 7 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_NAME);
}

// Get session from cookies
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_NAME)?.value;

  if (!token) return null;

  if (!verifySessionToken(token)) {
    await clearSessionCookie();
    return null;
  }

  return { authenticated: true, token };
}

// Verify admin credentials — checks DB first, falls back to env vars
export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  try {
    const dbConnect = (await import('@/lib/mongodb')).default;
    const AdminUser = (await import('@/lib/models/AdminUser')).default;
    await dbConnect();

    const admin = await AdminUser.findOne({ email });
    if (admin) {
      return admin.comparePassword(password);
    }

    // Fallback to env vars (for first-time setup / migration)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Auto-create admin in DB for future logins
      await AdminUser.create({ email, password }).catch(() => {});
      return true;
    }

    return false;
  } catch {
    // If DB is unavailable, fall back to env var check
    return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

// Middleware helper
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

// Generate a password reset token (expires in 1 hour)
export function generateResetToken(): string {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(32).toString('hex');
  const payload = `${timestamp}:${random}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(`reset:${payload}`).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64url');
}

// Verify a password reset token (1 hour expiry)
export function verifyResetToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString();
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;
    const [timestamp, random, signature] = parts;
    const payload = `${timestamp}:${random}`;
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(`reset:${payload}`).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const age = Date.now() - parseInt(timestamp);
    return age < 60 * 60 * 1000; // 1 hour
  } catch {
    return false;
  }
}
