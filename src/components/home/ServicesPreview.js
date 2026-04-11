'use client';

import Link from 'next/link';
import { Globe, Smartphone, Search, MapPin, Server, Headphones } from 'lucide-react';
import styles from './ServicesPreview.module.css';

const iconMap = {
  globe: Globe,
  smartphone: Smartphone,
  search: Search,
  mapPin: MapPin,
  server: Server,
  headphones: Headphones,
};

export default function ServicesPreview({ dict, lang, dbServices }) {
  let services = [];
  if (dbServices && dbServices.length > 0) {
    services = dbServices.slice(0, 6).map(s => ({
      title: lang === 'ar' ? s.title_ar : s.title_en,
      description: lang === 'ar' ? s.description_ar : s.description_en,
      icon: s.icon
    }));
  } else {
    services = dict.services.items.slice(0, 6);
  }

  return (
    <section className={styles.section} id="services-preview">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{dict.services.sectionTag}</span>
          <h2 className="section-title">{dict.services.title}</h2>
          <p className="section-subtitle">{dict.services.subtitle}</p>
        </div>

        <div className={`${styles.grid} stagger-children`}>
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <div className={styles.card} key={i}>
                <div className={styles.iconWrap}>
                  <Icon size={26} />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className={`${styles.viewAllWrap} reveal`}>
          <Link href={`/${lang}/services`} className="btn btn-outline">
            {dict.services.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
