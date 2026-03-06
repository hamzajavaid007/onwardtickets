'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollAnimations from '@/components/ScrollAnimations';

const POSTS_PER_PAGE = 6;

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image: string;
  author: string;
  date: string;
  published: boolean;
  category?: string;
  tags?: string[];
}

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/blog?page=${currentPage}&limit=${POSTS_PER_PAGE}&status=published`);
      const data = await res.json();
      if (data.success) {
        setBlogPosts(data.posts || []);
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const font = 'var(--font-poppins), Poppins, sans-serif';

  return (
    <div className="w-full bg-white">
      <ScrollAnimations />
      {/* Hero Banner */}
      <section className="w-full bg-[#EDF3FF] relative overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-6 relative" style={{ minHeight: '300px' }}>
          {/* Decorative Background Elements - Animated */}
          <div className="absolute right-0 top-0 hidden lg:block animate-float">
            <svg
              width="400"
              height="300"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.1 }}
            >
              <circle cx="350" cy="50" r="200" stroke="#005CFF" strokeWidth="2" />
              <circle cx="350" cy="50" r="150" stroke="#005CFF" strokeWidth="2" />
            </svg>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center reveal" style={{ minHeight: '300px', padding: '80px 0' }}>
            <h1
              className="text-[#161616] glow-text"
              style={{
                fontFamily: font,
                fontSize: '48px',
                fontWeight: 600,
                lineHeight: '1.3',
              }}
            >
              Travel Tips &<br /><span className="text-[#005CFF]">Visa Guides</span>
            </h1>
            <p
              className="mt-4 text-[#54595F]"
              style={{
                fontFamily: font,
                fontSize: '18px',
                lineHeight: '28px',
                maxWidth: '500px',
              }}
            >
              Expert insights, visa application tips, and travel advice to help you navigate your journey with confidence.
            </p>
            <div
              className="mt-6 animate-gradient"
              style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #005CFF, #005CFF, #005CFF)' }}
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <div className="mx-auto max-w-[1240px] px-6 py-12">
        {loading && blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-[#005CFF] animate-pulse-slow">Loading posts...</div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-16 reveal">
            <h3 className="text-[#161616] font-semibold mb-2" style={{ fontFamily: font, fontSize: '16px' }}>
              No blog posts found
            </h3>
            <p className="text-[#54595F]" style={{ fontFamily: font, fontSize: '14px' }}>
              Check back later for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.slug || post._id}
                className="group card-hover-lift reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-sm img-zoom">
                  <div
                    className="w-full bg-gray-200 overflow-hidden"
                    style={{ aspectRatio: '300 / 158' }}
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML =
                            '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#005CFF] to-[#1e3a5f]"><svg class="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>';
                        }}
                      />
                    )}
                  </div>
                </Link>

                {/* Author Avatar */}
                <div className="flex items-center gap-3 mt-4 mb-3">
                  <div
                    className="rounded-full bg-[#005CFF] text-white flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{ width: '32px', height: '32px', fontSize: '13px', fontWeight: 600 }}
                  >
                    {(post.author || 'Admin')
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <span
                    style={{
                      fontFamily: font,
                      fontSize: '13px',
                      color: '#54595F',
                    }}
                    className="hover:text-[#005CFF] transition-colors duration-300"
                  >
                    {post.author || 'Admin'}
                  </span>
                </div>

                {/* Title */}
                <h3>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#005CFF] hover:text-[#1e3a5f] transition-all duration-300 hover:translate-x-1"
                    style={{
                      fontFamily: font,
                      fontSize: '17px',
                      fontWeight: 600,
                      lineHeight: '24px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.title}
                  </Link>
                </h3>

                {/* Date */}
                <div
                  className="flex items-center gap-4 mt-3"
                  style={{
                    fontFamily: font,
                    fontSize: '13px',
                    color: '#999',
                  }}
                >
                  <span>
                    {post.date
                      ? new Date(post.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'No date'}
                  </span>
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-3 text-[#005CFF] hover:text-[#1e3a5f] transition-all duration-300 hover:translate-x-1 link-underline"
                  style={{
                    fontFamily: font,
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Read More &raquo;
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14 reveal">
            {currentPage > 1 && (
              <button
                onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-hover-lift px-3 py-2 text-[#005CFF] hover:bg-gray-100 rounded transition-colors"
                style={{ fontFamily: font, fontSize: '14px' }}
              >
                &larr; Previous
              </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`btn-hover-scale w-10 h-10 rounded flex items-center justify-center transition-all duration-300 ${
                  page === currentPage
                    ? 'bg-[#005CFF] text-white shadow-lg shadow-[#005CFF]/30'
                    : 'text-[#005CFF] hover:bg-gray-100'
                }`}
                style={{ fontFamily: font, fontSize: '14px', fontWeight: 600 }}
              >
                {page}
              </button>
            ))}

            {currentPage < totalPages && (
              <button
                onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-hover-lift px-3 py-2 text-[#005CFF] hover:bg-gray-100 rounded transition-colors"
                style={{ fontFamily: font, fontSize: '14px' }}
              >
                Next &rarr;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
