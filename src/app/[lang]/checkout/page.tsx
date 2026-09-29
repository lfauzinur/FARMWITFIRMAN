import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import CheckoutClient from '@/components/cart/CheckoutClient';

export default async function CheckoutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar dict={dict} locale={locale} />
      <div style={{ paddingTop: '80px' }}>
        <CheckoutClient lang={lang} />
      </div>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
