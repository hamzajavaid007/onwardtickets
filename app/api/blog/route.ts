import { NextRequest, NextResponse } from 'next/server';
import { getBlogs, addBlog } from '@/lib/file-storage';

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

// GET - Fetch all blog posts (file storage only)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // 'published' or 'all'

    let posts = await getBlogs();

    if (status === 'published') {
      posts = posts.filter((p) => p.published);
    }

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply pagination
    const skip = (page - 1) * limit;
    posts = posts.slice(skip, skip + limit);
    const total = posts.length;

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      usingFallback: true,
    });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post (file storage only)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, excerpt, content, image, category, tags, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);

    const newPost: any = {
      _id: Date.now().toString(),
      title,
      slug,
      excerpt: excerpt || '',
      content,
      image: image || '',
      author: 'OnwardTickets',
      date: new Date(),
      published: published !== false,
      comments: 0,
      category,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await addBlog(newPost);
    return NextResponse.json({
      success: true,
      post: newPost,
      usingFallback: true,
    });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
