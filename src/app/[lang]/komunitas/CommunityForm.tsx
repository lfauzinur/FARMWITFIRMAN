'use client';

import React, { useState } from 'react';
import { submitCommunityRegistration } from '@/app/actions/communityActions';
import { Users, CheckCircle, Loader2 } from 'lucide-react';
import styles from './komunitas.module.css';

export default function CommunityForm({ lang }: { lang: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const isId = lang === 'id';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    try {
      await submitCommunityRegistration(formData);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan, silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIcon}>
          <CheckCircle size={48} color="#10b981" />
        </div>
        <h2 className={styles.successTitle}>
          {isId ? 'Pendaftaran Berhasil!' : 'Registration Successful!'}
        </h2>
        <p className={styles.successDesc}>
          {isId
            ? 'Terima kasih telah mendaftar ke komunitas FARMWITFIRMAN. Tim kami akan segera menghubungi Anda melalui WhatsApp atau telepon.'
            : 'Thank you for joining the FARMWITFIRMAN community. Our team will contact you shortly via WhatsApp or phone.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorBanner}>{error}</div>}

      {/* Nama Lengkap */}
      <div className={styles.field}>
        <label className={styles.label}>
          {isId ? 'Nama Lengkap' : 'Full Name'} <span className={styles.req}>*</span>
        </label>
        <input
          name="fullName"
          required
          placeholder={isId ? 'Masukkan nama lengkap Anda' : 'Enter your full name'}
          className={styles.input}
        />
      </div>

      {/* No HP */}
      <div className={styles.field}>
        <label className={styles.label}>
          {isId ? 'No. HP / WhatsApp' : 'Phone / WhatsApp'} <span className={styles.req}>*</span>
        </label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="+62 812 3456 7890"
          className={styles.input}
        />
      </div>

      {/* Alamat Lengkap */}
      <div className={styles.field}>
        <label className={styles.label}>
          {isId ? 'Alamat Lengkap' : 'Full Address'} <span className={styles.req}>*</span>
        </label>
        <textarea
          name="address"
          required
          rows={3}
          placeholder={isId ? 'Desa/Kelurahan, Kecamatan, Kabupaten/Kota, Provinsi' : 'Village, District, City, Province'}
          className={styles.textarea}
        />
      </div>

      {/* Komoditi */}
      <div className={styles.field}>
        <label className={styles.label}>
          {isId ? 'Komoditi yang Ditanam' : 'Commodity Grown'} <span className={styles.req}>*</span>
        </label>
        <input
          name="commodity"
          required
          placeholder={isId ? 'Contoh: Padi, Jagung, Kedelai, Sayuran...' : 'e.g. Rice, Corn, Soybean, Vegetables...'}
          className={styles.input}
        />
      </div>

      {/* Rata-rata Hasil Panen */}
      <div className={styles.field}>
        <label className={styles.label}>
          {isId ? 'Rata-rata Hasil Panen per Musim Tanam' : 'Average Harvest per Season'} <span className={styles.req}>*</span>
        </label>
        <div className={styles.inputGroup}>
          <input
            name="avgHarvestPerSeason"
            type="number"
            step="0.1"
            min="0"
            required
            placeholder="0"
            className={styles.inputGroupInput}
          />
          <select name="harvestUnit" className={styles.inputGroupSelect}>
            <option value="Ton">Ton</option>
            <option value="Kuintal">Kuintal</option>
          </select>
        </div>
      </div>

      {/* Sistem Pemasaran */}
      <div className={styles.field}>
        <label className={styles.label}>
          {isId ? 'Sistem Pemasaran Hasil Panen' : 'Marketing System'} <span className={styles.req}>*</span>
        </label>
        <p className={styles.helperText}>
          {isId ? 'Pilih yang sesuai (bisa lebih dari satu)' : 'Select all that apply'}
        </p>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="tengkulak" className={styles.checkbox} />
            <span>Tengkulak</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="pasar_tradisional" className={styles.checkbox} />
            <span>{isId ? 'Pasar Tradisional' : 'Traditional Market'}</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="koperasi_kud" className={styles.checkbox} />
            <span>Koperasi / KUD</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="dikonsumsi_sendiri" className={styles.checkbox} />
            <span>{isId ? 'Dikonsumsi Sendiri' : 'Self Consumption'}</span>
          </label>
        </div>
      </div>

      {/* Total Luas Lahan */}
      <div className={styles.field}>
        <label className={styles.label}>
          {isId ? 'Total Luas Lahan Keseluruhan' : 'Total Land Area'} <span className={styles.req}>*</span>
        </label>
        <div className={styles.inputGroup}>
          <input
            name="totalLandArea"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="0"
            className={styles.inputGroupInput}
          />
          <select name="landUnit" className={styles.inputGroupSelect}>
            <option value="Ha">Ha</option>
            <option value="m²">m²</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 size={18} className={styles.spinner} />
            {isId ? 'Mengirim...' : 'Submitting...'}
          </>
        ) : (
          <>
            <Users size={18} />
            {isId ? 'Daftar Sekarang' : 'Register Now'}
          </>
        )}
      </button>
    </form>
  );
}
