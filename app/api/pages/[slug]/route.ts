import { NextRequest, NextResponse } from 'next/server';
import { getPageDefault } from '@/lib/page-defaults';
import { cookies } from 'next/headers';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Try DB first
    try {
      const { default: dbConnect } = await import('@/lib/mongodb');
      const { default: PageContent } = await import('@/lib/models/PageContent');
      await dbConnect();
      const page = await PageContent.findOne({ slug }).lean();
      if (page) {
        return NextResponse.json({ success: true, page, isDefault: false });
      }
    } catch {
      // DB unavailable, fall through to defaults
    }

    const defaults = getPageDefault(slug);
    if (!defaults) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, page: defaults, isDefault: true });
  } catch (error) {
    console.error('Failed to fetch page:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch page' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Dynamic import auth to avoid module-level crash
    try {
      const { verifySessionToken } = await import('@/lib/auth');
      if (!verifySessionToken(token)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ success: false, error: 'Auth module unavailable' }, { status: 500 });
    }

    const { slug } = await params;
    const body = await req.json();

    const defaults = getPageDefault(slug);
    if (!defaults) {
      return NextResponse.json({ success: false, error: 'Invalid page slug' }, { status: 400 });
    }

    const { default: dbConnect } = await import('@/lib/mongodb');
    const { default: PageContent } = await import('@/lib/models/PageContent');
    await dbConnect();

    const page = await PageContent.findOneAndUpdate(
      { slug },
      { slug, title: body.title || defaults.title, sections: body.sections },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error('Failed to save page:', error);
    return NextResponse.json({ success: false, error: 'Failed to save page' }, { status: 500 });
  }
}
