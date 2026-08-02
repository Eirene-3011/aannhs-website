import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSchoolInfo } from '../../hooks/useSchoolInfo';
import api from '../../utils/api';
import { getImageUrl } from '../../utils/helpers';
import './Header.css';

/* ─── Icons ─────────────────────────────────────────────────────────── */
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

const CheckIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Navigation data ───────────────────────────────────────────────── */
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

/* ─── Single nav item (desktop opens on hover via CSS, mobile via click) ── */
function NavItem({ item, isActivePath, isOpen, onToggle, onNavigate }) {
  const hasChildren = !!item.children;

  return (
    <div className={`n-item${hasChildren ? ' has-children' : ''}${isOpen ? ' is-open' : ''}`}>
      {hasChildren ? (
        <button
          type="button"
          className={`n-link n-trigger${isActivePath ? ' is-active' : ''}`}
          onClick={() => onToggle(item.label)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>{item.label}</span>
          <ChevronDownIcon className={`n-caret${isOpen ? ' is-flipped' : ''}`} />
        </button>
      ) : (
        <Link
          to={item.path}
          className={`n-link${isActivePath ? ' is-active' : ''}`}
          onClick={onNavigate}
        >
          <span>{item.label}</span>
        </Link>
      )}

      {hasChildren && (
        <div className={`n-dropdown${isOpen ? ' is-open' : ''}`}>
          <div className="dd-wrap">
            <div className="dd-header">
              <span className="dd-header-label">{item.label}</span>
              <span className="dd-header-line" />
            </div>
            {item.children.map((child) => (
              <Link
                key={child.label}
                to={child.path}
                className="dd-item"
                onClick={onNavigate}
              >
                <span className="dd-item-label">{child.label}</span>
                <ArrowRightIcon className="dd-item-arrow" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Header ────────────────────────────────────────────────────────── */
export default function Header() {
  const { info } = useSchoolInfo();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const navRef = useRef(null);

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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenSection(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenSection(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = useCallback(() => { setMenuOpen(false); setOpenSection(null); }, []);
  const toggleSection = (label) => setOpenSection((prev) => (prev === label ? null : label));

  const schoolName = info?.school_name || 'Andres A. Nocon National High School';
  const motto = info?.motto || 'Raising Character, Reaching Excellence';

  return (
    <>
      <header className="site-header">
        {/* ── Masthead: compact identity plaque, not a competing hero ──── */}
        <div className="masthead">
          <div className="masthead-media" aria-hidden="true">
            {bannerLoading ? (
              <div className="masthead-skeleton" />
            ) : banner ? (
              <img
                src={getImageUrl(banner.image_url)}
                alt=""
                className="masthead-img"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="masthead-fallback">
                <div className="masthead-pattern" />
              </div>
            )}
            <div className="masthead-shade" />
          </div>
          <div className="masthead-seam" aria-hidden="true" />

          <div className="container masthead-row">
            <div className="masthead-plaque">
              {info?.logo_url && (
                <div className="masthead-logo-wrap">
                  <img
                    src={getImageUrl(info.logo_url)}
                    alt="School Logo"
                    className="masthead-logo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="masthead-logo-badge" title="DepEd Recognized">
                    <CheckIcon className="masthead-logo-badge-icon" />
                  </span>
                </div>
              )}
              <div className="masthead-copy">
                {banner?.title && (
                  <span className="masthead-tag">
                    <SparkleIcon className="masthead-tag-icon" />
                    {banner.title}
                  </span>
                )}
                <h1 className="masthead-heading">{schoolName}</h1>
                <p className="masthead-sub">{motto}</p>
              </div>
            </div>

            <div className="masthead-actions">
              <Link to="/about" className="btn btn-ghost">
                Learn More
              </Link>
              <Link to="/admissions" className="btn btn-primary">
                <span>Enroll Now</span>
                <ArrowRightIcon className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Sticky navigation ──────────────────────────────────────── */}
        <nav className={`nav-bar${scrolled ? ' is-sticky' : ''}`} ref={navRef}>
          <div className="container nav-row">
            <div className={`nav-links${menuOpen ? ' is-mobile-open' : ''}`}>
              {NAV_ITEMS.map((item) => {
                const isActivePath = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                return (
                  <NavItem
                    key={item.label}
                    item={item}
                    isActivePath={isActivePath}
                    isOpen={openSection === item.label}
                    onToggle={toggleSection}
                    onNavigate={closeMenu}
                  />
                );
              })}
            </div>

            <button
              className={`hamburger-btn${menuOpen ? ' is-active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="h-line h-line-1" />
              <span className="h-line h-line-2" />
              <span className="h-line h-line-3" />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && <div className="mobile-backdrop" onClick={toggleMenu} />}
    </>
  );
}
