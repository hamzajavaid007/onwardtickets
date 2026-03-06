'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';

interface SectionField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'richtext' | 'image' | 'url' | 'number';
  value: string;
}

interface SectionItem {
  id: string;
  fields: SectionField[];
}

interface Section {
  id: string;
  type: string;
  label: string;
  order: number;
  fields: SectionField[];
  items?: SectionItem[];
}

interface PageData {
  slug: string;
  title: string;
  sections: Section[];
}

interface PageListItem {
  slug: string;
  title: string;
  hasCustomContent: boolean;
  lastEdited: string | null;
}

// Icons for pages
const pageIcons: Record<string, ReactNode> = {
  global: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  home: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
    </svg>
  ),
  about: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  'become-a-partner': (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'visa-assistant': (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  'contact-us': (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  'privacy-policy': (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  'terms-conditions': (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  'refund-returns': (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
    </svg>
  ),
};

const defaultPageIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

export default function PageEditorPage() {
  const [pages, setPages] = useState<PageListItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPages, setLoadingPages] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingUploadRef = useRef<{ sectionId: string; fieldKey: string; itemId?: string } | null>(null);

  useEffect(() => { fetchPages(); }, []);

  useEffect(() => {
    if (selectedSlug) {
      fetchPageContent(selectedSlug);
    } else {
      setPageData(null);
      setSelectedSectionId(null);
    }
  }, [selectedSlug]);

  async function fetchPages() {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      if (data.success) setPages(data.pages);
    } catch (err) {
      console.error('Failed to fetch pages:', err);
    } finally {
      setLoadingPages(false);
    }
  }

  async function fetchPageContent(slug: string) {
    setLoading(true);
    setHasChanges(false);
    setSaveMessage('');
    try {
      const res = await fetch(`/api/pages/${slug}`);
      const data = await res.json();
      if (data.success) {
        setPageData(data.page);
      }
    } catch (err) {
      console.error('Failed to fetch page content:', err);
    } finally {
      setLoading(false);
    }
  }

  function togglePage(slug: string) {
    const isCurrentlyExpanded = expandedPages.has(slug);
    setExpandedPages(prev => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
    // Load page data and auto-select first section
    if (selectedSlug !== slug) {
      setSelectedSlug(slug);
      setSelectedSectionId(null);
    } else if (isCurrentlyExpanded) {
      // Collapsing - deselect section
      setSelectedSectionId(null);
    }
  }

  // Auto-select first section when page data loads
  useEffect(() => {
    if (pageData && !selectedSectionId && expandedPages.has(pageData.slug)) {
      const sorted = [...pageData.sections].sort((a, b) => a.order - b.order);
      if (sorted.length > 0) {
        setSelectedSectionId(sorted[0].id);
      }
    }
  }, [pageData]);

  function selectSection(slug: string, sectionId: string) {
    if (selectedSlug !== slug) {
      setSelectedSlug(slug);
    }
    setSelectedSectionId(sectionId);
    // Ensure page is expanded
    setExpandedPages(prev => {
      const next = new Set(prev);
      next.add(slug);
      return next;
    });
  }

  function updateFieldValue(sectionId: string, fieldKey: string, value: string, itemId?: string) {
    if (!pageData) return;
    setPageData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map(section => {
          if (section.id !== sectionId) return section;
          if (itemId && section.items) {
            return {
              ...section,
              items: section.items.map(item => {
                if (item.id !== itemId) return item;
                return { ...item, fields: item.fields.map(f => f.key === fieldKey ? { ...f, value } : f) };
              }),
            };
          }
          return { ...section, fields: section.fields.map(f => f.key === fieldKey ? { ...f, value } : f) };
        }),
      };
    });
    setHasChanges(true);
  }

  function addItem(sectionId: string) {
    if (!pageData) return;
    setPageData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map(section => {
          if (section.id !== sectionId) return section;
          const existingItems = section.items || [];
          const templateItem = existingItems[0];
          if (!templateItem) return section;
          const newItem: SectionItem = {
            id: `item-${Date.now()}`,
            fields: templateItem.fields.map(f => ({ ...f, value: '' })),
          };
          return { ...section, items: [...existingItems, newItem] };
        }),
      };
    });
    setHasChanges(true);
  }

  function removeItem(sectionId: string, itemId: string) {
    if (!pageData) return;
    setPageData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map(section => {
          if (section.id !== sectionId || !section.items) return section;
          if (section.items.length <= 1) return section;
          return { ...section, items: section.items.filter(i => i.id !== itemId) };
        }),
      };
    });
    setHasChanges(true);
  }

  function moveItem(sectionId: string, itemId: string, direction: 'up' | 'down') {
    if (!pageData) return;
    setPageData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map(section => {
          if (section.id !== sectionId || !section.items) return section;
          const items = [...section.items];
          const idx = items.findIndex(i => i.id === itemId);
          if (idx === -1) return section;
          const newIdx = direction === 'up' ? idx - 1 : idx + 1;
          if (newIdx < 0 || newIdx >= items.length) return section;
          [items[idx], items[newIdx]] = [items[newIdx], items[idx]];
          return { ...section, items };
        }),
      };
    });
    setHasChanges(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !pendingUploadRef.current) return;
    const { sectionId, fieldKey, itemId } = pendingUploadRef.current;
    const uploadKey = `${sectionId}-${fieldKey}-${itemId || ''}`;
    setUploadingField(uploadKey);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        updateFieldValue(sectionId, fieldKey, data.url, itemId);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploadingField(null);
      pendingUploadRef.current = null;
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function triggerUpload(sectionId: string, fieldKey: string, itemId?: string) {
    pendingUploadRef.current = { sectionId, fieldKey, itemId };
    fileInputRef.current?.click();
  }

  async function resetToDefaults() {
    if (!pageData) return;
    if (!confirm(`Reset "${currentPageTitle}" to default content? This will discard all custom changes.`)) return;
    setSaving(true);
    setSaveMessage('');
    try {
      const res = await fetch(`/api/pages/${pageData.slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSaveMessage('Reset to defaults!');
        fetchPages();
        fetchPageContent(pageData.slug);
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        // If DELETE not supported, just refetch defaults
        fetchPageContent(pageData.slug);
        setSaveMessage('Reset to defaults!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch {
      fetchPageContent(pageData.slug);
      setSaveMessage('Reset to defaults!');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function saveChanges() {
    if (!pageData) return;
    setSaving(true);
    setSaveMessage('');
    try {
      const res = await fetch(`/api/pages/${pageData.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: pageData.title, sections: pageData.sections }),
      });
      const data = await res.json();
      if (data.success) {
        setHasChanges(false);
        setSaveMessage('Changes saved successfully!');
        fetchPages();
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Failed to save changes. Please try again.');
      }
    } catch {
      setSaveMessage('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  // Get the currently selected section
  const currentSection = pageData?.sections.find(s => s.id === selectedSectionId) || null;
  const currentPageTitle = pages.find(p => p.slug === selectedSlug)?.title || '';

  function renderField(field: SectionField, sectionId: string, itemId?: string) {
    const uploadKey = `${sectionId}-${field.key}-${itemId || ''}`;
    const isUploading = uploadingField === uploadKey;

    if (field.type === 'image') {
      return (
        <div key={field.key} className="mb-5">
          <label className="block text-[13px] font-medium text-gray-600 mb-2">{field.label}</label>
          {field.value && (
            <div className="mb-2.5 relative w-[200px] h-[120px] rounded-lg overflow-hidden border border-gray-200">
              <img src={field.value} alt={field.label} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerUpload(sectionId, field.key, itemId)}
              disabled={isUploading}
              className="px-4 py-2.5 bg-[#F0F4F8] rounded-lg text-[13px] text-gray-700 hover:bg-gray-200 transition-colors border border-gray-200 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <input
              type="text"
              value={field.value}
              onChange={(e) => updateFieldValue(sectionId, field.key, e.target.value, itemId)}
              placeholder="Or enter image URL"
              className="flex-1 px-3.5 py-2.5 bg-[#F8FAFC] rounded-lg text-[14px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none transition-colors"
            />
          </div>
        </div>
      );
    }

    if (field.type === 'textarea' || field.type === 'richtext') {
      return (
        <div key={field.key} className="mb-5">
          <label className="block text-[13px] font-medium text-gray-600 mb-2">{field.label}</label>
          <textarea
            value={field.value}
            onChange={(e) => updateFieldValue(sectionId, field.key, e.target.value, itemId)}
            rows={field.type === 'richtext' ? 8 : 4}
            className="w-full px-3.5 py-2.5 bg-[#F8FAFC] rounded-lg text-[14px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none transition-colors resize-y"
          />
        </div>
      );
    }

    return (
      <div key={field.key} className="mb-5">
        <label className="block text-[13px] font-medium text-gray-600 mb-2">{field.label}</label>
        <input
          type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'}
          value={field.value}
          onChange={(e) => updateFieldValue(sectionId, field.key, e.target.value, itemId)}
          className="w-full px-3.5 py-2.5 bg-[#F8FAFC] rounded-lg text-[14px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none transition-colors"
        />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* ─── LEFT SIDEBAR ─── */}
      <div className="w-[260px] min-w-[260px] bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider">Pages</h3>
        </div>
        <nav className="py-2">
          {loadingPages ? (
            <div className="px-4 py-8 text-center">
              <div className="inline-block w-5 h-5 border-2 border-[#1B4F72] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            pages.map(page => {
              const isExpanded = expandedPages.has(page.slug);
              const isActivePage = selectedSlug === page.slug;
              const sections = pageData?.slug === page.slug ? pageData.sections : [];
              const icon = pageIcons[page.slug] || defaultPageIcon;

              return (
                <div key={page.slug}>
                  {/* Page Item */}
                  <button
                    onClick={() => togglePage(page.slug)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isActivePage ? 'bg-[#1B4F72] text-white' : 'text-[#2D3748] hover:bg-gray-50'
                    }`}
                  >
                    <span className={isActivePage ? 'text-white' : 'text-[#1B4F72]'}>{icon}</span>
                    <span className="text-[14px] font-medium flex-1">{page.title}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''} ${isActivePage ? 'text-white/70' : 'text-gray-400'}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Section Sub-items */}
                  {isExpanded && isActivePage && sections.length > 0 && (
                    <div className="bg-[#F7FAFC]">
                      {sections
                        .sort((a, b) => a.order - b.order)
                        .map(section => {
                          const isSectionActive = selectedSectionId === section.id;
                          return (
                            <button
                              key={section.id}
                              onClick={() => selectSection(page.slug, section.id)}
                              className={`w-full flex items-center gap-2.5 pl-11 pr-4 py-2 text-left transition-colors ${
                                isSectionActive
                                  ? 'bg-[#EBF2FA] text-[#1B4F72] font-medium'
                                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isSectionActive ? 'bg-[#1B4F72]' : 'bg-gray-300'}`} />
                              <span className="text-[13px]">{section.label}</span>
                            </button>
                          );
                        })}
                    </div>
                  )}

                  {/* Loading sections placeholder */}
                  {isExpanded && isActivePage && loading && (
                    <div className="bg-[#F7FAFC] px-4 py-3 text-center">
                      <div className="inline-block w-4 h-4 border-2 border-[#1B4F72] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </nav>
      </div>

      {/* ─── RIGHT CONTENT AREA ─── */}
      <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        {/* Top Header - always visible */}
        <div className="sticky top-0 z-10 bg-[#F8FAFC] border-b border-gray-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-bold text-[#0B1437]">Content Management</h1>
              {currentSection ? (
                <p className="text-[13px] text-gray-400 mt-0.5">
                  <span className="text-[#1B4F72] font-medium">{currentPageTitle}</span>
                  <span className="mx-1.5">&rsaquo;</span>
                  <span className="text-gray-600">{currentSection.label}</span>
                </p>
              ) : (
                <p className="text-[13px] text-gray-400 mt-0.5">Select a page and section to edit</p>
              )}
            </div>
            {currentSection && (
              <div className="flex items-center gap-3">
                {saveMessage && (
                  <span className={`text-[13px] font-medium ${saveMessage.includes('success') || saveMessage.includes('Reset') ? 'text-green-600' : 'text-red-500'}`}>
                    {saveMessage}
                  </span>
                )}
                <button
                  onClick={resetToDefaults}
                  className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-[13px] font-medium hover:bg-gray-50 transition-colors"
                >
                  Reset to Defaults
                </button>
                <button
                  onClick={saveChanges}
                  disabled={saving || !hasChanges}
                  className="px-5 py-2.5 bg-[#1B4F72] text-white rounded-xl text-[13px] font-medium hover:bg-[#163d5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* No Selection State */}
        {!selectedSectionId && !loading && (
          <div className="flex items-center justify-center" style={{ height: 'calc(100% - 90px)' }}>
            <div className="text-center">
              <svg className="mx-auto mb-4 text-gray-300" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <p className="text-[16px] text-gray-400 font-medium">Select a page and section to start editing</p>
              <p className="text-[13px] text-gray-300 mt-1">Choose from the sidebar on the left</p>
            </div>
          </div>
        )}

        {/* Section Content */}
        {currentSection && !loading && (
          <div className="max-w-[900px]">
            {/* Section Fields */}
            <div className="px-8 py-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                {currentSection.fields.map(field => renderField(field, currentSection.id))}
              </div>

              {/* Section Items (Navigation Links, FAQ, Cards, etc.) */}
              {currentSection.items && currentSection.items.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[14px] font-semibold text-[#0B1437]">
                      {currentSection.type === 'header' ? 'Navigation Links' :
                       currentSection.type === 'footer' ? 'Footer Links' :
                       currentSection.type === 'cards' ? 'Cards' :
                       currentSection.type === 'faq' ? 'FAQ Items' :
                       'Items'}
                    </h4>
                    <button
                      onClick={() => addItem(currentSection.id)}
                      className="px-3 py-1.5 bg-[#1B4F72] text-white rounded-lg text-[12px] font-medium hover:bg-[#163d5a] transition-colors flex items-center gap-1"
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Add
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentSection.items.map((item, idx) => {
                      const labelField = item.fields[0];
                      const secondField = item.fields[1];
                      return (
                        <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-[#FAFBFC]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[13px] font-semibold text-gray-500">#{idx + 1}</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => moveItem(currentSection.id, item.id, 'up')}
                                disabled={idx === 0}
                                className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30 text-gray-500"
                                title="Move up"
                              >
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => moveItem(currentSection.id, item.id, 'down')}
                                disabled={idx === currentSection.items!.length - 1}
                                className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30 text-gray-500"
                                title="Move down"
                              >
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => removeItem(currentSection.id, item.id)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors"
                                title="Remove"
                              >
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {/* Render item fields side by side if 2 fields, or stacked */}
                          {item.fields.length === 2 ? (
                            <div className="grid grid-cols-2 gap-4">
                              {item.fields.map(field => (
                                <div key={field.key}>
                                  <label className="block text-[12px] font-medium text-gray-500 mb-1.5">{field.label}</label>
                                  <input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => updateFieldValue(currentSection.id, field.key, e.target.value, item.id)}
                                    className="w-full px-3 py-2 bg-white rounded-lg text-[13px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none transition-colors"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            item.fields.map(field => renderField(field, currentSection.id, item.id))
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Unsaved changes indicator */}
            {hasChanges && !saveMessage && (
              <div className="px-8 pb-4">
                <span className="text-[13px] text-amber-600 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                  You have unsaved changes
                </span>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-3 border-[#1B4F72] border-t-transparent rounded-full animate-spin" />
              <p className="text-[14px] text-gray-400 mt-3">Loading content...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
