'use client';

import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { ScrollReveal } from '../ui/ScrollReveal';
import styles from './Testimonials.module.css';
import { Locale } from '@/i18n/config';
import testimonialData from '@/data/testimonials.json';

interface TestimonialsProps {
  dict: any;
  locale: Locale;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ dict, locale }) => {
  const [active, setActive] = useState(0);

  return (
    <section className="section section--alt">
      <div className="container">
        <ScrollReveal>
          <SectionHeader
            label={dict.testimonials.sectionLabel}
            title={dict.testimonials.title}
            subtitle={dict.testimonials.subtitle}
          />
        </ScrollReveal>

        <div className={styles.wrapper}>
          <ScrollReveal direction="up">
            <div className={styles.card}>
              <div className={styles.quoteIcon}>&ldquo;</div>
              <p className={styles.quote}>
                {testimonialData[active].quote[locale] || testimonialData[active].quote.id}
              </p>
              <div className={styles.stars}>
                {Array.from({ length: testimonialData[active].rating }).map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonialData[active].name.charAt(0)}
                </div>
                <div>
                  <p className={styles.name}>{testimonialData[active].name}</p>
                  <p className={styles.role}>
                    {testimonialData[active].role[locale] || testimonialData[active].role.id}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className={styles.dots}>
            {testimonialData.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === active ? styles.dotActive : ''}`}
                onClick={() => setActive(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
