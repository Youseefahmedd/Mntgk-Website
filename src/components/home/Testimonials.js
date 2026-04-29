'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Testimonials.module.css';

const defaultReviews = [
  {
    content_en: "Hudoorak transformed our restaurant's online presence. We went from invisible to getting new customers every day through Google. Highly recommended!",
    content_ar: "حضورك حوّل حضور مطعمنا على الإنترنت. انتقلنا من الظل إلى استقبال عملاء جدد كل يوم عبر قوقل. أنصح بهم بشدة!",
    client_name: "Ahmed Al-Rashid",
    client_role_en: "Restaurant Owner",
    client_role_ar: "صاحب مطعم",
    rating: 5
  },
  {
    content_en: "I was worried about the cost and complexity, but Hudoorak made everything simple. My salon website was ready in just 5 days!",
    content_ar: "كنت قلقة من التكلفة والتعقيد، لكن حضورك جعل كل شيء بسيطاً. موقع صالوني كان جاهزاً في 5 أيام فقط!",
    client_name: "Sara Mohammed",
    client_role_en: "Salon Owner",
    client_role_ar: "صاحبة صالون",
    rating: 5
  },
  {
    content_en: "Professional, fast, and affordable. They didn't just build a website — they helped us build a real digital brand. Our sales increased by 40%!",
    content_ar: "احترافيون وسريعون وبأسعار مناسبة. لم يبنوا موقعاً فقط — ساعدونا في بناء علامة رقمية حقيقية. مبيعاتنا زادت 40%!",
    client_name: "Khalid Nasser",
    client_role_en: "Retail Store Owner",
    client_role_ar: "صاحب متجر",
    rating: 5
  }
];

export default function Testimonials({ dict, lang, reviews }) {
  const [current, setCurrent] = useState(0);
  const items = reviews && reviews.length > 0 ? reviews : defaultReviews;
  const total = items.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{dict.testimonials.sectionTag}</span>
          <h2 className="section-title">{dict.testimonials.title}</h2>
          <p className="section-subtitle">{dict.testimonials.subtitle}</p>
        </div>

        <div className={`${styles.carousel} reveal`}>
          <div className={styles.track} style={{ transform: `translateX(${lang === 'ar' ? current * 100 : -current * 100}%)` }}>
            {items.map((review, i) => (
              <div className={styles.slide} key={i}>
                <div className={styles.card}>
                  <span className={styles.quote}>&ldquo;</span>
                  <div className={styles.stars}>
                    {[...Array(review.rating || 5)].map((_, j) => (
                      <span key={j} className={styles.star}>★</span>
                    ))}
                  </div>
                  <p className={styles.content}>
                    {lang === 'ar' ? (review.content_ar || review.content_en) : (review.content_en || review.content_ar)}
                  </p>
                  <div className={styles.author}>
                    <span className={styles.authorName}>{review.client_name}</span>
                    <span className={styles.authorRole}>
                      {lang === 'ar' ? (review.client_role_ar || review.client_role) : (review.client_role_en || review.client_role)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            <button className={styles.navBtn} onClick={prev} aria-label="Previous review">
              {lang === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <div className={styles.dots}>
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.active : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button className={styles.navBtn} onClick={next} aria-label="Next review">
              {lang === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
