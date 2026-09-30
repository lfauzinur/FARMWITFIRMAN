import React from 'react';
import CommunityForm from './CommunityForm';
import styles from './komunitas.module.css';

export default async function KomunitasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isId = lang === 'id';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isId ? 'Gabung Komunitas FARMWITFIRMAN' : 'Join FARMWITFIRMAN Community'}
        </h1>
        <p className={styles.subtitle}>
          {isId 
            ? 'Mari bersama-sama memajukan pertanian Indonesia. Daftarkan diri Anda untuk mendapatkan pendampingan, akses pasar, dan teknologi pertanian modern.'
            : 'Let\'s advance Indonesian agriculture together. Register to get mentoring, market access, and modern agricultural technology.'}
        </p>
      </div>

      <div className={styles.formCard}>
        <CommunityForm lang={lang} />
      </div>
    </div>
  );
}
