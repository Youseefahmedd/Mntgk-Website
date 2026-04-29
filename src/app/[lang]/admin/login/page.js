'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../admin.module.css';

export default function AdminLogin({ params }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const paramsHook = useParams();
  const lang = paramsHook?.lang || 'en';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const resolvedParams = await params;
        router.push(`/${resolvedParams.lang}/admin`);
        router.refresh();
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginLogo}>
          <span className={styles.sidebarLogoMark}>H</span>
          {lang === 'ar' ? 'حضورك' : 'Hudoorak'}
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="admin-password"
          />
          {error && <p className={styles.loginError}>{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading} id="admin-login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
