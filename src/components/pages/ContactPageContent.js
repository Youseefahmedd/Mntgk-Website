'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MessageCircle, Clock } from 'lucide-react';
import styles from '@/app/[lang]/pages.module.css';

export default function ContactPageContent({ dict, lang }) {
  useScrollReveal();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service_type: '', message: ''
  });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service_type: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setSending(false);
  };

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="section-tag">{dict.contact.sectionTag}</span>
          <h1 className={styles.pageTitle}>{dict.contact.title}</h1>
          <p className={styles.pageSubtitle}>{dict.contact.subtitle}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className={styles.contactGrid}>
            <form className={`${styles.contactForm} reveal`} onSubmit={handleSubmit} id="contact-form">
              <div className={styles.formGroup}>
                <label htmlFor="name">{dict.contact.form.name}</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">{dict.contact.form.email}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">{dict.contact.form.phone}</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="service_type">{dict.contact.form.service}</label>
                <select id="service_type" name="service_type" value={formData.service_type} onChange={handleChange}>
                  <option value="">--</option>
                  {dict.contact.form.serviceOptions.map((opt, i) => (
                    <option value={opt} key={i}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">{dict.contact.form.message}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}></textarea>
              </div>

              {status === 'success' && (
                <div className={`${styles.formMessage} ${styles.formSuccess}`}>
                  {dict.contact.form.success}
                </div>
              )}
              {status === 'error' && (
                <div className={`${styles.formMessage} ${styles.formError}`}>
                  {dict.contact.form.error}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-lg" disabled={sending} id="contact-submit">
                {sending ? dict.contact.form.sending : dict.contact.form.submit}
              </button>
            </form>

            <div className={`${styles.contactInfo} reveal`}>
              <a href="https://wa.me/966535355628" target="_blank" rel="noopener noreferrer" className={styles.contactInfoCard}>
                <div className={styles.contactInfoIcon}>
                  <MessageCircle size={24} />
                </div>
                <div>
                  <div className={styles.contactInfoLabel}>{dict.contact.info.whatsapp}</div>
                  <div className={styles.contactInfoValue}>{dict.contact.info.whatsappNumber}</div>
                </div>
              </a>


              <div className={styles.responseTime}>
                <Clock size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                {dict.contact.info.response}
              </div>

              <div className={styles.mapSection}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463877.2984823498!2d46.54263!3d24.7253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh!5e0!3m2!1sen!2ssa!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
