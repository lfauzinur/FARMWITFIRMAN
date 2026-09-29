import type { Metadata } from 'next';

type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  locale?: string;
};

export function constructMetadata({
  title,
  description,
  image = '/images/hero-banner.png',
  locale = 'id',
}: MetaProps = {}): Metadata {
  const baseTitle = 'FARMWITFIRMAN';
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  
  return {
    title: fullTitle,
    description: description || 'Solusi pertanian modern untuk masa depan.',
    openGraph: {
      title: fullTitle,
      description: description || 'Solusi pertanian modern untuk masa depan.',
      url: `https://farmwitfirman.id/${locale}`,
      siteName: baseTitle,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || 'Solusi pertanian modern untuk masa depan.',
      images: [image],
      creator: '@farmwitfirman',
    },
    alternates: {
      canonical: `https://farmwitfirman.id/${locale}`,
      languages: {
        'id': 'https://farmwitfirman.id/id',
        'en': 'https://farmwitfirman.id/en',
      },
    },
  };
}
