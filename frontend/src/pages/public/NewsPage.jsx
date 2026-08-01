import React from 'react';
import { Link } from 'react-router-dom';

export default function NewsPage() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> › News & Updates</div>
          <h1>News &amp; Updates</h1>
          <p>Latest news, announcements, and events from Andres A. Nocon National High School</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="alert alert-info" style={{ textAlign: 'center', padding: '60px 40px', background: 'var(--blue-pale)', border: '1.5px solid var(--blue-light)', borderRadius: 'var(--radius-lg)', color: 'var(--blue-dark)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📰</div>
            <h2 style={{ color: 'var(--blue-primary)', marginBottom: 12, fontSize: '1.5rem' }}>News &amp; Updates</h2>
            <p style={{ color: 'var(--gray-600)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              This section is coming soon. School news, announcements, and event write-ups will be posted here regularly.
              Check back soon or follow our{' '}
              <a
                href="https://www.facebook.com/DepEdTayoAANNHS307802"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--blue-primary)', fontWeight: 600 }}
              >
                Facebook page
              </a>{' '}
              for the latest updates.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://www.facebook.com/DepEdTayoAANNHS307802"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visit Our Facebook Page
              </a>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
