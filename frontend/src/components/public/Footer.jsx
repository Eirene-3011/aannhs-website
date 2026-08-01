import React from 'react';
import { Link } from 'react-router-dom';
import { useSchoolInfo } from '../../hooks/useSchoolInfo';
import { getImageUrl } from '../../utils/helpers';
import './Footer.css';

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path d="M20.01 15.38c-1.23 0-2.42-.18-3.53-.56-.35-.12-.74-.03-1.01.24l-2.17 2.17c-2.83-1.44-5.15-3.75-6.59-6.59l2.17-2.17c.27-.27.36-.66.24-1.01-.38-1.11-.56-2.3-.56-3.53 0-.55-.45-1-1-1H3.5c-.55 0-1 .45-1 1C2.5 13.91 10.09 21.5 19.5 21.5c.55 0 1-.45 1-1v-4.01c0-.55-.45-1-1-1z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.73 9-4.72 9-9.95z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
);

export default function Footer() {
  const { info } = useSchoolInfo();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand column */}
          <div className="footer-brand-col">
            <img src={getImageUrl(info?.logo_url) ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Department_of_Education_%28DepEd%29_of_the_Philippines.svg/200px-Department_of_Education_%28DepEd%29_of_the_Philippines.svg.png'}
              alt="AANNHS Logo" className="footer-logo"
              onError={e => { e.target.style.display = 'none'; }} />
            <p className="footer-school-name">{info?.school_name || 'Andres A. Nocon National High School'}</p>
            <p className="footer-motto">"{info?.motto || 'Raising Character, Reaching Excellence'}"</p>
            <div className="social-links">
              {info?.facebook_url && (
                <a href={info.facebook_url} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                  <FacebookIcon /> Facebook
                </a>
              )}
              {info?.youtube_url && (
                <a href={info.youtube_url} target="_blank" rel="noopener noreferrer" className="social-btn youtube" aria-label="YouTube">
                  <YouTubeIcon /> YouTube
                </a>
              )}
            </div>
          </div>

          {/* Combined Contact & DepEd column */}
          <div className="footer-info-col">
            <div className="footer-info-grid">
              <div className="footer-contact-section">
                <h4>Contact Information</h4>
                <ul className="contact-list">
                  <li><LocationIcon /> {info?.address || 'Brgy. Bagumbayan, General Trias City, Cavite'}</li>
                  <li><PhoneIcon /> {info?.landline || '(046) 472-5307'}</li>
                  <li><EmailIcon /> {info?.email || '307802@deped.gov.ph'}</li>
                  <li><ClockIcon /> {info?.office_hours || 'Mon–Fri, 8:00 AM – 5:00 PM'}</li>
                </ul>
              </div>
              <div className="footer-deped-section">
                <h4>DepEd Links</h4>
                <div className="deped-links">
                  <a href="https://www.deped.gov.ph" target="_blank" rel="noopener noreferrer">DepEd Central Office</a>
                  <a href="https://www.depedcalabarzonnews.com" target="_blank" rel="noopener noreferrer">DepEd Region IV-A</a>
                  <a href="https://www.depedgeneraltrias.com" target="_blank" rel="noopener noreferrer">DepEd Division GenTrias</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} {info?.school_name || 'Andres A. Nocon National High School'} | School ID: {info?.school_id_no || '307802'} | All Rights Reserved</p>
          <p className="footer-compliance">
            <Link to="/about/citizens-charter">Citizen's Charter</Link> |
            <Link to="/issuances">Transparency</Link> |
            <span> Under the Department of Education, Division of General Trias City</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
