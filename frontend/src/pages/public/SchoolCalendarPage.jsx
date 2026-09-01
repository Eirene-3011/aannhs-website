import React, { useState, useEffect, useMemo, useRef } from 'react';
import api from '../../utils/api';
import { IconCalendar, IconSearch, IconRepeat } from '../../components/Icons';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const CATEGORY_LABELS = {
  event: 'Event',
  academic: 'Academic',
  holiday: 'Holiday',
  special: 'Special',
  general: 'General',
};

function ymKey(y, m) { return `${y}-${m}`; }

export default function SchoolCalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewDate, setViewDate] = useState(() => {
    const t = new Date();
    return { year: t.getFullYear(), month: t.getMonth() };
  });
  const [selectedDay, setSelectedDay] = useState(null);

  const initializedRef = useRef(false);
  const today = new Date();

  useEffect(() => {
    api.get('/calendar').then(r => setEvents(r.data)).finally(() => setLoading(false));
  }, []);

  // On first load, jump the calendar to the nearest month that actually has events
  useEffect(() => {
    if (initializedRef.current || events.length === 0) return;
    initializedRef.current = true;
    const monthsSet = new Set();
    events.forEach(e => {
      if (!e.start_date) return;
      const d = new Date(e.start_date);
      monthsSet.add(ymKey(d.getFullYear(), d.getMonth()));
    });
    const monthsArr = Array.from(monthsSet)
      .map(k => { const [y, m] = k.split('-').map(Number); return { y, m }; })
      .sort((a, b) => a.y - b.y || a.m - b.m);
    const upcoming = monthsArr.find(x => x.y > today.getFullYear() || (x.y === today.getFullYear() && x.m >= today.getMonth()));
    const chosen = upcoming || monthsArr[0];
    if (chosen) setViewDate({ year: chosen.y, month: chosen.m });
  }, [events]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  const categories = useMemo(() => {
    const set = new Set();
    events.forEach(e => { if (e.category) set.add(e.category); });
    return ['all', ...Array.from(set)];
  }, [events]);

  const byCategory = useMemo(
    () => events.filter(e => activeCategory === 'all' || e.category === activeCategory),
    [events, activeCategory]
  );

  const searchMode = query.trim().length > 0;

  // ---- Search / agenda mode (grouped by month, across all years) ----
  const searchResults = useMemo(() => {
    if (!searchMode) return {};
    const q = query.trim().toLowerCase();
    const matches = byCategory.filter(e => e.event_name?.toLowerCase().includes(q));
    const grouped = {};
    matches.forEach(e => {
      if (!e.start_date) return;
      const d = new Date(e.start_date);
      const key = ymKey(d.getFullYear(), d.getMonth());
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(e);
    });
    return grouped;
  }, [searchMode, query, byCategory]);

  // ---- Month-jump dropdown options, built from all events (ignores category filter) ----
  const monthOptions = useMemo(() => {
    const set = new Set();
    events.forEach(e => {
      if (!e.start_date) return;
      const d = new Date(e.start_date);
      set.add(ymKey(d.getFullYear(), d.getMonth()));
    });
    return Array.from(set)
      .map(k => { const [y, m] = k.split('-').map(Number); return { y, m }; })
      .sort((a, b) => a.y - b.y || a.m - b.m);
  }, [events]);

  // ---- Events overlapping the currently viewed month ----
  const monthEvents = useMemo(() => {
    const monthStart = new Date(viewDate.year, viewDate.month, 1);
    const monthEnd = new Date(viewDate.year, viewDate.month + 1, 0);
    return byCategory.filter(e => {
      if (!e.start_date) return false;
      const s = new Date(e.start_date);
      const en = e.end_date ? new Date(e.end_date) : s;
      return s <= monthEnd && en >= monthStart;
    });
  }, [byCategory, viewDate]);

  // ---- Map day-of-month -> events covering that day ----
  const eventsByDay = useMemo(() => {
    const map = {};
    const monthStart = new Date(viewDate.year, viewDate.month, 1);
    const monthEnd = new Date(viewDate.year, viewDate.month + 1, 0);
    monthEvents.forEach(e => {
      const s = new Date(e.start_date);
      const en = e.end_date ? new Date(e.end_date) : s;
      let cur = s < monthStart ? new Date(monthStart) : new Date(s);
      const last = en > monthEnd ? monthEnd : en;
      while (cur <= last) {
        const day = cur.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(e);
        cur.setDate(cur.getDate() + 1);
      }
    });
    return map;
  }, [monthEvents, viewDate]);

  const gridCells = useMemo(() => {
    const firstDay = new Date(viewDate.year, viewDate.month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewDate]);

  const isCurrentRealMonth = viewDate.year === today.getFullYear() && viewDate.month === today.getMonth();

  const goToMonth = (year, month) => { setViewDate({ year, month }); setSelectedDay(null); };
  const shiftMonth = (delta) => {
    let { year, month } = viewDate;
    month += delta;
    if (month < 0) { month = 11; year -= 1; }
    if (month > 11) { month = 0; year += 1; }
    goToMonth(year, month);
  };

  const agendaList = selectedDay ? (eventsByDay[selectedDay] || []) : monthEvents;
  const agendaSorted = [...agendaList].sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>School Calendar</h1>
          <p>Important dates and events for the school year</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {!loading && events.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'var(--gray-50, #f7f7f8)', border: '1px solid var(--gray-200, #e5e5e5)',
                  borderRadius: 8, padding: '8px 12px', flex: '1 1 220px', maxWidth: 300,
                }}
              >
                <IconSearch size={16} style={{ color: 'var(--gray-500, #888)', flexShrink: 0 }} />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search events by name..."
                  aria-label="Search events"
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.85rem', width: '100%', color: 'var(--gray-900)' }}
                />
              </div>

              {categories.length > 1 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {categories.map(c => {
                    const active = activeCategory === c;
                    const label = c === 'all' ? 'All' : (CATEGORY_LABELS[c] || c);
                    return (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`btn btn-sm ${active ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ borderRadius: 20 }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Month navigator — hidden while searching, since search shows an agenda across all months */}
          {!loading && events.length > 0 && !searchMode && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={() => shiftMonth(-1)}
                  aria-label="Previous month"
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: '1.1rem', lineHeight: 1, padding: '4px 10px' }}
                >
                  ‹
                </button>
                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--red-primary)', margin: '0 4px', minWidth: 170, textAlign: 'center' }}>
                  {MONTHS[viewDate.month]} {viewDate.year}
                </h3>
                <button
                  onClick={() => shiftMonth(1)}
                  aria-label="Next month"
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: '1.1rem', lineHeight: 1, padding: '4px 10px' }}
                >
                  ›
                </button>
              </div>

              {monthOptions.length > 0 && (
                <select
                  value={ymKey(viewDate.year, viewDate.month)}
                  onChange={e => {
                    const [y, m] = e.target.value.split('-').map(Number);
                    goToMonth(y, m);
                  }}
                  aria-label="Jump to month"
                  style={{
                    border: '1px solid var(--gray-200, #e5e5e5)', borderRadius: 8,
                    padding: '8px 12px', fontSize: '0.85rem', background: 'white', color: 'var(--gray-900)',
                  }}
                >
                  {monthOptions.map(({ y, m }) => (
                    <option key={ymKey(y, m)} value={ymKey(y, m)}>{MONTHS[m]} {y}</option>
                  ))}
                </select>
              )}
            </div>
          )}

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card" style={{ padding: '16px 20px' }}>
                  <div className="skeleton" style={{ width: '40%', height: 16, marginBottom: 8 }} />
                  <div className="skeleton" style={{ width: '70%', height: 10 }} />
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="alert alert-info">No calendar events have been posted yet.</div>
          ) : searchMode ? (
            // ---- Search results: agenda grouped by month/year ----
            Object.keys(searchResults).length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon" aria-hidden="true"><IconCalendar size={22} /></div>
                <p>No events match your search or filter.</p>
              </div>
            ) : (
              <div>
                {Object.entries(searchResults)
                  .sort(([a], [b]) => {
                    const [ay, am] = a.split('-').map(Number);
                    const [by, bm] = b.split('-').map(Number);
                    return ay - by || am - bm;
                  })
                  .map(([key, evs]) => {
                    const [y, m] = key.split('-').map(Number);
                    return (
                      <div key={key} style={{ marginBottom: 32 }}>
                        <h3 style={monthHeaderStyle}>{MONTHS_SHORT[m]} {y}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {evs.sort((a, b) => new Date(a.start_date) - new Date(b.start_date)).map(ev => (
                            <AgendaRow key={ev.id} ev={ev} monthLabel={MONTHS_SHORT[m]} formatDate={formatDate} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )
          ) : (
            // ---- Real month-grid calendar ----
            <div>
              <div className="calendar-grid-wrap">
                <div className="calendar-weekdays">
                  {WEEKDAYS.map(w => <div key={w} className="calendar-weekday">{w}</div>)}
                </div>
                <div className="calendar-grid">
                  {gridCells.map((day, i) => {
                    if (day === null) return <div key={i} className="calendar-cell calendar-cell-empty" />;
                    const dayEvents = eventsByDay[day] || [];
                    const hasEvents = dayEvents.length > 0;
                    const isToday = isCurrentRealMonth && day === today.getDate();
                    const isSelected = selectedDay === day;
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={!hasEvents}
                        onClick={() => setSelectedDay(isSelected ? null : day)}
                        className={[
                          'calendar-cell',
                          hasEvents ? 'calendar-cell-has-events' : '',
                          isSelected ? 'calendar-cell-selected' : '',
                          isToday ? 'calendar-cell-today' : '',
                        ].join(' ').trim()}
                        aria-label={hasEvents ? `${day}, ${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}` : `${day}`}
                      >
                        <span className="calendar-cell-num">{day}</span>
                        {hasEvents && (
                          <span className="calendar-cell-dots">
                            {dayEvents.slice(0, 3).map((_, di) => <span key={di} className="calendar-dot" />)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h3 style={{ ...monthHeaderStyle, marginBottom: 0, border: 'none', paddingBottom: 0 }}>
                    {selectedDay ? `${MONTHS[viewDate.month]} ${selectedDay}, ${viewDate.year}` : `All events — ${MONTHS[viewDate.month]} ${viewDate.year}`}
                  </h3>
                  {selectedDay && (
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelectedDay(null)}>
                      Show whole month
                    </button>
                  )}
                </div>

                {agendaSorted.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon" aria-hidden="true"><IconCalendar size={22} /></div>
                    <p>No events {selectedDay ? 'on this day' : 'this month'}.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {agendaSorted.map(ev => (
                      <AgendaRow key={ev.id} ev={ev} monthLabel={MONTHS_SHORT[viewDate.month]} formatDate={formatDate} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .calendar-row {
          display: flex;
          gap: 16px;
          padding: 14px 18px;
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: 10px;
          align-items: flex-start;
          transition: box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .calendar-row:hover {
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
          border-color: var(--gray-300, #d4d4d4);
        }
        .calendar-date-chip {
          flex-shrink: 0;
          min-width: 52px;
          text-align: center;
          background: var(--red-pale);
          border-radius: 8px;
          padding: 8px 6px;
        }

        .calendar-grid-wrap {
          border: 1px solid var(--gray-200, #e5e5e5);
          border-radius: 12px;
          overflow: hidden;
          background: white;
        }
        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background: var(--gray-50, #f7f7f8);
          border-bottom: 1px solid var(--gray-200, #e5e5e5);
        }
        .calendar-weekday {
          text-align: center;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--gray-500, #888);
          padding: 8px 0;
          text-transform: uppercase;
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }
        .calendar-cell {
          position: relative;
          height: 64px;
          border: none;
          border-right: 1px solid var(--gray-100, #f0f0f0);
          border-bottom: 1px solid var(--gray-100, #f0f0f0);
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: default;
          padding: 0;
          font-family: inherit;
        }
        .calendar-cell-empty {
          background: var(--gray-50, #fafafa);
        }
        .calendar-cell-num {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gray-700, #444);
        }
        .calendar-cell-has-events {
          cursor: pointer;
          background: var(--red-pale);
        }
        .calendar-cell-has-events .calendar-cell-num {
          color: var(--red-dark);
          font-weight: 800;
        }
        .calendar-cell-has-events:hover {
          background: var(--red-pale-hover, #fbdada);
        }
        .calendar-cell-today {
          box-shadow: inset 0 0 0 2px var(--red-primary);
        }
        .calendar-cell-selected {
          background: var(--red-primary) !important;
        }
        .calendar-cell-selected .calendar-cell-num {
          color: white !important;
        }
        .calendar-cell-dots {
          display: flex;
          gap: 3px;
        }
        .calendar-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--red-primary);
        }
        .calendar-cell-selected .calendar-dot {
          background: white;
        }

        @media (max-width: 480px) {
          .calendar-cell { height: 48px; }
          .calendar-cell-num { font-size: 0.75rem; }
        }
      `}</style>
    </div>
  );
}

const monthHeaderStyle = {
  fontWeight: 800,
  fontSize: '1rem',
  color: 'var(--red-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: '2px solid var(--red-pale)',
};

function AgendaRow({ ev, monthLabel, formatDate }) {
  const startDate = new Date(ev.start_date);
  const hasRange = ev.end_date && ev.end_date !== ev.start_date;
  return (
    <div className="calendar-row">
      <div className="calendar-date-chip">
        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--red-primary)', textTransform: 'uppercase', margin: 0 }}>
          {monthLabel}
        </p>
        <p style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--red-dark)', margin: 0, lineHeight: 1 }}>
          {startDate.getDate()}
        </p>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-900)', margin: '0 0 6px' }}>
          {ev.event_name}
        </h4>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {ev.category && (
            <span
              style={{
                fontSize: '0.72rem', fontWeight: 600, color: 'var(--red-primary)',
                background: 'var(--red-pale)', borderRadius: 4, padding: '2px 8px',
              }}
            >
              {CATEGORY_LABELS[ev.category] || ev.category}
            </span>
          )}
          {hasRange && (
            <span style={{ fontSize: '0.78rem', color: 'var(--gray-500, #888)' }}>
              {formatDate(ev.start_date)} – {formatDate(ev.end_date)}
            </span>
          )}
          {!!ev.is_recurring && (
            <span style={{ fontSize: '0.75rem', color: 'var(--gray-500, #888)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IconRepeat size={13} />
              Recurring yearly
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
