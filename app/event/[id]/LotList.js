'use client';

import Link from 'next/link';
import { useState } from 'react';

const SORTS = [
  { id: 'closest', label: 'Closest' },
  { id: 'cheapest', label: 'Cheapest' },
];

function mapPositions(venue, lots) {
  const pts = lots.filter((l) => l.lat != null);
  const span = Math.max(
    0.004,
    ...pts.map((l) => Math.abs(l.lat - venue.lat)),
    ...pts.map((l) => Math.abs(l.lng - venue.lng))
  );
  const pos = (lat, lng) => ({
    left: `${50 + ((lng - venue.lng) / span) * 38}%`,
    top: `${50 - ((lat - venue.lat) / span) * 36}%`,
  });
  return { venue: pos(venue.lat, venue.lng), pins: pts.map((l) => ({ id: l.lot_event_id, price: l.price, ...pos(l.lat, l.lng) })) };
}

export default function LotList({ eventId, venue, lots }) {
  const [sort, setSort] = useState('closest');
  const [trucks, setTrucks] = useState(false);

  let shown = lots.filter((l) => l.spots_left > 0 && (!trucks || l.vehicle_fit === 'trucks_ok'));
  shown = [...shown].sort((a, b) =>
    sort === 'cheapest' ? a.price_cents - b.price_cents : (a.walk ?? 999) - (b.walk ?? 999)
  );
  const soldOut = lots.filter((l) => l.spots_left <= 0).length;
  const map = mapPositions(venue, shown);

  return (
    <>
      <div className="map" role="img" aria-label={`Map of lots near ${venue.name}`}>
        <div className="road-h" />
        <div className="road-v" />
        <div className="venue" style={map.venue}>{venue.name.split(' ')[0]}</div>
        {map.pins.map((p) => (
          <a key={p.id} href={`#lot-${p.id}`} className="pin" style={{ left: p.left, top: p.top }}>{p.price}</a>
        ))}
      </div>
      <div className="pills">
        {SORTS.map((s) => (
          <button key={s.id} type="button" className="pill" aria-pressed={sort === s.id} onClick={() => setSort(s.id)}>
            {s.label}
          </button>
        ))}
        <button type="button" className="pill" aria-pressed={trucks} onClick={() => setTrucks(!trucks)}>Trucks OK</button>
      </div>
      <div className="pad stack" style={{ padding: '10px 20px 28px' }}>
        {shown.length === 0 && (
          <p className="sub">{lots.length === 0 ? 'No lots listed for this event yet.' : 'No lots match. Try another filter.'}</p>
        )}
        {shown.map((l) => (
          <div key={l.lot_event_id} id={`lot-${l.lot_event_id}`} className="card stack">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div className="title">{l.lot_name}</div>
                <div className="sub">
                  {l.walk ? `${l.walk} min walk · ` : ''}{l.spots_left} {l.spots_left === 1 ? 'spot' : 'spots'} left · {l.vehicle_fit === 'trucks_ok' ? 'Trucks OK' : 'Cars only'}
                </div>
              </div>
              <div className="price-big">{l.price}</div>
            </div>
            <Link href={`/checkout?e=${eventId}&le=${l.lot_event_id}`} className="btn">Reserve this spot</Link>
          </div>
        ))}
        {soldOut > 0 && <p className="sub">{soldOut} {soldOut === 1 ? 'lot is' : 'lots are'} sold out.</p>}
      </div>
    </>
  );
}
