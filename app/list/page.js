import { supabase } from '@/lib/supabase';
import { dayParts } from '@/lib/format';
import BackLink from '@/app/BackLink';
import ListForm from './ListForm';

export const dynamic = 'force-dynamic';

export default async function ListLot() {
  const { data } = await supabase.rpc('event_summaries');
  const events = (data || []).map((e) => ({ id: e.event_id, label: `${e.title} · ${dayParts(e.starts_at).date}` }));

  return (
    <>
      <div className="backbar">
        <BackLink href="/" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="display" style={{ fontSize: 22 }}>List your lot</div>
          <div className="sub">Takes about 2 minutes</div>
        </div>
      </div>
      <ListForm events={events} />
    </>
  );
}
