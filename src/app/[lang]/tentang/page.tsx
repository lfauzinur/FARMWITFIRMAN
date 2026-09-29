import React from 'react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { constructMetadata } from '@/lib/metadata';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTASection } from '@/components/home/CTASection';
import teamData from '@/data/team.json';
import { prisma } from '@/lib/prisma';
import styles from './about.module.css';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return constructMetadata({ title: dict.about.title, description: dict.about.subtitle, locale: lang });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const isId = locale === 'id';
  const dict = await getDictionary(locale);

  // Fetch dynamic profile from DB
  const companyProfile = await prisma.companyProfile.findFirst();
  const dbTeam = await prisma.teamMember.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });

  // Dynamic OR Fallback to Dictionary
  const storyTitle = companyProfile ? (isId ? companyProfile.storyTitleId : companyProfile.storyTitleEn) : dict.about.storyTitle;
  const storyP1 = companyProfile ? (isId ? companyProfile.storyP1Id : companyProfile.storyP1En) : dict.about.storyP1;
  const storyP2 = companyProfile ? (isId ? companyProfile.storyP2Id : companyProfile.storyP2En) : dict.about.storyP2;
  const visionTitle = companyProfile ? (isId ? companyProfile.visionId : companyProfile.visionEn) : dict.about.visionTitle;
  // Note: We use dict for the hardcoded 'visionText' if no companyProfile has description, but we didn't add visionText to DB. Wait, the DB has visionId and visionEn. Let's use that as text, or title?
  // Our schema has visionId (text). The original uses visionTitle and visionText.
  // I will use dict.about.visionTitle for title, and companyProfile.visionId for text.
  const visionText = companyProfile ? (isId ? companyProfile.visionId : companyProfile.visionEn) : dict.about.visionText;
  
  const mission1 = companyProfile ? (isId ? companyProfile.mission1Id : companyProfile.mission1En) : dict.about.mission1;
  const mission2 = companyProfile ? (isId ? companyProfile.mission2Id : companyProfile.mission2En) : dict.about.mission2;
  const mission3 = companyProfile ? (isId ? companyProfile.mission3Id : companyProfile.mission3En) : dict.about.mission3;
  const mission4 = companyProfile ? (isId ? companyProfile.mission4Id : companyProfile.mission4En) : dict.about.mission4;

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <ScrollReveal>
            <span className={styles.label}>{dict.about.sectionLabel}</span>
            <h1 className={styles.pageTitle}>{dict.about.title}</h1>
            <p className={styles.pageSubtitle}>{dict.about.subtitle}</p>
          </ScrollReveal>
        </div>
        <div className={styles.headerDecor}></div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <ScrollReveal direction="left">
              <div className={styles.storyImage}>
                <div className={styles.storyImagePlaceholder}>
                  <span>🌱</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className={styles.storyContent}>
                <h2 className={styles.storyTitle}>{storyTitle}</h2>
                <p className={styles.storyText}>{storyP1}</p>
                <p className={styles.storyText}>{storyP2}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section section--alt">
        <div className="container">
          <div className={styles.vmGrid}>
            <ScrollReveal direction="left">
              <div className={styles.vmCard}>
                <div className={styles.vmIcon}>🎯</div>
                <h3 className={styles.vmTitle}>{dict.about.visionTitle}</h3>
                <p className={styles.vmText}>{visionText}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className={styles.vmCard}>
                <div className={styles.vmIcon}>🚀</div>
                <h3 className={styles.vmTitle}>{dict.about.missionTitle}</h3>
                <ul className={styles.missionList}>
                  <li>{mission1}</li>
                  <li>{mission2}</li>
                  <li>{mission3}</li>
                  <li>{mission4}</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              label={dict.about.teamTitle}
              title={dict.about.teamTitle}
              subtitle={dict.about.teamSubtitle}
            />
          </ScrollReveal>
          <div className={styles.teamGrid}>
            {dbTeam.map((member, index) => (
              <ScrollReveal key={member.id} direction="up">
                <div className={styles.teamCard} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={styles.teamAvatar}>
                    {member.name.charAt(0)}
                  </div>
                  <h4 className={styles.teamName}>{member.name}</h4>
                  <p className={styles.teamRole}>{isId ? member.roleId : member.roleEn}</p>
                  <p className={styles.teamBio}>{isId ? member.bioId : member.bioEn}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </>
  );
}
