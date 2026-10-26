import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { dayParts, money } from '@/lib/format';
import EventSearch from './EventSearch';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: events, error } = await supabase.rpc('event_summaries');

  return (
    <>
      <div className="topbar">
        <Link href="/" className="logo">Tpa<span>Parking</span></Link>
        <div className="sub" style={{ fontWeight: 500 }}>Tampa Bay</div>
      </div>
      <div className="pad stack" style={{ paddingTop: 16, gap: 16 }}>
        <h1 className="hero display">Park for the game.<br />Skip the circling.</h1>
      </div>
      {error ? (
        <p className="pad error">Couldn't load events. Please refresh.</p>
      ) : (
        <EventSearch
          events={(events || []).map((e) => ({ ...e, ...dayParts(e.starts_at), from: e.min_price_cents ? money(e.min_price_cents) : null }))}
        />
      )}
      <div className="grow" />
      <div className="owner-cta">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Own a lot near a venue?</div>
          <div style={{ fontSize: 13, color: '#C7CDD6' }}>Earn on game days. Free to list.</div>
        </div>
        <Link href="/list">List your lot</Link>
      </div>
    </>
  );
}
