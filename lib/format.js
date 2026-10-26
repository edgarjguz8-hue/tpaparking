const TZ = 'America/New_York';

export function money(cents) {
  return '$' + (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
}

export function moneyExact(cents) {
  return '$' + (cents / 100).toFixed(2);
}

export function dayParts(iso) {
  const d = new Date(iso);
  return {
    dow: d.toLocaleDateString('en-US', { weekday: 'short', timeZone: TZ }).toUpperCase(),
    day: d.toLocaleDateString('en-US', { day: 'numeric', timeZone: TZ }),
    date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: TZ }),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TZ }),
  };
}

// Straight-line distance → rough walking minutes (80 m per minute, ×1.3 for streets)
export function walkMinutes(a, b) {
  if (a.lat == null || b.lat == null) return null;
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  const meters = 2 * R * Math.asin(Math.sqrt(h)) * 1.3;
  return Math.max(1, Math.round(meters / 80));
}
