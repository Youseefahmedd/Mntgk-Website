'use client';

import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch (e) { console.log('Fetch error:', e); }
  };

  useEffect(() => { fetchData(); }, []);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Messages</h1>
        <span style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
          {messages.length} total • {messages.filter(m => !m.is_read).length} unread
        </span>
      </div>

      {messages.length === 0 ? (
        <div className={styles.noData}>No messages yet. They&apos;ll appear here when customers contact you.</div>
      ) : (
        messages.map((msg) => (
          <div className={`${styles.messageCard} ${!msg.is_read ? styles.unread : ''}`} key={msg.id}>
            <div className={styles.messageMeta}>
              <span className={styles.messageName}>{msg.name}</span>
              <span className={styles.messageDate}>{formatDate(msg.created_at)}</span>
            </div>
            {msg.service_type && (
              <div className={styles.messageService}>{msg.service_type}</div>
            )}
            <p className={styles.messageText}>{msg.message}</p>
            <div className={styles.messageContact}>
              {msg.email && <span>📧 {msg.email}</span>}
              {msg.phone && <span>📱 {msg.phone}</span>}
            </div>
          </div>
        ))
      )}
    </>
  );
}
