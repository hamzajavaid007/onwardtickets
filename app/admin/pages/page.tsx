'use client';

import { useState, useEffect, useRef } from 'react';

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

export default function PageEditorPage() {
  const [pages, setPages] = useState<PageListItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPages, setLoadingPages] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingUploadRef = useRef<{ sectionId: string; fieldKey: string; itemId?: string } | null>(null);

  // Fetch page list on mount
  useEffect(() => {
    fetchPages();
  }, []);

  // Fetch page content when selection changes
  useEffect(() => {
    if (selectedSlug) {
      fetchPageContent(selectedSlug);
    } else {
      setPageData(null);
      setExpandedSection(null);
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
        setExpandedSection(null);
      }
    } catch (err) {
      console.error('Failed to fetch page content:', err);
    } finally {
      setLoading(false);
    }
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
                return {
                  ...item,
                  fields: item.fields.map(f =>
                    f.key === fieldKey ? { ...f, value } : f
                  ),
                };
              }),
            };
          }
          return {
            ...section,
            fields: section.fields.map(f =>
              f.key === fieldKey ? { ...f, value } : f
            ),
          };
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
    } catch (err) {
      setSaveMessage('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function renderField(field: SectionField, sectionId: string, itemId?: string) {
    const uploadKey = `${sectionId}-${field.key}-${itemId || ''}`;
    const isUploading = uploadingField === uploadKey;

    if (field.type === 'image') {
      return (
        <div key={field.key} className="mb-4">
          <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{field.label}</label>
          {field.value && (
            <div className="mb-2 relative w-[200px] h-[120px] rounded-lg overflow-hidden border border-gray-200">
              <img src={field.value} alt={field.label} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerUpload(sectionId, field.key, itemId)}
              disabled={isUploading}
              className="px-4 py-2 bg-[#F0F4F8] rounded-lg text-[13px] text-gray-700 hover:bg-gray-200 transition-colors border border-gray-200 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <input
              type="text"
              value={field.value}
              onChange={(e) => updateFieldValue(sectionId, field.key, e.target.value, itemId)}
              placeholder="Or enter image URL"
              className="flex-1 px-3 py-2 bg-[#F8FAFC] rounded-lg text-[13px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors"
            />
          </div>
        </div>
      );
    }

    if (field.type === 'textarea' || field.type === 'richtext') {
      return (
        <div key={field.key} className="mb-4">
          <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{field.label}</label>
          <textarea
            value={field.value}
            onChange={(e) => updateFieldValue(sectionId, field.key, e.target.value, itemId)}
            rows={field.type === 'richtext' ? 8 : 4}
            className="w-full px-3 py-2 bg-[#F8FAFC] rounded-lg text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors resize-y"
          />
        </div>
      );
    }

    return (
      <div key={field.key} className="mb-4">
        <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{field.label}</label>
        <input
          type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'}
          value={field.value}
          onChange={(e) => updateFieldValue(sectionId, field.key, e.target.value, itemId)}
          className="w-full px-3 py-2 bg-[#F8FAFC] rounded-lg text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors"
        />
      </div>
    );
  }

  function renderSection(section: Section) {
    const isExpanded = expandedSection === section.id;
    return (
      <div
        key={section.id}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      >
        {/* Section Header */}
        <button
          onClick={() => setExpandedSection(isExpanded ? null : section.id)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#E3EDFF] flex items-center justify-center text-[12px] font-semibold text-[#2979FF]">
              {section.order + 1}
            </span>
            <div className="text-left">
              <span className="text-[14px] font-medium text-[#0B1437]">{section.label}</span>
              <span className="block text-[11px] text-gray-400 mt-0.5">
                {section.fields.length} field{section.fields.length !== 1 ? 's' : ''}
                {section.items && section.items.length > 0 && ` · ${section.items.length} item${section.items.length !== 1 ? 's' : ''}`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500">{section.type}</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Section Content */}
        {isExpanded && (
          <div className="px-5 pb-5 border-t border-gray-100">
            {/* Section Fields */}
            {section.fields.length > 0 && (
              <div className="pt-4">
                {section.fields.map(field => renderField(field, section.id))}
              </div>
            )}

            {/* Section Items (FAQ, testimonials, cards, etc.) */}
            {section.items && section.items.length > 0 && (
              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[13px] font-semibold text-gray-600">Items ({section.items.length})</h4>
                  <button
                    onClick={() => addItem(section.id)}
                    className="px-3 py-1.5 bg-[#2979FF] text-white rounded-lg text-[12px] font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-1"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {section.items.map((item, idx) => {
                    const firstField = item.fields[0];
                    const itemLabel = firstField?.value
                      ? (firstField.value.length > 50 ? firstField.value.slice(0, 50) + '...' : firstField.value)
                      : `Item ${idx + 1}`;
                    return (
                      <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-[#FAFBFC]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[13px] font-medium text-gray-700">
                            #{idx + 1}: {itemLabel}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveItem(section.id, item.id, 'up')}
                              disabled={idx === 0}
                              className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30"
                              title="Move up"
                            >
                              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => moveItem(section.id, item.id, 'down')}
                              disabled={idx === section.items!.length - 1}
                              className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30"
                              title="Move down"
                            >
                              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => removeItem(section.id, item.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                              title="Remove item"
                            >
                              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {item.fields.map(field => renderField(field, section.id, item.id))}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-[900px]">
      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[22px] font-bold text-[#0B1437]">Page Editor</h2>
        <p className="text-[14px] text-gray-500 mt-1">Manage content on your public pages</p>
      </div>

      {/* Page Selector */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <label className="block text-[13px] font-medium text-gray-700 mb-2">Select a page to edit</label>
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="w-full px-4 py-3 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors appearance-none cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23666' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
        >
          <option value="">-- Choose a page --</option>
          {pages.map(page => (
            <option key={page.slug} value={page.slug}>
              {page.title} {page.hasCustomContent ? '(edited)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-3 border-[#2979FF] border-t-transparent rounded-full animate-spin" />
          <p className="text-[14px] text-gray-500 mt-3">Loading page content...</p>
        </div>
      )}

      {/* No Selection */}
      {!selectedSlug && !loading && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <svg className="mx-auto mb-4 text-gray-300" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <p className="text-[15px] text-gray-400">Select a page from the dropdown above to start editing</p>
        </div>
      )}

      {/* Page Content Editor */}
      {pageData && !loading && (
        <>
          {/* Page Title */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-[#0B1437]">{pageData.title}</h3>
                <p className="text-[12px] text-gray-400 mt-0.5">/{pageData.slug === 'home' ? '' : pageData.slug}</p>
              </div>
              <span className="text-[12px] text-gray-400">{pageData.sections.length} sections</span>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-3 mb-6">
            {pageData.sections
              .sort((a, b) => a.order - b.order)
              .map(section => renderSection(section))}
          </div>

          {/* Save Bar */}
          <div className="sticky bottom-4 bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div className="flex items-center gap-3">
              {saveMessage && (
                <span className={`text-[13px] font-medium ${saveMessage.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
                  {saveMessage}
                </span>
              )}
              {hasChanges && !saveMessage && (
                <span className="text-[13px] text-amber-600 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                  Unsaved changes
                </span>
              )}
            </div>
            <button
              onClick={saveChanges}
              disabled={saving || !hasChanges}
              className="px-6 py-2.5 bg-[#2979FF] text-white rounded-xl text-[14px] font-medium hover:bg-[#1565C0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
