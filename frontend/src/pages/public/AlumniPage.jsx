import React from 'react';
import { Link } from 'react-router-dom';

export default function AlumniPage() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link> › Alumni</div>
          <h1>Alumni</h1>
          <p>Andres A. Nocon National High School — Alumni Community</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Coming Soon Banner */}
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            background: 'linear-gradient(135deg, var(--blue-pale) 0%, #E8F5E9 100%)',
            border: '1.5px solid var(--blue-light)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 48
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎓</div>
            <h2 style={{ color: 'var(--blue-primary)', marginBottom: 12, fontSize: '1.5rem' }}>Alumni Community</h2>
            <p style={{ color: 'var(--gray-600)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              This section is coming soon. We are building a dedicated space to celebrate our graduates,
              feature notable alumni, and connect the AANNHS alumni community.
            </p>
          </div>

          {/* Placeholder sections */}
          <div className="grid-auto" style={{ gap: 24 }}>
            <div className="card card-body">
              <h3 style={{ color: 'var(--blue-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🏆</span> Notable Graduates
              </h3>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                Coming soon — profiles of distinguished AANNHS alumni who have made an impact in their communities and fields.
              </p>
            </div>
            <div className="card card-body">
              <h3 style={{ color: 'var(--blue-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🤝</span> Alumni Association
              </h3>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                Coming soon — information about the AANNHS alumni association, officers, events, and how to connect.
              </p>
            </div>
            <div className="card card-body">
              <h3 style={{ color: 'var(--blue-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>💬</span> Alumni Testimonials
              </h3>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                Coming soon — stories and testimonials from AANNHS graduates sharing how their time here shaped their journey.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ color: 'var(--gray-500)', marginBottom: 16 }}>
              Are you an AANNHS alumnus? We would love to hear from you!
            </p>
            <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
