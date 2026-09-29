'use client';

import React, { useState } from 'react';
import styles from './contact-form.module.css';

interface ContactFormProps {
  dict: any;
}

export const ContactForm: React.FC<ContactFormProps> = ({ dict }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name" className={styles.label}>{dict.contact.nameLabel}</label>
          <input id="contact-name" type="text" placeholder={dict.contact.namePlaceholder} className={styles.input} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email" className={styles.label}>{dict.contact.emailLabel}</label>
          <input id="contact-email" type="email" placeholder={dict.contact.emailPlaceholder} className={styles.input} required />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-phone" className={styles.label}>{dict.contact.phoneLabel}</label>
          <input id="contact-phone" type="tel" placeholder={dict.contact.phonePlaceholder} className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-subject" className={styles.label}>{dict.contact.subjectLabel}</label>
          <select id="contact-subject" className={styles.input} required>
            <option value="" disabled selected>{dict.contact.subjectPlaceholder}</option>
            {dict.contact.subjects.map((subject: string) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>{dict.contact.messageLabel}</label>
        <textarea id="contact-message" rows={5} placeholder={dict.contact.messagePlaceholder} className={styles.textarea} required></textarea>
      </div>
      <button type="submit" className={styles.submitBtn} disabled={submitted}>
        {submitted ? '✓ Sent!' : dict.contact.submit}
      </button>
    </form>
  );
};
