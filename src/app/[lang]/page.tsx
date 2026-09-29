import React from 'react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { constructMetadata } from '@/lib/metadata';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { BlogPreview } from '@/components/home/BlogPreview';
import { CTASection } from '@/components/home/CTASection';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return constructMetadata({
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    locale: lang,
  });
}

import { prisma } from '@/lib/prisma';
import VideoTestimonials from '@/components/home/VideoTestimonials';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const videos = await prisma.videoTestimonial.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  return (
    <>
      <Navbar dict={dict} locale={locale} />
      <Hero dict={dict} locale={locale} />
      <ServicesPreview dict={dict} locale={locale} />
      <PortfolioPreview dict={dict} locale={locale} />
      <Testimonials dict={dict} locale={locale} />
      <VideoTestimonials testimonials={videos} isId={locale === 'id'} />
      <BlogPreview dict={dict} locale={locale} />
      <CTASection dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </>
  );
}
