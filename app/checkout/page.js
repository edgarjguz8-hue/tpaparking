import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { dayParts, walkMinutes } from '@/lib/format';
import BackLink from '@/app/BackLink';
import CheckoutForm from './CheckoutForm';

export const dynamic = 'force-dynamic';

export default async function Checkout({ searchParams }) {
  const { e, le } = await searchParams;
  if (!e || !le) notFound();

  const [{ data: event }, { data: lots }] = await Promise.all([
    supabase.from('events').select('title, starts_at, venues(name, lat, lng)').eq('id', e).maybeSingle(),
    supabase.rpc('event_lots', { p_event: e }),
  ]);
  const lot = (lots || []).find((l) => l.lot_event_id === le);
  if (!event || !lot) notFound();

  const when = dayParts(event.starts_at);
  const walk = walkMinutes(lot, event.venues);

  return (
    <>
      <div className="backbar">
        <BackLink href={`/event/${e}`} label="Back to lots" />
        <div className="display" style={{ fontSize: 22 }}>Checkout</div>
      </div>
      <div className="pad">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div className="title">{lot.lot_name}</div>
          <div className="sub">{event.title} · {when.date}{walk ? ` · ${walk} min walk` : ''}</div>
          <div className="accent" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
            Spot guaranteed or your money back
          </div>
        </div>
      </div>
      <CheckoutForm lotEventId={le} priceCents={lot.price_cents} spotsLeft={lot.spots_left} feeCents={150} />
    </>
  );
}
