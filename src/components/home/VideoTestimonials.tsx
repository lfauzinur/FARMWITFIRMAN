'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface VideoTestimonial {
  id: string;
  platform: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  category: string | null;
  titleId: string;
  titleEn: string;
}

interface VideoTestimonialsProps {
  testimonials: VideoTestimonial[];
  isId: boolean;
}

// Helper to convert standard URLs to embed URLs
function getEmbedUrl(platform: string, url: string) {
  if (platform === 'YOUTUBE') {
    // Extract video ID from youtube.com/watch?v=ID or youtu.be/ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
  } else if (platform === 'TIKTOK') {
    // Extract video ID from tiktok.com/@user/video/ID
    const regExp = /video\/(\d+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://www.tiktok.com/embed/v2/${match[1]}`;
    }
  }
  // Fallback if not parsable or different platform
  return url;
}

export default function VideoTestimonials({ testimonials, isId }: VideoTestimonialsProps) {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  useEffect(() => {
    if (activeVideo?.platform === 'TIKTOK') {
      const existingScript = document.getElementById('tiktok-embed-script');
      if (existingScript) existingScript.remove();
      
      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [activeVideo]);

  if (!testimonials || testimonials.length === 0) return null;


  return (
    <section style={{ padding: 'var(--space-section) 0', backgroundColor: 'var(--color-bg)' }}>
      <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', gap: '2rem' }}>
          <div style={{ maxWidth: '600px' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '0.25rem 0.75rem', 
              backgroundColor: 'var(--color-bg-alt)', 
              color: 'var(--color-text-secondary)',
              borderRadius: '2rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem'
            }}>
              {isId ? 'Cuplikan Lapangan' : 'Field Footage'}
            </span>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', lineHeight: 1.2 }}>
              {isId ? 'Cek Sendiri Hasilnya di Kebun Anggota Kami.' : 'See the Results in Our Members\' Farms.'}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', maxWidth: '400px', textAlign: 'right' }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {isId 
                ? 'Kanal TikTok dan YouTube kami sehari-hari merekam apa yang terjadi di kebun anggota. Tonton dulu sebelum memutuskan ikut.' 
                : 'Our TikTok and YouTube channels record what happens daily in our members\' farms. Watch before you decide.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="#" style={{ 
                display: 'flex', alignItems: 'center', gap: '0.5rem', 
                padding: '0.5rem 1rem', border: '1px solid var(--color-border)', 
                borderRadius: '2rem', textDecoration: 'none', color: 'var(--color-text)',
                fontWeight: '500', fontSize: 'var(--font-size-sm)'
              }}>
                TikTok
              </Link>
              <Link href="#" style={{ 
                display: 'flex', alignItems: 'center', gap: '0.5rem', 
                padding: '0.5rem 1rem', border: '1px solid var(--color-border)', 
                borderRadius: '2rem', textDecoration: 'none', color: 'var(--color-text)',
                fontWeight: '500', fontSize: 'var(--font-size-sm)'
              }}>
                YouTube
              </Link>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {testimonials.map((video) => (
            <button 
              key={video.id} 
              onClick={() => setActiveVideo(video)}
              style={{ 
                display: 'block',
                position: 'relative', 
                height: '450px', 
                borderRadius: '1rem', 
                overflow: 'hidden',
                textDecoration: 'none',
                backgroundColor: 'var(--color-neutral-800)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%'
              }}
              className="video-card"
            >
              {/* Background Thumbnail */}
              <div style={{ 
                position: 'absolute', inset: 0, 
                backgroundImage: `url(${video.thumbnailUrl || '/images/placeholder-video.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.8,
                transition: 'opacity 0.3s ease'
              }} />

              {/* Gradient Overlay for Text Legibility */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)'
              }} />

              {/* Badge */}
              <div style={{ 
                position: 'absolute', top: '1rem', left: '1rem', 
                backgroundColor: 'rgba(255,255,255,0.9)', 
                color: 'var(--color-neutral-900)', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '2rem', 
                fontSize: '0.75rem', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                {video.platform}
              </div>

              {/* Play Button */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '60px', height: '60px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease'
              }}>
                <div style={{ 
                  width: 0, height: 0, 
                  borderTop: '10px solid transparent', 
                  borderBottom: '10px solid transparent', 
                  borderLeft: '16px solid var(--color-primary)',
                  marginLeft: '4px'
                }} />
              </div>

              {/* Content */}
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                {video.category && (
                  <span style={{ 
                    color: 'var(--color-primary-light)', 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    {video.category}
                  </span>
                )}
                <h3 style={{ 
                  color: 'white', 
                  fontSize: '1.125rem', 
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1.3,
                  margin: 0
                }}>
                  {isId ? video.titleId : video.titleEn}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* Modal Popup */}
        {activeVideo && (
          <div 
            style={{
              position: 'fixed', inset: 0, zIndex: 9999, 
              backgroundColor: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setActiveVideo(null)}
          >
            <div 
              style={{
                position: 'relative', width: '100%', maxWidth: '800px',
                aspectRatio: activeVideo.platform === 'YOUTUBE' ? '16/9' : '9/16',
                maxHeight: '90vh',
                backgroundColor: activeVideo.platform === 'YOUTUBE' ? 'black' : 'white',
                borderRadius: '0.5rem', overflow: 'hidden',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside video
            >
              <button 
                onClick={() => setActiveVideo(null)}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
                  background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none',
                  width: '40px', height: '40px', borderRadius: '50%',
                  fontSize: '1.5rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                &times;
              </button>
              
              {activeVideo.platform === 'YOUTUBE' ? (
                <iframe 
                  src={getEmbedUrl(activeVideo.platform, activeVideo.videoUrl)}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : activeVideo.platform === 'TIKTOK' ? (
                <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                  <blockquote 
                    className="tiktok-embed" 
                    cite={activeVideo.videoUrl} 
                    data-video-id={activeVideo.videoUrl.match(/video\/(\d+)/)?.[1] || ""}
                    style={{ maxWidth: '605px', minWidth: '325px', margin: '0 auto', height: '100%' }}
                  >
                    <section></section>
                  </blockquote>
                </div>
              ) : (
                <iframe 
                  src={getEmbedUrl(activeVideo.platform, activeVideo.videoUrl)}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allowFullScreen
                />
              )}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}
