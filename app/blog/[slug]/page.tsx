'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const BlogPostPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const font = 'var(--font-poppins), Poppins, sans-serif';

  useEffect(() => {
    fetchPost();
  }, [slug]);

  useEffect(() => {
    // Scroll reveal animations
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

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/blog`);
      const data = await res.json();
      if (data.success && data.posts) {
        setAllPosts(data.posts);
        const found = data.posts.find((p: any) => p.slug === slug);
        setPost(found || null);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="btn-hover-lift w-full bg-white min-h-[60vh] flex items-center justify-center">
        <div className="btn-hover-lift text-center">
          <div className="btn-hover-lift text-[#2979FF] animate-pulse-slow">Loading post...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="btn-hover-lift w-full bg-white min-h-[60vh] flex items-center justify-center">
        <div className="btn-hover-lift text-center reveal-scale">
          <h1
            className="btn-hover-lift text-[#2979FF] mb-4 glow-text"
            style={{ fontFamily: font, fontSize: '32px', fontWeight: 700 }}
          >
            Post Not Found
          </h1>
          <p style={{ fontFamily: font, fontSize: '16px', color: '#54595F' }}>
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="btn-hover-lift inline-block mt-6 px-6 py-3 bg-[#2979FF] text-white rounded-md hover:bg-[#1e3a5f] transition-all"
            style={{ fontFamily: font, fontSize: '14px', fontWeight: 600 }}
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Find prev/next posts (only from published posts)
  const publishedPosts = allPosts.filter((p) => p.published);
  const currentIdx = publishedPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx > 0 ? publishedPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < publishedPosts.length - 1 ? publishedPosts[currentIdx + 1] : null;

  const postDate = post.date || post.createdAt || new Date();
  const formattedDate = new Date(postDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="btn-hover-lift w-full bg-white">
      {/* Breadcrumb */}
      <div className="btn-hover-lift w-full reveal" style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
        <div className="btn-hover-lift mx-auto max-w-[1240px] px-6 py-4">
          <div
            className="btn-hover-lift flex items-center gap-2"
            style={{ fontFamily: font, fontSize: '13px', color: '#999' }}
          >
            <Link href="/" className="btn-hover-lift hover:text-[#2979FF] transition-colors duration-300 link-underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="btn-hover-lift hover:text-[#2979FF] transition-colors duration-300 link-underline">
              Blog
            </Link>
            <span>/</span>
            <span
              className="btn-hover-lift text-[#54595F]"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '300px',
                display: 'inline-block',
              }}
            >
              {post.title}
            </span>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="btn-hover-lift mx-auto max-w-[1240px] px-6 py-10">
        {/* Featured Image */}
        {post.image && (
          <div
            className="btn-hover-lift w-full bg-gray-200 rounded-md overflow-hidden mb-8 img-zoom reveal"
            style={{ aspectRatio: '16 / 8.5' }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="btn-hover-lift w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML =
                  '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2979FF] to-[#1e3a5f]"><svg class="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>';
              }}
            />
          </div>
        )}

        {/* Category Tag */}
        {post.category && (
          <span className="btn-hover-lift reveal inline-block mb-4 px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105" style={{ background: '#EDF3FF', color: '#2979FF', fontFamily: font }}>
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1
          className="btn-hover-lift text-[#161616] mb-4 reveal glow-text"
          style={{ fontFamily: font, fontSize: '42px', fontWeight: 700, lineHeight: '1.2' }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div
          className="btn-hover-lift flex items-center gap-4 mb-8 reveal"
          style={{ fontFamily: font, fontSize: '14px', color: '#999' }}
        >
          <span>{formattedDate}</span>
          <span>•</span>
          <span className="btn-hover-lift hover:text-[#2979FF] transition-colors duration-300">
            {post.author || 'OnwardTickets'}
          </span>
          {post.comments !== undefined && (
            <>
              <span>•</span>
              <span>
                {post.comments === 0
                  ? 'No Comments'
                  : `${post.comments} Comment${post.comments > 1 ? 's' : ''}`}
              </span>
            </>
          )}
        </div>

        {/* Content */}
        <div
          className="btn-hover-lift prose prose-lg max-w-none text-[#333] reveal"
          style={{
            fontFamily: font,
            lineHeight: '1.8',
            fontSize: '16px',
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="btn-hover-lift mt-12 pt-8 reveal" style={{ borderTop: '1px solid #eee' }}>
            <h3
              style={{ fontFamily: font, fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}
            >
              Tags
            </h3>
            <div className="btn-hover-lift flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={tag}
                  className="btn-hover-lift px-3 py-1 text-sm rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#EDF3FF] hover:text-[#2979FF]"
                  style={{ background: '#f5f5f5', color: '#666', fontFamily: font, animationDelay: `${index * 0.05}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Prev/Next */}
      <div className="btn-hover-lift mx-auto max-w-[1240px] px-6 py-10">
        <div className="btn-hover-lift grid grid-cols-1 md:grid-cols-2 gap-6">
          {prevPost && (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="btn-hover-lift card-hover-lift reveal-left group p-6 border border-gray-200 rounded-lg hover:border-[#2979FF] transition-all"
            >
              <div style={{ fontFamily: font, fontSize: '13px', color: '#999', marginBottom: '8px' }}>
                ← Previous Post
              </div>
              <div
                style={{
                  fontFamily: font,
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#161616',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                className="btn-hover-lift group-hover:text-[#2979FF] transition-colors"
              >
                {prevPost.title}
              </div>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="btn-hover-lift card-hover-lift reveal-right group p-6 border border-gray-200 rounded-lg hover:border-[#2979FF] transition-all md:text-right"
              style={prevPost ? { marginLeft: 'auto' } : {}}
            >
              <div style={{ fontFamily: font, fontSize: '13px', color: '#999', marginBottom: '8px' }}>
                Next Post →
              </div>
              <div
                style={{
                  fontFamily: font,
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#161616',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                className="btn-hover-lift group-hover:text-[#2979FF] transition-colors"
              >
                {nextPost.title}
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Back to Blog */}
      <div className="btn-hover-lift mx-auto max-w-[1240px] px-6 pb-10">
        <Link
          href="/blog"
          className="btn-hover-lift inline-flex items-center gap-2 text-[#2979FF] hover:text-[#1e3a5f] transition-all duration-300 link-underline"
          style={{ fontFamily: font, fontSize: '15px', fontWeight: 500 }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogPostPage;
