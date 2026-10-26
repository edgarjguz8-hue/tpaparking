import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { dayParts, money, walkMinutes } from '@/lib/format';
import BackLink from '@/app/BackLink';
import LotList from './LotList';

export const dynamic = 'force-dynamic';

export default async function EventPage({ params }) {
  const { id } = await params;
  const { data: event } = await supabase
    .from('events')
    .select('id, title, starts_at, venues(name, lat, lng)')
    .eq('id', id)
    .maybeSingle();
  if (!event) notFound();

  const { data: lots } = await supabase.rpc('event_lots', { p_event: id });
  const venue = event.venues;
  const when = dayParts(event.starts_at);

  const items = (lots || []).map((l) => ({
    ...l,
    walk: walkMinutes({ lat: l.lat, lng: l.lng }, venue),
    price: money(l.price_cents),
  }));

  return (
    <>
      <div className="backbar">
        <BackLink href="/" label="Back to events" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="title">{event.title}</div>
          <div className="sub">{venue.name} · {when.date} · {when.time}</div>
        </div>
      </div>
      <LotList eventId={id} venue={venue} lots={items} />
    </>
  );
}
