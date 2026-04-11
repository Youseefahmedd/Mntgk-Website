'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink } from 'lucide-react';
import styles from '@/app/[lang]/pages.module.css';

const defaultProjects = [
  {
    title_en: "Al Safwa Restaurant",
    title_ar: "مطعم الصفوة",
    description_en: "A modern restaurant website with online menu, reservation system, and Google Maps integration.",
    description_ar: "موقع مطعم عصري مع قائمة طعام إلكترونية ونظام حجز وتكامل مع خرائط قوقل.",
    category: "restaurant",
    image_url: null
  },
  {
    title_en: "Glamour Beauty Salon",
    title_ar: "صالون جلامور للتجميل",
    description_en: "Elegant salon website showcasing services, gallery, and WhatsApp booking integration.",
    description_ar: "موقع صالون أنيق يعرض الخدمات والمعرض وتكامل الحجز عبر واتساب.",
    category: "salon",
    image_url: null
  },
  {
    title_en: "Urban Style Store",
    title_ar: "متجر أوربان ستايل",
    description_en: "Retail store with product catalog, location map, and contact integration.",
    description_ar: "متجر تجزئة مع كتالوج منتجات وخريطة موقع وتكامل التواصل.",
    category: "retail",
    image_url: null
  },
  {
    title_en: "ProFix Maintenance",
    title_ar: "بروفكس للصيانة",
    description_en: "Service provider website with booking system, service areas, and testimonials.",
    description_ar: "موقع مزود خدمات مع نظام حجز ومناطق خدمة وشهادات العملاء.",
    category: "services",
    image_url: null
  },
  {
    title_en: "Bait Al-Chai Cafe",
    title_ar: "مقهى بيت الشاي",
    description_en: "Cozy cafe website with menu showcase, atmosphere gallery, and location pins.",
    description_ar: "موقع مقهى مريح مع عرض القائمة ومعرض الأجواء ومواقع الفروع.",
    category: "restaurant",
    image_url: null
  },
  {
    title_en: "TechConnect Solutions",
    title_ar: "تك كونكت للحلول",
    description_en: "IT services company website with service breakdown, portfolio, and lead generation.",
    description_ar: "موقع شركة خدمات تقنية مع تفصيل الخدمات ومعرض الأعمال وتوليد العملاء.",
    category: "services",
    image_url: null
  }
];

const categoryEmojis = {
  restaurant: "🍽️",
  salon: "💇",
  retail: "🛍️",
  services: "🔧"
};

export default function PortfolioPageContent({ dict, lang, projects }) {
  useScrollReveal();
  const [filter, setFilter] = useState('all');
  const items = projects && projects.length > 0 ? projects : defaultProjects;

  const filtered = filter === 'all' ? items : items.filter(p => p.category === filter);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="section-tag">{dict.portfolio.sectionTag}</span>
          <h1 className={styles.pageTitle}>{dict.portfolio.title}</h1>
          <p className={styles.pageSubtitle}>{dict.portfolio.subtitle}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className={`${styles.filterBar} reveal`}>
            {Object.entries(dict.portfolio.categories).map(([key, label]) => (
              <button
                key={key}
                className={`${styles.filterBtn} ${filter === key ? styles.active : ''}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className={`${styles.projectsGrid} stagger-children`}>
            {filtered.map((project, i) => (
              <div className={styles.projectCard} key={i}>
                <div className={styles.projectImage}>
                  {project.image_url ? (
                    <img src={project.image_url} alt={lang === 'ar' ? project.title_ar : project.title_en} />
                  ) : (
                    <span>{categoryEmojis[project.category] || '🌐'}</span>
                  )}
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectCategory}>
                    {dict.portfolio.categories[project.category] || project.category}
                  </div>
                  <h3 className={styles.projectTitle}>
                    {lang === 'ar' ? project.title_ar : project.title_en}
                  </h3>
                  <p className={styles.projectDesc}>
                    {lang === 'ar' ? project.description_ar : project.description_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
