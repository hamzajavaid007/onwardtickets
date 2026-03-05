import { NextResponse } from 'next/server';
import { PAGE_DEFAULTS } from '@/lib/page-defaults';

export async function GET() {
  try {
    let savedPages: any[] = [];
    try {
      const { default: dbConnect } = await import('@/lib/mongodb');
      const { default: PageContent } = await import('@/lib/models/PageContent');
      await dbConnect();
      savedPages = await PageContent.find({}, 'slug title updatedAt').lean();
    } catch {
      // DB unavailable, continue with defaults only
    }

    const savedMap = new Map(savedPages.map((p: any) => [p.slug, p]));

    const pages = PAGE_DEFAULTS.map(def => {
      const saved = savedMap.get(def.slug);
      return {
        slug: def.slug,
        title: def.title,
        hasCustomContent: !!saved,
        lastEdited: saved ? (saved as any).updatedAt : null,
      };
    });

    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch pages' }, { status: 500 });
  }
}
