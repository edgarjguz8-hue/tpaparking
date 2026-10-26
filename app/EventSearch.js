'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function EventSearch({ events }) {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const shown = term
    ? events.filter((e) => (e.title + ' ' + e.venue_name).toLowerCase().includes(term))
    : events;

  return (
    <>
      <div className="pad" style={{ paddingTop: 16 }}>
        <label className="field">
          Find your event
          <input
            className="input"
            type="search"
            placeholder="Search games, concerts, venues"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>
      <div className="section-label">Upcoming</div>
      <div className="pad stack">
        {shown.length === 0 && <p className="sub">No events found.</p>}
        {shown.map((e) => (
          <Link key={e.event_id} href={`/event/${e.event_id}`} className="card event-card">
            <div className="datebox">
              <div className="dow">{e.dow}</div>
              <div className="num">{e.day}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div className="title">{e.title}</div>
              <div className="sub">{e.venue_name} · {e.time}</div>
              <div className="accent" style={{ fontSize: 13, fontWeight: 600 }}>
                {e.lot_count > 0 ? `${e.lot_count} ${e.lot_count === 1 ? 'lot' : 'lots'} · from ${e.from}` : 'No lots yet'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
