'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  published: boolean;
  comments: number;
  category?: string;
  tags?: string[];
}

const BlogCMSPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published'>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    tags: '',
    published: true,
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const statusParam = filterStatus === 'published' ? 'published' : '';
      const res = await fetch(`/api/blog?status=${statusParam}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filterStatus]);

  // Filter posts
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, image: data.url });
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Open create/edit modal
  const openModal = (post: BlogPost | null = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        image: post.image || '',
        category: post.category || '',
        tags: post.tags?.join(', ') || '',
        published: post.published,
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        category: '',
        tags: '',
        published: true,
      });
    }
    setShowModal(true);
  };

  // Save post
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingPost
        ? `/api/blog/${editingPost._id}`
        : '/api/blog';

      const body = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        published: formData.published,
      };

      const res = await fetch(url, {
        method: editingPost ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        setShowModal(false);
        fetchPosts();
        setEditingPost(null);
      } else {
        alert(data.error || 'Failed to save post');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  // Delete post
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        fetchPosts();
        setDeleteId(null);
      } else {
        alert(data.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete post');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="btn-hover-lift space-y-6">
      {/* Header */}
      <div className="btn-hover-lift flex items-center justify-between">
        <div>
          <h1 className="btn-hover-lift text-[22px] font-bold text-[#0B1437]">Blog Management</h1>
          <p className="btn-hover-lift text-[14px] text-gray-500 mt-1">Create, edit, and manage blog posts</p>
        </div>
        <button
          onClick={() => openModal()}
          className="btn-hover-lift flex items-center gap-2 bg-[#005CFF] hover:bg-[#0047CC] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4m16 0l8.8M12 4l-8.8H4" />
          </svg>
          New Post
        </button>
      </div>

      {/* Filters & Search */}
      <div className="btn-hover-lift flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="btn-hover-lift flex-1 px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#005CFF] focus:outline-none"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published')}
          className="btn-hover-lift px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#005CFF] focus:outline-none"
        >
          <option value="all">All Posts</option>
          <option value="published">Published Only</option>
        </select>
      </div>

      {/* Posts Table */}
      {loading ? (
        <div className="btn-hover-lift bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="btn-hover-lift inline-block animate-spin text-[#005CFF]" style={{ width: '32px', height: '32px', border: '3px solid #e5e7eb', borderTopColor: '#005CFF', borderRadius: '50%' }}></div>
          <p className="btn-hover-lift text-[14px] text-gray-500 mt-4">Loading posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="btn-hover-lift bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <p className="btn-hover-lift text-[14px] text-gray-500">No posts found</p>
        </div>
      ) : (
        <div className="btn-hover-lift bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="btn-hover-lift w-full">
            <thead>
              <tr className="btn-hover-lift bg-[#F8FAFC]">
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Image</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Title</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Date</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Status</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Comments</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="btn-hover-lift divide-y divide-gray-50">
              {filteredPosts.map((post) => (
                <tr key={post._id} className="btn-hover-lift hover:bg-[#F8FAFC] transition-colors">
                  <td className="btn-hover-lift px-6 py-4">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="btn-hover-lift w-16 h-16 rounded-lg object-cover" />
                    ) : (
                      <div className="btn-hover-lift w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l16-16v6.228M9 16a3 3 0 11-6 0l-6 6m6.228 15v-9a3 3 0 016 6l-6 6m9 10a3 3 0 00-3 3m0 0l-3 3" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="btn-hover-lift px-6 py-4">
                    <Link href={`/blog/${post.slug}`} className="btn-hover-lift text-[13px] font-medium text-[#0B1437] hover:text-[#005CFF]">
                      {post.title}
                    </Link>
                  </td>
                  <td className="btn-hover-lift px-6 py-4 text-[13px] text-gray-500">
                    {formatDate(post.date)}
                  </td>
                  <td className="btn-hover-lift px-6 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="btn-hover-lift px-6 py-4 text-[13px] text-gray-500">
                    {post.comments}
                  </td>
                  <td className="btn-hover-lift px-6 py-4">
                    <div className="btn-hover-lift flex items-center gap-2">
                      <button onClick={() => openModal(post)} className="btn-hover-lift p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#005CFF]" title="Edit">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002 2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586a2 2 0 012.828-2.828L20 7m-9 9l4 4L5 13" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(post._id)} className="btn-hover-lift p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500" title="Delete">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1 10V4a1 1 0 001-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <Link href={`/blog/${post.slug}`} target="_blank" className="btn-hover-lift p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#005CFF]" title="View">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a1 1 0 001-1V7a4 4 0 00-4-4z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2 10h6m4 0h6" />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="btn-hover-lift fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="btn-hover-lift bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="btn-hover-lift flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <h2 className="btn-hover-lift text-[18px] font-semibold text-[#0B1437]">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button onClick={() => setShowModal(false)} className="btn-hover-lift p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="btn-hover-lift flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-700 mb-1.5">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#005CFF] focus:outline-none"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-700 mb-1.5">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#005CFF] focus:outline-none resize-y"
                  rows={2}
                  placeholder="Short description (shown in list view)"
                />
              </div>

              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-700 mb-1.5">Content *</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#005CFF] focus:outline-none resize-y font-mono"
                  rows={15}
                  placeholder="Enter HTML content (supports tags like h2, p, ul, etc.)"
                />
              </div>

              <div className="btn-hover-lift grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="btn-hover-lift block text-[13px] font-medium text-gray-700 mb-1.5">Featured Image</label>
                  <div className="btn-hover-lift flex items-start gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      className="btn-hover-lift hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="btn-hover-lift flex-1 px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[13px] border border-dashed border-2 border-gray-300 hover:border-[#005CFF] focus:border-[#005CFF] focus:outline-none transition-colors text-left"
                    >
                      {uploading ? (
                        <>
                          <svg className="btn-hover-lift animate-spin w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} strokeDasharray="31.42" strokeDashoffset="10" />
                          </svg>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <svg className="btn-hover-lift w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l16-16v6.228M9 16a3 3 0 11-6 0l-6 6m6.228 15v-9a3 3 0 016 6l-6 6m9 10a3 3 0 00-3 3m0 0l-3 3" />
                          </svg>
                          Click to upload image
                        </>
                      )}
                    </button>
                  </div>
                  {formData.image && (
                    <div className="btn-hover-lift relative flex-shrink-0 mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="btn-hover-lift w-20 h-20 rounded-lg object-cover border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="btn-hover-lift absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="btn-hover-lift block text-[13px] font-medium text-gray-700 mb-1.5">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#005CFF] focus:outline-none"
                    placeholder="e.g. Visa Tips"
                  />
                </div>
              </div>

              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-700 mb-1.5">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#005CFF] focus:outline-none"
                  placeholder="e.g. visa, travel, tips"
                />
              </div>

              <div className="btn-hover-lift flex items-center gap-3">
                <label className="btn-hover-lift flex items-center gap-2 text-[13px] font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="btn-hover-lift w-4 h-4 accent-[#005CFF]"
                  />
                  Published
                </label>
              </div>
            </form>

            <div className="btn-hover-lift flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-[#F8FAFC] flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn-hover-lift px-5 py-2.5 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-hover-lift flex items-center gap-2 bg-[#005CFF] hover:bg-[#0047CC] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
              >
                {saving ? (
                  <>
                    <svg className="btn-hover-lift animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} strokeDasharray="31.42" strokeDashoffset="10" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Post'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCMSPage;
