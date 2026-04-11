'use client';

import styles from './HowItWorks.module.css';

export default function HowItWorks({ dict }) {
  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{dict.howItWorks.sectionTag}</span>
          <h2 className="section-title">{dict.howItWorks.title}</h2>
          <p className="section-subtitle">{dict.howItWorks.subtitle}</p>
        </div>

        <div className={`${styles.stepsGrid} stagger-children`}>
          {dict.howItWorks.steps.map((step, i) => (
            <div className={styles.step} key={i}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
