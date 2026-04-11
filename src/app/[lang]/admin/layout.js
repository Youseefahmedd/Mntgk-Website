'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, FolderOpen, Star, MessageSquare, LogOut } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminLayout({ children, params }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setLang(resolved.lang);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const isAuth = document.cookie.includes('admin_session=authenticated');
    if (isAuth) {
      setAuthenticated(true);
    } else if (!pathname.includes('/admin/login')) {
      router.push(`/${lang}/admin/login`);
    }
    setLoading(false);
  }, [pathname, router, lang]);

  const handleLogout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' });
    document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push(`/${lang}/admin/login`);
  };

  if (loading) return null;

  if (pathname.includes('/admin/login')) {
    return <>{children}</>;
  }

  if (!authenticated) return null;

  const navItems = [
    { href: `/${lang}/admin`, label: 'Dashboard', icon: LayoutDashboard },
    { href: `/${lang}/admin/services`, label: 'Services', icon: Briefcase },
    { href: `/${lang}/admin/projects`, label: 'Projects', icon: FolderOpen },
    { href: `/${lang}/admin/reviews`, label: 'Reviews', icon: Star },
    { href: `/${lang}/admin/messages`, label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <span className={styles.sidebarLogoMark}>M</span>
            <div>
              <div>mntgk</div>
              <div className={styles.sidebarLabel}>Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.sidebarLink} ${isActive ? styles.active : ''}`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}
