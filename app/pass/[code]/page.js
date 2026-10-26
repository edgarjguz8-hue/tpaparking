import Link from 'next/link';
import { notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { supabase } from '@/lib/supabase';
import { dayParts } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function Pass({ params }) {
  const { code } = await params;
  const { data } = await supabase.rpc('get_pass', { p_code: code });
  const p = data?.[0];
  if (!p) notFound();

  const svg = await QRCode.toString(`TPAPARKING:${p.code}`, { type: 'svg', margin: 0, color: { dark: '#0E1116', light: '#FFFFFF' } });
  const when = dayParts(p.starts_at);
  const dest = p.lat != null ? `${p.lat},${p.lng}` : encodeURIComponent(p.address);
  const canceled = p.status === 'canceled' || p.status === 'refunded';

  return (
    <div className="app-dark" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 20px 28px', gap: 20, minHeight: '100dvh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="logo" style={{ fontSize: 20 }}>Tpa<span style={{ color: 'var(--accent-bright)' }}>Parking</span></Link>
        <Link href="/" style={{ minHeight: 44, display: 'flex', alignItems: 'center', color: '#C7CDD6', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Done</Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h1 className="display" style={{ margin: 0, fontSize: 34 }}>{canceled ? 'Pass canceled.' : "You're parked."}</h1>
        <div style={{ fontSize: 14, color: '#C7CDD6' }}>Show this at the gate. Save this page or screenshot it.</div>
      </div>
      <div className="pass-card">
        <div role="img" aria-label={`Parking pass QR code ${p.code}`} dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="display" style={{ fontSize: 18, letterSpacing: 2 }}>{p.code}</div>
        <div className="pass-grid">
          <div><span>Lot</span><strong>{p.lot_name}</strong></div>
          <div><span>Plate</span><strong>{p.plate}{p.cars > 1 ? ` (+${p.cars - 1})` : ''}</strong></div>
          <div><span>Event</span><strong>{p.event_title}</strong></div>
          <div><span>When</span><strong>{when.date} · {when.time}</strong></div>
        </div>
      </div>
      {p.instructions && (
        <div className="dark-box">
          <div style={{ fontSize: 13, color: '#C7CDD6' }}>How to get in</div>
          <div style={{ fontSize: 15 }}>{p.instructions}</div>
        </div>
      )}
      <div className="grow" />
      <a href={`https://www.google.com/maps/dir/?api=1&destination=${dest}`} className="btn btn-bright" target="_blank" rel="noopener noreferrer">Get directions</a>
    </div>
  );
}
