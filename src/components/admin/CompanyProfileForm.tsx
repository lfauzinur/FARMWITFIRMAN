'use client';

import React, { useTransition } from 'react';
import { updateCompanyProfile } from '@/app/actions/aboutActions';
import { Save } from 'lucide-react';

export default function CompanyProfileForm({ profile }: { profile: any }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateCompanyProfile(formData);
      alert('Profil perusahaan berhasil disimpan!');
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <input type="hidden" name="id" value={profile.id} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Indonesian Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ borderBottom: '2px solid #10b981', paddingBottom: '0.5rem' }}>Konten Indonesia</h3>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Judul Kisah (ID)</label>
            <input type="text" name="storyTitleId" defaultValue={profile.storyTitleId} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Kisah Paragraf 1 (ID)</label>
            <textarea name="storyP1Id" defaultValue={profile.storyP1Id} rows={4} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Kisah Paragraf 2 (ID)</label>
            <textarea name="storyP2Id" defaultValue={profile.storyP2Id} rows={4} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Visi (ID)</label>
            <textarea name="visionId" defaultValue={profile.visionId} rows={3} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
          </div>

          {[1, 2, 3, 4].map(num => (
            <div key={`m-id-${num}`}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Misi {num} (ID)</label>
              <input type="text" name={`mission${num}Id`} defaultValue={profile[`mission${num}Id`]} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
            </div>
          ))}
        </div>

        {/* English Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '0.5rem' }}>English Content</h3>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Story Title (EN)</label>
            <input type="text" name="storyTitleEn" defaultValue={profile.storyTitleEn} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Story Paragraph 1 (EN)</label>
            <textarea name="storyP1En" defaultValue={profile.storyP1En} rows={4} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Story Paragraph 2 (EN)</label>
            <textarea name="storyP2En" defaultValue={profile.storyP2En} rows={4} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Vision (EN)</label>
            <textarea name="visionEn" defaultValue={profile.visionEn} rows={3} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
          </div>

          {[1, 2, 3, 4].map(num => (
            <div key={`m-en-${num}`}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Mission {num} (EN)</label>
              <input type="text" name={`mission${num}En`} defaultValue={profile[`mission${num}En`]} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button type="submit" disabled={isPending} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.7 : 1 }}>
          <Save size={18} />
          {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
