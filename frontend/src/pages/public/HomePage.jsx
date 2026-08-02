import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { getImageUrl } from '../../utils/helpers';
import './HomePage.css';

/* SVG Icons */
const UsersIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const UserCheckIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);
const BuildingIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
);
const TrendingUpIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const SchoolIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const ClipboardIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);
const GraduationIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const TrophyIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
const StarIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const PhoneIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const ArrowRightIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const ChevronLeftIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRightIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const PauseIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);
const PlayIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5v14l11-7z" />
  </svg>
);
const CalendarIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const SparkleIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
  </svg>
);
const BookOpenIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const UsersRoundIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const PieChartIcon = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

/* Quick link "file codes" — a nod to the registrar's index-tab system,
   each one a short abbreviation for the section it opens. */
const QUICK_LINKS = [
  { label: 'About AANNHS', desc: 'School profile & history', path: '/about', Icon: SchoolIcon, accent: 'blue', code: 'INFO' },
  { label: 'Admissions', desc: 'Enrollment information', path: '/admissions', Icon: ClipboardIcon, accent: 'blue', code: 'ADM' },
  { label: 'Programs & Activities', desc: 'PPAs and events', path: '/ppas', Icon: GraduationIcon, accent: 'green', code: 'PPA' },
  { label: 'Accomplishments', desc: 'Awards & achievements', path: '/accomplishments', Icon: TrophyIcon, accent: 'purple', code: 'AWD' },
  { label: "Students' Corner", desc: 'Featured students', path: '/students-corner', Icon: StarIcon, accent: 'orange', code: 'STU' },
  { label: 'Contact Us', desc: 'Get in touch', path: '/contact', Icon: PhoneIcon, accent: 'teal', code: 'CTC' },
];

const DASH_ICONS = [
  { Icon: UsersIcon, accent: 'blue' },
  { Icon: UserCheckIcon, accent: 'blue' },
  { Icon: BuildingIcon, accent: 'green' },
  { Icon: TrendingUpIcon, accent: 'purple' },
];

/* ─── Intersection Observer hook ──────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const [node, setNode] = useState(null);
  const [inView, setInView] = useState(false);

  const ref = useCallback((el) => {
    if (el) setNode(el);
  }, []);

  useEffect(() => {
    if (!node || inView) return;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [node, threshold, inView]);

  return [ref, inView];
}

/* ─── Count-up animation ─────────────────────────────────────────────── */
function useCountUp(target, start, duration = 1300) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start || typeof target !== 'number' || Number.isNaN(target)) return;
    let raf;
    let startTime = null;
    const step = (ts) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function KpiValue({ value, start, small }) {
  const isNumeric = typeof value === 'number';
  const count = useCountUp(isNumeric ? value : 0, start && isNumeric);
  const display = isNumeric ? count.toLocaleString() : value;
  return <p className={`kpi-value${small ? ' kpi-value-sm' : ''}`}>{display}</p>;
}

/* ─── Animated SVG Donut Pie Chart ───────────────────────────────────── */
function DonutChart({ data, animate, size = 200 }) {
  if (!data || data.length === 0) return null;
  const total = data.reduce((s, d) => s + d.value, 0);
  const pad = 14;
  const viewSize = size + pad * 2;
  const cx = viewSize / 2;
  const cy = viewSize / 2;
  const outerR = size / 2 - 10;
  const innerR = outerR * 0.55;
  const circumference = 2 * Math.PI * outerR;

  let accumulated = 0;
  const segments = data.map((d, i) => {
    const pct = d.value / total;
    const dashArray = `${circumference * pct} ${circumference}`;
    const dashOffset = -circumference * accumulated + (animate ? 0 : 0);
    accumulated += pct;
    return (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke={d.color}
        strokeWidth={outerR - innerR}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
        className="donut-segment"
        style={{
          transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: `${i * 0.2}s`,
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.08))',
        }}
      />
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${viewSize} ${viewSize}`} className="donut-chart">
      {/* Background ring */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="var(--gray-100)" strokeWidth={outerR - innerR} />
      {/* Animated segments */}
      {segments}
      {/* Center text */}
      <text x={cx} y={cy - 8} textAnchor="middle" className="donut-center-num" fill="var(--gray-900)" fontFamily="var(--font-mono)" fontSize="22" fontWeight="700">{total.toLocaleString()}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" className="donut-center-label" fill="var(--gray-500)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">TOTAL</text>
    </svg>
  );
}

/* ─── Horizontal Bar Chart ────────────────────────────────────────────── */
function HorizontalBarChart({ data, animate }) {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data.flatMap(d => [d.sections, d.classrooms]), 1);

  return (
    <div className="horizontal-bar-chart">
      <div className="chart-grid-vertical">
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
          <div key={i} className="v-grid-line" style={{ left: `${pct * 100}%` }}>
            <span className="v-grid-label">{Math.round(maxVal * pct)}</span>
          </div>
        ))}
      </div>
      <div className="chart-rows">
        {data.map((d, i) => {
          const secW = (d.sections / maxVal) * 100;
          const clsW = (d.classrooms / maxVal) * 100;
          return (
            <div key={i} className="chart-row-item">
              <div className="row-label">{d.name}</div>
              <div className="row-bars-container">
                <div className="horizontal-bar-group">
                  <div
                    className="h-bar h-bar-sections"
                    style={{
                      width: animate ? `${secW}%` : '0%',
                      transitionDelay: `${i * 0.05}s`
                    }}
                  >
                    <span className="h-bar-value">{d.sections}</span>
                  </div>
                  <div
                    className="h-bar h-bar-classrooms"
                    style={{
                      width: animate ? `${clsW}%` : '0%',
                      transitionDelay: `${i * 0.05 + 0.1}s`
                    }}
                  >
                    <span className="h-bar-value">{d.classrooms}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [dashboard, setDashboard] = useState(null);
  const [ppas, setPpas] = useState([]);
  const [loadingDash, setLoadingDash] = useState(true);

  const [banners, setBanners] = useState([]);
  const [bannersLoading, setBannersLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    api.get('/school-dashboard').then(r => setDashboard(r.data)).catch(() => {}).finally(() => setLoadingDash(false));
    api.get('/ppas').then(r => setPpas(r.data.slice(0, 3))).catch(() => {});
    api.get('/banners')
      .then(r => {
        const seasonal = (r.data || []).filter(b => b.type !== 'general');
        setBanners(seasonal);
      })
      .catch(() => {})
      .finally(() => setBannersLoading(false));
  }, []);

  useEffect(() => {
    if (banners.length <= 1 || !autoplay) return;
    const timer = setInterval(() => setCurrentBanner(p => (p + 1) % banners.length), 6000);
    return () => clearInterval(timer);
  }, [banners.length, autoplay]);

  const goToBanner = useCallback((i) => { setCurrentBanner(i); setAutoplay(false); }, []);
  const prevBanner = useCallback(() => setCurrentBanner(p => (p - 1 + banners.length) % banners.length), [banners.length]);
  const nextBanner = useCallback(() => setCurrentBanner(p => (p + 1) % banners.length), [banners.length]);

  const banner = banners[currentBanner];
  const dashStats = dashboard?.stats || {};
  const grades = dashboard?.grades || [];

  const dashItems = [
    { label: 'Total Enrollment', value: dashStats.enrollment_count != null ? Number(dashStats.enrollment_count) : '—', small: false },
    { label: 'Teaching Personnel', value: dashStats.teaching_personnel != null ? Number(dashStats.teaching_personnel) : '—', small: false },
    { label: 'Non-Teaching Personnel', value: dashStats.non_teaching_personnel != null ? Number(dashStats.non_teaching_personnel) : '—', small: false },
    { label: 'Performance Indicator', value: dashStats.performance_indicator ?? '—', small: true },
  ];

  const hasBanners = banners.length > 0;

  /* ─── Chart data derived from dashboard ──────────────────────────── */
  const barChartData = useMemo(() => {
    if (!grades || grades.length === 0) return [];
    return grades.map(g => ({
      name: g.grade_level,
      sections: Number(g.sections_count) || 0,
      classrooms: Number(g.classrooms_count) || 0,
    }));
  }, [grades]);

  const pieChartData = useMemo(() => {
    const teaching = Number(dashStats.teaching_personnel) || 0;
    const nonTeaching = Number(dashStats.non_teaching_personnel) || 0;
    if (teaching === 0 && nonTeaching === 0) return [];
    return [
      { name: 'Teaching', value: teaching, color: '#c41e3a' },
      { name: 'Non-Teaching', value: nonTeaching, color: '#c99a3b' },
    ];
  }, [dashStats.teaching_personnel, dashStats.non_teaching_personnel]);

  /* ─── Summary stats ────────────────────────────────────────────── */
  const summaryStats = useMemo(() => {
    const totalSections = grades.reduce((s, g) => s + (Number(g.sections_count) || 0), 0);
    const totalClassrooms = grades.reduce((s, g) => s + (Number(g.classrooms_count) || 0), 0);
    const enrollment = Number(dashStats.enrollment_count) || 0;
    const ratio = totalSections > 0 ? Math.round((enrollment / totalSections) * 10) / 10 : 0;
    return { totalSections, totalClassrooms, avgPerSection: ratio };
  }, [grades, dashStats.enrollment_count]);

  const [dashRef, dashInView] = useInView(0.1);
  const [chartRef, chartInView] = useInView(0.15);
  const [quickRef, quickInView] = useInView(0.15);
  const [ppaRef, ppaInView] = useInView(0.15);
  const [ctaRef, ctaInView] = useInView(0.3);

  return (
    <div className="homepage">
      {/* ============================================================
          HERO — Cinematic slideshow with Ken Burns zoom
          ============================================================ */}
      <section
        className="hero-slideshow"
        onMouseEnter={() => banners.length > 1 && setAutoplay(false)}
        onMouseLeave={() => banners.length > 1 && setAutoplay(true)}
      >
        {bannersLoading ? (
          <div className="hero-skeleton" aria-hidden="true" />
        ) : hasBanners && banner ? (
          <>
            <div className="hero-slide-track">
              {banners.map((b, i) => (
                <div key={i} className={`hero-slide${i === currentBanner ? ' active' : ''}`} aria-hidden={i !== currentBanner}>
                  <img src={getImageUrl(b.image_url)} alt={b.title || ''} className="hero-slide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="hero-slide-overlay" />
                  <div className="hero-ken-burns" />
                </div>
              ))}
            </div>

            {/* Vignette overlay for cinematic depth */}
            <div className="hero-vignette" />

            {banners.length > 1 && (
              <>
                <button className="hero-nav hero-nav-prev" onClick={prevBanner} aria-label="Previous banner"><ChevronLeftIcon /></button>
                <button className="hero-nav hero-nav-next" onClick={nextBanner} aria-label="Next banner"><ChevronRightIcon /></button>
                <div className="hero-controls">
                  <button type="button" className="hero-toggle" onClick={() => setAutoplay(a => !a)} aria-label={autoplay ? 'Pause slideshow' : 'Play slideshow'} title={autoplay ? 'Pause' : 'Play'}>
                    {autoplay ? <PauseIcon className="hero-toggle-icon" /> : <PlayIcon className="hero-toggle-icon" />}
                  </button>
                  <div className="hero-dots" role="tablist" aria-label="Banner navigation">
                    {banners.map((_, i) => (
                      <button key={i} role="tab" aria-selected={i === currentBanner} aria-label={`Show banner ${i + 1}`} className={`hero-dot${i === currentBanner ? ' active' : ''}`} onClick={() => goToBanner(i)} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="hero-fallback" aria-hidden="true">
            <div className="hero-fallback-pattern" />
          </div>
        )}
      </section>

      {/* ─── Nameplate — index card bridging the hero into the page ───── */}
      <div className="hero-nameplate-wrap">
        <div className="container">
          <div className="hero-nameplate card-cut">
            <span className="hero-nameplate-tab">Official School Portal</span>
            <h1 className="hero-nameplate-title">AANNHS</h1>
            <p className="hero-nameplate-sub">
              Quality public secondary education, rooted in community and committed to every learner's growth.
            </p>
          </div>
        </div>
      </div>

      {/* Perforated divider */}
      <div className="ribbon-divider" aria-hidden="true" />

      {/* ============================================================
          SCHOOL DASHBOARD — KPI Cards + Charts
          ============================================================ */}
      <section className="section dashboard-section" ref={dashRef}>
        <div className="container">
          <div className={`section-header reveal${dashInView ? ' in-view' : ''}`}>
            <div className="section-header-inner">
              <span className="section-eyebrow">At a Glance</span>
              <h2 className="section-title">School Dashboard</h2>
              <p className="section-subtitle">Key statistics and performance indicators for the current school year.</p>
            </div>
            <span className="title-accent title-accent-center" aria-hidden="true" />
          </div>

          {loadingDash ? (
            <div className="kpi-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="kpi-card kpi-skeleton">
                  <div className="skeleton skeleton-icon" /><div className="skeleton skeleton-num" /><div className="skeleton skeleton-label" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* KPI Cards */}
              <div className={`kpi-grid${dashInView ? ' in-view' : ''}`}>
                {dashItems.map((item, i) => {
                  const { Icon, accent } = DASH_ICONS[i];
                  return (
                    <div key={item.label} className={`kpi-card card-cut accent-${accent}`}>
                      <div className="kpi-icon-wrap"><Icon className="kpi-icon" /></div>
                      <KpiValue value={item.value} start={dashInView} small={item.small} />
                      <p className="kpi-label">{item.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* ─── Summary Info Strip ──────────────────────────── */}
              <div className={`dash-summary-strip${dashInView ? ' in-view' : ''}`}>
                <div className="dash-summary-card">
                  <div className="dash-summary-icon"><BookOpenIcon /></div>
                  <div className="dash-summary-content">
                    <span className="dash-summary-number">{summaryStats.totalSections}</span>
                    <span className="dash-summary-label">Total Sections</span>
                  </div>
                </div>
                <div className="dash-summary-card">
                  <div className="dash-summary-icon"><BuildingIcon /></div>
                  <div className="dash-summary-content">
                    <span className="dash-summary-number">{summaryStats.totalClassrooms}</span>
                    <span className="dash-summary-label">Classrooms</span>
                  </div>
                </div>
                <div className="dash-summary-card">
                  <div className="dash-summary-icon"><UsersRoundIcon /></div>
                  <div className="dash-summary-content">
                    <span className="dash-summary-number">{summaryStats.avgPerSection || '—'}</span>
                    <span className="dash-summary-label">Avg Students / Section</span>
                  </div>
                </div>
              </div>

              {/* ─── Charts Section ──────────────────────────────── */}
              <div className={`charts-section${chartInView ? ' in-view' : ''}`} ref={chartRef}>
                <div className="charts-header">
                  <div className="charts-header-left">
                    <div className="charts-header-row">
                      <span className="section-eyebrow">Visual Insights</span>
                      <h3 className="charts-title">Enrollment &amp; Personnel Analytics</h3>
                    </div>
                    <p className="charts-subtitle">Grade-level distribution and staff composition at a glance.</p>
                  </div>
                  <div className="charts-legend-badge">
                    <PieChartIcon className="charts-badge-icon" />
                    <span>Live Data</span>
                  </div>
                </div>

                <div className="charts-grid">
                  {/* Horizontal Bar Chart — Grade-Level Breakdown */}
                  <div className="chart-card card-cut chart-card-lg">
                    <div className="chart-card-header">
                      <div className="chart-card-title-wrap">
                        <CalendarIcon className="chart-card-icon" />
                        <h4>Grade-Level Breakdown</h4>
                      </div>
                      <div className="chart-card-legend">
                        <span className="legend-dot legend-dot-red" />
                        <span>Sections</span>
                        <span className="legend-dot legend-dot-gold" />
                        <span>Classrooms</span>
                      </div>
                    </div>
                    <div className="chart-container">
                      {barChartData.length > 0 ? (
                        <HorizontalBarChart data={barChartData} animate={chartInView} />
                      ) : (
                        <div className="chart-empty">No grade data available</div>
                      )}
                    </div>
                  </div>

                  {/* Donut Pie Chart — Personnel Distribution */}
                  <div className="chart-card card-cut chart-card-sm">
                    <div className="chart-card-header">
                      <div className="chart-card-title-wrap">
                        <PieChartIcon className="chart-card-icon" />
                        <h4>Personnel Distribution</h4>
                      </div>
                    </div>
                    <div className="chart-container chart-container-pie">
                      {pieChartData.length > 0 ? (
                        <DonutChart data={pieChartData} animate={chartInView} />
                      ) : (
                        <div className="chart-empty">No personnel data available</div>
                      )}
                    </div>
                    {/* Personnel count badges */}
                    {pieChartData.length > 0 && (
                      <div className="personnel-badges">
                        <div className="personnel-badge">
                          <span className="personnel-badge-dot" style={{ background: '#c41e3a' }} />
                          <span className="personnel-badge-label">Teaching</span>
                          <span className="personnel-badge-value">{Number(dashStats.teaching_personnel) || 0}</span>
                        </div>
                        <div className="personnel-badge">
                          <span className="personnel-badge-dot" style={{ background: '#c99a3b' }} />
                          <span className="personnel-badge-label">Non-Teaching</span>
                          <span className="personnel-badge-value">{Number(dashStats.non_teaching_personnel) || 0}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============================================================
          QUICK ACCESS
          ============================================================ */}
      <section className="section quick-links-section" ref={quickRef}>
        <div className="container">
          <div className={`section-header reveal${quickInView ? ' in-view' : ''}`}>
            <div className="section-header-inner">
              <span className="section-eyebrow">Explore</span>
              <h2 className="section-title">Quick Access</h2>
              <p className="section-subtitle">Jump directly to the most visited sections of our portal.</p>
            </div>
            <span className="title-accent title-accent-center" aria-hidden="true" />
          </div>
          <div className={`quick-links-grid${quickInView ? ' in-view' : ''}`}>
            {QUICK_LINKS.map(({ label, desc, path, Icon, accent, code }) => (
              <Link key={label} to={path} className={`quick-link-card card-cut accent-${accent}`}>
                <span className="ql-tab-code">{code}</span>
                <div className="ql-card-inner">
                  <div className="ql-icon-wrap"><Icon className="ql-icon" /></div>
                  <div className="ql-body">
                    <span className="ql-label">{label}</span>
                    <span className="ql-desc">{desc}</span>
                  </div>
                  <div className="ql-arrow-wrap">
                    <ArrowRightIcon className="ql-arrow" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          RECENT PPAs
          ============================================================ */}
      {ppas.length > 0 && (
        <section className="section ppas-section" ref={ppaRef}>
          <div className="container">
            <div className="section-row">
              <div className={`section-header section-header-left reveal${ppaInView ? ' in-view' : ''}`}>
                <div className="section-header-inner">
                  <span className="section-eyebrow">What's New</span>
                  <h2 className="section-title">Programs &amp; Activities</h2>
                </div>
                <span className="title-accent title-accent-left" aria-hidden="true" />
              </div>
              <Link to="/ppas" className="view-all-link">
                <span>View All</span>
                <ArrowRightIcon className="view-all-icon" />
              </Link>
            </div>
            <div className={`ppas-grid${ppaInView ? ' in-view' : ''}`}>
              {ppas.map(p => (
                <div key={p.id} className="ppa-card card-cut">
                  {p.image_url && (
                    <div className="ppa-image-wrap">
                      <img src={getImageUrl(p.image_url)} alt={p.name} className="ppa-image" onError={e => e.target.style.display = 'none'} />
                      <div className="ppa-image-overlay" />
                    </div>
                  )}
                  <div className="ppa-body">
                    <h3 className="ppa-name">{p.name}</h3>
                    <Link to="/ppas" className="ppa-link">
                      <span>Read more</span>
                      <ArrowRightIcon className="ppa-link-icon" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          CTA
          ============================================================ */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-pattern" />
        <div className="cta-glow-orb cta-glow-orb-1" />
        <div className="cta-glow-orb cta-glow-orb-2" />
        <div className={`container cta-inner reveal${ctaInView ? ' in-view' : ''}`}>
          <div className="cta-text">
            <div className="cta-badge">
              <SparkleIcon className="cta-badge-icon" />
              <span>Join Us</span>
            </div>
            <h2>Ready to join the AANNHS community?</h2>
            <p>Take the first step toward quality education. Enroll today or reach out to learn more about our programs and offerings.</p>
          </div>
          <div className="cta-actions">
            <Link to="/admissions" className="btn btn-primary btn-lg">
              <span>Enroll Now</span>
              <ArrowRightIcon className="btn-icon" />
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
