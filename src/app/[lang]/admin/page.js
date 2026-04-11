'use client';

import { useEffect, useState } from 'react';
import { Briefcase, FolderOpen, Star, MessageSquare } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    reviews: 0,
    messages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, projectsRes, reviewsRes, messagesRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/projects'),
          fetch('/api/reviews'),
          fetch('/api/messages'),
        ]);

        const services = await servicesRes.json();
        const projects = await projectsRes.json();
        const reviews = await reviewsRes.json();
        const messages = await messagesRes.json();

        setStats({
          services: Array.isArray(services) ? services.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          reviews: Array.isArray(reviews) ? reviews.length : 0,
          messages: Array.isArray(messages) ? messages.filter(m => !m.is_read).length : 0,
        });
      } catch (error) {
        console.log('Stats fetch error (Supabase may not be connected):', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Services', value: stats.services, icon: Briefcase },
    { label: 'Total Projects', value: stats.projects, icon: FolderOpen },
    { label: 'Total Reviews', value: stats.reviews, icon: Star },
    { label: 'Unread Messages', value: stats.messages, icon: MessageSquare },
  ];

  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Dashboard</h1>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div className={styles.statCard} key={i}>
              <div className={styles.statIcon}>
                <Icon size={22} />
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
