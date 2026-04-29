'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar({ dict, lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const otherLang = lang === 'en' ? 'ar' : 'en';
  const currentPath = pathname.replace(`/${lang}`, '') || '/';
  const switchUrl = `/${otherLang}${currentPath}`;

  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/portfolio`, label: dict.nav.portfolio },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
        <div className={styles.navContainer}>
          <Link href={`/${lang}`} className={styles.logoWrapper}>
            <div className={styles.logo}>
              <img src="/logo.png" alt="Hudoorak Logo" className={styles.logoImage} />
              <span>{lang === 'ar' ? 'حضورك' : 'Hudoorak'}<span className={styles.logoHighlight}>.</span></span>
            </div>
            {dict.nav.tagline && <span className={styles.logoTagline}>{dict.nav.tagline}</span>}
          </Link>

          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.navActions}>
            <div className={styles.langSwitch}>
              <Link href={lang === 'en' ? pathname : switchUrl} className={`${styles.langBtn} ${lang === 'en' ? styles.active : ''}`}>
                EN
              </Link>
              <Link href={lang === 'ar' ? pathname : switchUrl} className={`${styles.langBtn} ${lang === 'ar' ? styles.active : ''}`}>
                عربي
              </Link>
            </div>

            <div className={styles.ctaBtn}>
              <Link href={`/${lang}/contact`} className="btn btn-primary btn-sm">
                {dict.nav.getStarted}
              </Link>
            </div>

            <button
              className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.open : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navLink} onClick={() => setMobileOpen(false)}>
            {item.label}
          </Link>
        ))}
        <div className={styles.langSwitch}>
          <Link href={lang === 'en' ? pathname : switchUrl} className={`${styles.langBtn} ${lang === 'en' ? styles.active : ''}`}>
            EN
          </Link>
          <Link href={lang === 'ar' ? pathname : switchUrl} className={`${styles.langBtn} ${lang === 'ar' ? styles.active : ''}`}>
            عربي
          </Link>
        </div>
        <Link href={`/${lang}/contact`} className="btn btn-primary" onClick={() => setMobileOpen(false)}>
          {dict.nav.getStarted}
        </Link>
      </div>
    </>
  );
}
