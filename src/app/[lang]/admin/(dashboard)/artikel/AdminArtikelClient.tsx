'use client';

import React, { useState, useRef } from 'react';
import { createArticle } from '@/app/actions/articleActions';
import { useRouter } from 'next/navigation';
import { 
  Eye, ChevronDown, Type, Bold, Italic, List, GripHorizontal, 
  Link as LinkIcon, Code, AlignLeft, Trash2, ArrowUp, ArrowDown, Move, 
  Image as ImageIcon, Plus, Calendar, Clock, X
} from 'lucide-react';

interface Article {
  id: string;
  slug: string;
  titleId: string;
  author?: { name: string | null };
  createdAt: Date | string;
  imageUrl?: string | null;
}

export default function AdminArtikelClient({ 
  articles, 
  authorId 
}: { 
  articles: Article[], 
  authorId: string 
}) {
  const router = useRouter();
  
  // State for tabs and language
  const [activeTab, setActiveTab] = useState('Content');
  const [editingLanguage, setEditingLanguage] = useState<'English' | 'Indonesia'>('Indonesia');

  // Form State
  const [titleId, setTitleId] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [contentId, setContentId] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic getters based on selected language
  const currentTitle = editingLanguage === 'Indonesia' ? titleId : titleEn;
  const currentContent = editingLanguage === 'Indonesia' ? contentId : contentEn;

  const setCurrentTitle = (val: string) => {
    if (editingLanguage === 'Indonesia') setTitleId(val);
    else setTitleEn(val);
  };

  const setCurrentContent = (val: string) => {
    if (editingLanguage === 'Indonesia') setContentId(val);
    else setContentEn(val);
  };

  const handleSave = async () => {
    if (!titleId || !contentId || !titleEn || !contentEn) {
      alert("Judul dan Konten untuk kedua bahasa (Indonesia & English) wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('titleId', titleId);
      formData.append('titleEn', titleEn);
      formData.append('contentId', contentId);
      formData.append('contentEn', contentEn);
      formData.append('imageUrl', imageUrl);
      formData.append('authorId', authorId);

      await createArticle(formData);
      
      // Reset form
      setTitleId('');
      setTitleEn('');
      setContentId('');
      setContentEn('');
      setImageUrl('');
      
      alert('Artikel berhasil disimpan!');
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan saat menyimpan.');
    }
    setIsSubmitting(false);
  };
  
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#334155', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          placeholder={`Article Title (${editingLanguage})`}
          style={{ flex: 1, minWidth: '300px', padding: '0.75rem 1rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none' }}
        />
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          
          <div style={{ position: 'relative' }}>
            <select
              value={editingLanguage}
              onChange={(e) => setEditingLanguage(e.target.value as any)}
              style={{
                appearance: 'none',
                padding: '0.625rem 2.5rem 0.625rem 1rem', 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '0.375rem', 
                color: '#475569', 
                fontWeight: '500', 
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="Indonesia">Indonesia</option>
              <option value="English">English</option>
            </select>
            <ChevronDown size={16} color="#64748b" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
          
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.375rem', color: '#475569', fontWeight: '500', cursor: 'pointer' }}>
            <Eye size={18} /> Preview
          </button>
          
          <div style={{ display: 'flex' }}>
            <button 
              onClick={handleSave}
              disabled={isSubmitting}
              style={{ padding: '0.625rem 1.25rem', backgroundColor: '#3b82f6', border: '1px solid #3b82f6', borderRadius: '0.375rem 0 0 0.375rem', color: 'white', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button style={{ padding: '0.625rem 0.5rem', backgroundColor: '#3b82f6', border: '1px solid #3b82f6', borderLeft: '1px solid rgba(255,255,255,0.2)', borderRadius: '0 0.375rem 0.375rem 0', color: 'white', cursor: 'pointer' }}>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Main Content Area */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
            {['Content', 'Meta', 'SEO'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ 
                  padding: '1rem 2rem', 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  borderRight: '1px solid #e2e8f0',
                  color: activeTab === tab ? '#3b82f6' : '#64748b', 
                  fontWeight: activeTab === tab ? '600' : '500',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ padding: '2rem' }}>
            
            {activeTab === 'Content' ? (
              <>
                {/* Text Block */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', marginBottom: '1.5rem', backgroundColor: '#f8fafc' }}>
                  
                  {/* Block Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', fontWeight: '600', fontSize: '0.875rem' }}>
                      <ChevronDown size={16} /> Text
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem', color: '#94a3b8' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'inherit' }}><Trash2 size={14} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'inherit' }}><ArrowDown size={14} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'inherit' }}><ArrowUp size={14} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'inherit' }}><Move size={14} /></button>
                    </div>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'white', borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
                    {/* Toolbar */}
                    <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1rem', color: '#64748b' }}>
                      <Type size={16} style={{ cursor: 'pointer' }} />
                      <Bold size={16} style={{ cursor: 'pointer' }} />
                      <Italic size={16} style={{ cursor: 'pointer' }} />
                      <List size={16} style={{ cursor: 'pointer' }} />
                      <GripHorizontal size={16} style={{ cursor: 'pointer' }} />
                      <LinkIcon size={16} style={{ cursor: 'pointer' }} />
                      <Code size={16} style={{ cursor: 'pointer' }} />
                      <AlignLeft size={16} style={{ cursor: 'pointer' }} />
                    </div>
                    
                    {/* Editor Content */}
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#334155', margin: '0 0 1rem 0' }}>
                        {currentTitle || `Judul Artikel (${editingLanguage})`}
                      </h2>
                      <textarea
                        value={currentContent}
                        onChange={(e) => setCurrentContent(e.target.value)}
                        placeholder={`Mulai ketik isi artikel di sini... (${editingLanguage})`}
                        style={{ 
                          width: '100%', 
                          minHeight: '200px', 
                          border: 'none', 
                          outline: 'none', 
                          resize: 'vertical',
                          fontSize: '1rem', 
                          color: '#475569', 
                          lineHeight: 1.6,
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Image Block */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', marginBottom: '1.5rem', backgroundColor: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: 'white', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', fontWeight: '600', fontSize: '0.875rem' }}>
                      <ChevronDown size={16} /> Image
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem', color: '#94a3b8' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'inherit' }}><Trash2 size={14} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'inherit' }}><ArrowDown size={14} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'inherit' }}><ArrowUp size={14} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'inherit' }}><Move size={14} /></button>
                    </div>
                  </div>
                  
                  <div style={{ padding: '1rem', backgroundColor: 'white', borderTop: '1px solid #e2e8f0', borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#64748b' }}>Image URL*</span>
                      <input 
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', outline: 'none', width: '100%', fontSize: '0.875rem' }} 
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#64748b' }}>Caption</span>
                      <input type="text" style={{ padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', outline: 'none' }} />
                    </div>
                  </div>
                </div>

                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.375rem', color: '#475569', fontWeight: '500', cursor: 'pointer' }}>
                  <Plus size={18} /> Add block
                </button>
              </>
            ) : (
              <div style={{ padding: '2rem 0', color: '#94a3b8', textAlign: 'center' }}>
                Pengaturan {activeTab} belum tersedia.
              </div>
            )}

          </div>
        </div>

        {/* Right Sidebar */}
        <div>
          {/* Author */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Author</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', backgroundColor: 'white', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '0.25rem', backgroundColor: '#e2e8f0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  A
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#334155' }}>Admin Default</span>
              </div>
              <ChevronDown size={16} color="#94a3b8" />
            </div>
          </div>

          {/* Post date */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Post date</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', backgroundColor: 'white' }}>
                <span style={{ fontSize: '0.875rem', color: '#334155' }}>
                  {new Date().toLocaleDateString('en-GB')}
                </span>
                <Calendar size={16} color="#94a3b8" />
              </div>
              <div style={{ width: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', backgroundColor: 'white' }}>
                <span style={{ fontSize: '0.875rem', color: '#334155' }}>
                  {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <Clock size={16} color="#94a3b8" />
              </div>
            </div>
          </div>

          {/* Category */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Category</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', color: '#475569' }}>
                  Big Data <X size={12} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <Plus size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          {/* Tag */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Tag</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', color: '#475569' }}>
                  Big Data <X size={12} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <Plus size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '1.5rem 0' }}></div>

          {/* Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#475569', fontWeight: '500' }}>Published globally</span>
              <div style={{ width: '36px', height: '20px', backgroundColor: '#22c55e', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#475569', fontWeight: '500' }}>Published in English</span>
              <div style={{ width: '36px', height: '20px', backgroundColor: '#22c55e', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
