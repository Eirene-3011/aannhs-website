import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSchoolInfo } from '../../hooks/useSchoolInfo';
import api from '../../utils/api';
import { getImageUrl } from '../../utils/helpers';
import './Header.css';

// ─── Icons ────────────────────────────────────────────────────────────────
const ChevronDownIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowRightIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const SparkleIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
  </svg>
);

// ─── Navigation Data ──────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us', path: '/about',
    children: [
      { label: 'School Profile', path: '/about' },
      { label: 'Organizational Structure', path: '/about/organizational-structure' },
      { label: "Citizen's Charter", path: '/about/citizens-charter' },
      { label: 'Committees & Councils', path: '/about/committees' },
    ]
  },
  {
    label: 'Admissions', path: '/admissions',
    children: [
      { label: 'Enrollment Info', path: '/admissions' },
      { label: 'Enrollment Statistics', path: '/admissions/enrollment-statistics' },
    ]
  },
  { label: 'News & Updates', path: '/news' },
  { label: 'PPAs', path: '/ppas' },
  { label: "Students' Corner", path: '/students-corner' },
  { label: 'Accomplishments', path: '/accomplishments' },
  { label: 'Alumni', path: '/alumni' },
  { label: 'Learning Resources', path: '/learning-resources' },
  {
    label: 'Issuances', path: '/issuances',
    children: [
      { label: 'DepEd Orders', path: '/issuances?type=deped_order' },
      { label: 'Procurement Postings', path: '/issuances?type=procurement' },
      { label: 'School Memos', path: '/issuances?type=memo' },
      { label: 'External Links', path: '/issuances#external' },
    ]
  },
  { label: 'Calendar', path: '/school-calendar' },
  {
    label: 'Contact Us', path: '/contact',
    children: [
      { label: 'Contact & Feedback', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
    ]
  },
];

// ─── Desktop Dropdown Item ────────────────────────────────────────────────
function DesktopDropdownItem({ child, onNavigate }) {
  return (
    <Link
      to={child.path}
      className="dd-item"
      onClick={onNavigate}
    >
      <span className="dd-item-label">{child.label}</span>
      <ArrowRightIcon className="dd-item-arrow" />
    </Link>
  );
}

// ─── Desktop Nav Item ─────────────────────────────────────────────────────
function DesktopNavItem({ item, location, onNavigate }) {
  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  const open = useCallback(() => {
    if (item.children) {
      clearTimeout(timerRef.current);
      setIsOpen(true);
    }
  }, [item.children]);

  const close = useCallback(() => {
    if (item.children) {
      timerRef.current = setTimeout(() => setIsOpen(false), 120);
    }
  }, [item.children]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div className="n-item" onMouseEnter={open} onMouseLeave={close}>
      <Link
        to={item.path}
        className={`n-link${isActive ? ' is-active' : ''}`}
        onClick={() => { if (!item.children) onNavigate(); }}
        aria-haspopup={item.children ? "true" : "false"}
        aria-expanded={item.children && isOpen ? "true" : "false"}
      >
        <span>{item.label}</span>
        {item.children && <ChevronDownIcon className="n-caret" />}
      </Link>

      {item.children && (
        <div className={`n-dropdown${isOpen ? ' is-open' : ''}`}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <div className="dd-wrap">
            <div className="dd-header">
              <span className="dd-header-label">{item.label}</span>
              <span className="dd-header-line" />
            </div>
            {item.children.map((child) => (
              <DesktopDropdownItem
                key={child.label}
                child={child}
                onNavigate={() => { setIsOpen(false); onNavigate(); }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────
export default function Header() {
  const { info } = useSchoolInfo();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({});
  const navRef = useRef(null);

  // Banner
  const [banner, setBanner] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    api.get('/banners')
      .then((r) => {
        const data = r.data || [];
        const general = data.find((b) => b.type === 'general');
        setBanner(general || null);
      })
      .catch((err) => console.error('Banner fetch failed:', err))
      .finally(() => setBannerLoading(false));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen({});
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleMobileSection = (label) =>
    setMobileOpen((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <div className="header-hero">
        {bannerLoading ? (
          <div className="hero-skeleton" aria-hidden="true" />
        ) : banner ? (
          <div className="hero-frame">
            <img
              src={getImageUrl(banner.image_url)}
              alt={banner.title || ''}
              className="hero-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="hero-overlay" />
            <div className="hero-inner container">
              {info?.logo_url && (
                <div className="hero-brand">
                  <img
                    src={getImageUrl(info.logo_url)}
                    alt="AANNHS Logo"
                    className="hero-logo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="hero-copy">
                {banner.title && (
                  <span className="hero-tag">
                    <SparkleIcon className="hero-tag-icon" />
                    {banner.title}
                  </span>
                )}
                <h1 className="hero-heading">
                  {info?.school_name || 'Andres A. Nocon National High School'}
                </h1>
                <p className="hero-sub">
                  {info?.motto || 'Raising Character, Reaching Excellence'}
                </p>
                <div className="hero-cta">
                  <Link to="/admissions" className="cta-primary">
                    Enroll Now
                    <ArrowRightIcon className="cta-icon" />
                  </Link>
                  <Link to="/about" className="cta-ghost">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hero-fallback" aria-hidden="true">
            <div className="hero-pattern" />
            <div className="hero-inner container">
              {info?.logo_url && (
                <div className="hero-brand">
                  <img
                    src={getImageUrl(info.logo_url)}
                    alt="AANNHS Logo"
                    className="hero-logo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="hero-copy">
                <span className="hero-tag">
                  <SparkleIcon className="hero-tag-icon" />
                  Welcome to AANNHS
                </span>
                <h1 className="hero-heading">
                  {info?.school_name || 'Andres A. Nocon National High School'}
                </h1>
                <p className="hero-sub">
                  {info?.motto || 'Raising Character, Reaching Excellence'}
                </p>
                <div className="hero-cta">
                  <Link to="/admissions" className="cta-primary">
                    Enroll Now
                    <ArrowRightIcon className="cta-icon" />
                  </Link>
                  <Link to="/about" className="cta-ghost">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Decorative bottom edge */}
        <div className="hero-edge" />
      </div>

      {/* ── Sticky Navigation ────────────────────────────────────────── */}
      <nav className={`nav-bar${scrolled ? ' is-sticky' : ''}`} ref={navRef}>
        <div className="container nav-row">
          {/* Desktop nav links */}
          <div className={`nav-links${menuOpen ? ' is-mobile-open' : ''}`}>
            {NAV_ITEMS.map((item) => {
              // Desktop: always render DesktopNavItem
              // Mobile: split into triggers and dropdowns handled separately
              return (
                <div key={item.label} className="n-item mobile-item">
                  {item.children ? (
                    <>
                      <button
                        className={`n-link n-trigger${
                          location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                            ? ' is-active'
                            : ''
                        }`}
                        onClick={() => toggleMobileSection(item.label)}
                        aria-haspopup="true"
                        aria-expanded={mobileOpen[item.label] ? "true" : "false"}
                      >
                        <span>{item.label}</span>
                        <ChevronDownIcon className={`n-caret${mobileOpen[item.label] ? ' is-flipped' : ''}`} />
                      </button>
                      <div className={`n-dropdown mobile-dropdown${mobileOpen[item.label] ? ' is-open' : ''}`}>
                        <div className="dd-wrap mobile-dd">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="dd-item mobile-dd-item"
                              onClick={closeMenu}
                            >
                              <span className="dd-item-label">{child.label}</span>
                              <ArrowRightIcon className="dd-item-arrow" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`n-link${
                        location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                          ? ' is-active'
                          : ''
                      }`}
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger-btn${menuOpen ? ' is-active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="h-line h-line-1" />
            <span className="h-line h-line-2" />
            <span className="h-line h-line-3" />
          </button>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {menuOpen && <div className="mobile-backdrop" onClick={toggleMenu} />}
    </>
  );
}
