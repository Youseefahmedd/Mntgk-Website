'use client';

import Link from 'next/link';
import { Zap, Clock, Shield, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from '@/app/[lang]/pages.module.css';

const iconMap = {
  zap: Zap,
  clock: Clock,
  shield: Shield,
  trendingUp: TrendingUp,
};

export default function AboutPageContent({ dict, lang }) {
  useScrollReveal();

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="section-tag">{dict.about.sectionTag}</span>
          <h1 className={styles.pageTitle}>{dict.about.title}</h1>
        </div>
      </section>

      <section className={styles.aboutContent}>
        <div className="container">
          <div className={`${styles.storySection} reveal`}>
            <div className={styles.storyText}>
              <p>{dict.about.story}</p>
              <p>{dict.about.storyP2}</p>
            </div>
            <div className={styles.missionVision}>
              <div className={styles.mvCard}>
                <div className={styles.mvLabel}>{dict.about.mission}</div>
                <p className={styles.mvText}>{dict.about.missionText}</p>
              </div>
              <div className={styles.mvCard}>
                <div className={styles.mvLabel}>{dict.about.vision}</div>
                <p className={styles.mvText}>{dict.about.visionText}</p>
              </div>
            </div>
          </div>

          <div className={`${styles.valuesGrid} stagger-children`}>
            {dict.about.values.map((value, i) => {
              const Icon = iconMap[value.icon] || Zap;
              return (
                <div className={styles.valueCard} key={i}>
                  <div className={styles.valueIcon}>
                    <Icon size={26} />
                  </div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDesc}>{value.description}</p>
                </div>
              );
            })}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link href={`/${lang}/contact`} className="btn btn-primary btn-lg">
              {dict.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
