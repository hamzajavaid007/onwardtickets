import { NextRequest, NextResponse } from 'next/server';
import { getBlogs, findBlogById, setBlogs } from '@/lib/file-storage';

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

// GET - Fetch single blog post (file storage only)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const post = await findBlogById(postId);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post, usingFallback: true });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post (file storage only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const body = await req.json();

    const { title, excerpt, content, image, category, tags, published } = body;

    const allBlogs = await getBlogs();
    const postIndex = allBlogs.findIndex((p) => p._id === postId);

    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Update post
    const updatedPost = { ...allBlogs[postIndex] };
    if (title !== undefined) {
      updatedPost.title = title;
      updatedPost.slug = generateSlug(title);
    }
    if (excerpt !== undefined) updatedPost.excerpt = excerpt;
    if (content !== undefined) updatedPost.content = content;
    if (image !== undefined) updatedPost.image = image;
    if (category !== undefined) updatedPost.category = category;
    if (tags !== undefined) updatedPost.tags = tags;
    if (published !== undefined) updatedPost.published = published;
    updatedPost.updatedAt = new Date();

    // Update storage
    allBlogs[postIndex] = updatedPost;
    await setBlogs(allBlogs);

    return NextResponse.json({ success: true, post: updatedPost, usingFallback: true });
  } catch (error) {
    console.error('Blog update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post (file storage only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const allBlogs = await getBlogs();
    const postIndex = allBlogs.findIndex((p) => p._id === postId);

    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    allBlogs.splice(postIndex, 1);
    await setBlogs(allBlogs);

    return NextResponse.json({ success: true, message: 'Post deleted', usingFallback: true });
  } catch (error) {
    console.error('Blog delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
