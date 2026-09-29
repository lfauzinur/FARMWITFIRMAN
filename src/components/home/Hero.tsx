import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { ScrollReveal } from '../ui/ScrollReveal';
import styles from './Hero.module.css';

interface HeroProps {
  dict: any;
  locale: string;
}

export const Hero: React.FC<HeroProps> = ({ dict, locale }) => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Content Column */}
        <div className={styles.content}>
          <ScrollReveal direction="left">
            <Badge variant="primary">{dict.hero.badge}</Badge>
          </ScrollReveal>
          
          <ScrollReveal direction="left" className="stagger">
            <h1 className={styles.title}>
              {dict.hero.title}
            </h1>
            <p className={styles.subtitle}>
              {dict.hero.subtitle}
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="left" className="stagger">
            <div className={styles.actions}>
              <Button href={`/${locale}/produk`} size="lg">
                {dict.hero.ctaPrimary}
              </Button>
              <Button href={`/${locale}/kontak`} variant="outline" size="lg">
                {dict.hero.ctaSecondary}
              </Button>
            </div>
          </ScrollReveal>
          
          {/* Stats */}
          <ScrollReveal direction="up" className="stagger">
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <h3 className={styles.statValue}>
                  <AnimatedCounter value={dict.hero.stat1Value} />
                </h3>
                <p className={styles.statLabel}>{dict.hero.stat1Label}</p>
              </div>
              
              <div className={styles.statDivider}></div>
              
              <div className={styles.statItem}>
                <h3 className={styles.statValue}>
                  <AnimatedCounter value={dict.hero.stat2Value} />
                </h3>
                <p className={styles.statLabel}>{dict.hero.stat2Label}</p>
              </div>
              
              <div className={styles.statDivider}></div>
              
              <div className={styles.statItem}>
                <h3 className={styles.statValue}>
                  <AnimatedCounter value={dict.hero.stat3Value} />
                </h3>
                <p className={styles.statLabel}>{dict.hero.stat3Label}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Image Column */}
        <div className={styles.imageCol}>
          <ScrollReveal direction="right" className={styles.imageWrapper}>
            <div className={styles.imageBlob}>
              <Image 
                src="/images/hero-banner.png" 
                alt="Modern Agriculture Solutions"
                fill
                priority
                className={styles.image}
              />
            </div>
            
            {/* Floating Elements for dynamic feel */}
            <div className={`${styles.floatingElement} ${styles.float1}`}>
              <span className={styles.floatIcon}>🌿</span>
              <span>100% Organik</span>
            </div>
            
            <div className={`${styles.floatingElement} ${styles.float2}`}>
              <span className={styles.floatIcon}>📊</span>
              <span>Smart Farming</span>
            </div>
          </ScrollReveal>
        </div>
        
      </div>
      
      {/* Decorative background elements */}
      <div className={styles.bgBlob1}></div>
      <div className={styles.bgBlob2}></div>
    </section>
  );
};
