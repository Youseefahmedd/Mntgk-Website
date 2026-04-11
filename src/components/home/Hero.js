'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Hero.module.css';

export default function Hero({ dict, lang }) {
  useScrollReveal();

  return (
    <>
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg}>
          <div className={styles.gridPattern}></div>
          <div className={`${styles.glowOrb} ${styles.glowOrb1}`}></div>
          <div className={`${styles.glowOrb} ${styles.glowOrb2}`}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>{dict.hero.badge}</div>
            <h1 className={styles.heroTitle}>
              {dict.hero.title}{' '}
              <span className={styles.titleHighlight}>{dict.hero.titleHighlight}</span>
            </h1>
            <p className={styles.heroSubtitle}>{dict.hero.subtitle}</p>
            <div className={styles.heroCtas}>
              <Link href={`/${lang}/contact`} className="btn btn-primary btn-lg">
                {dict.hero.cta}
              </Link>
              <Link href={`/${lang}/portfolio`} className="btn btn-secondary btn-lg">
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.visualContainer}>
              <div className={`${styles.visualCard} ${styles.card1}`}>
                <div className={styles.cardIcon}>
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <div className={styles.cardLabel}>{lang === 'ar' ? 'الأمان' : 'Security'}</div>
                  <div className={styles.cardValue}>SSL {lang === 'ar' ? 'مجاني' : 'Included'}</div>
                </div>
              </div>

              <div className={`${styles.visualCard} ${styles.card2}`}>
                <div className={styles.cardIcon}>
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div className={styles.cardLabel}>{lang === 'ar' ? 'التسليم' : 'Delivery'}</div>
                  <div className={styles.cardValue}>{lang === 'ar' ? '5-7 أيام' : '5-7 Days'}</div>
                </div>
              </div>

              <div className={`${styles.visualCard} ${styles.card3}`}>
                <div className={styles.cardIcon}>
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                </div>
                <div>
                  <div className={styles.cardLabel}>{lang === 'ar' ? 'التصميم' : 'Design'}</div>
                  <div className={styles.cardValue}>{lang === 'ar' ? 'متجاوب 100%' : '100% Responsive'}</div>
                </div>
              </div>

              <div className={styles.centerOrb}>
                <div className={styles.centerOrbInner}>M</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.statsBar}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{dict.hero.stat1Number}</div>
            <div className={styles.statLabel}>{dict.hero.stat1Label}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{dict.hero.stat2Number}</div>
            <div className={styles.statLabel}>{dict.hero.stat2Label}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{dict.hero.stat3Number}</div>
            <div className={styles.statLabel}>{dict.hero.stat3Label}</div>
          </div>
        </div>
      </div>
    </>
  );
}
