'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, Smartphone, Search, MapPin, Server, Headphones, Plus } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from '@/app/[lang]/pages.module.css';

const iconMap = {
  globe: Globe,
  smartphone: Smartphone,
  search: Search,
  mapPin: MapPin,
  server: Server,
  headphones: Headphones,
};

export default function ServicesPageContent({ dict, lang }) {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="section-tag">{dict.services.sectionTag}</span>
          <h1 className={styles.pageTitle}>{dict.services.title}</h1>
          <p className={styles.pageSubtitle}>{dict.services.subtitle}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className={`${styles.servicesGrid} stagger-children`}>
            {dict.services.items.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <div className={styles.serviceFullCard} key={i}>
                  <div className={styles.serviceIcon}>
                    <Icon size={30} />
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className={`${styles.quoteCta} reveal`}>
            <h2 className={styles.quoteTitle}>{dict.services.requestQuote}</h2>
            <p className={styles.quoteDesc}>{dict.services.requestQuoteDesc}</p>
            <Link href={`/${lang}/contact`} className="btn btn-primary btn-lg">
              {dict.services.requestQuote}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{dict.faq.sectionTag}</span>
            <h2 className="section-title">{dict.faq.title}</h2>
          </div>

          <div className={styles.faqList}>
            {dict.faq.items.map((item, i) => (
              <div
                className={`${styles.faqItem} ${openFaq === i ? styles.open : ''}`}
                key={i}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.question}</span>
                  <Plus className={styles.faqIcon} size={20} />
                </button>
                <div className={styles.faqAnswer}>
                  <p className={styles.faqAnswerInner}>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
