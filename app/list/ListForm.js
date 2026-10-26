'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { submitLot } from './actions';

export default function ListForm({ events }) {
  const [state, action, pending] = useActionState(submitLot, null);
  const [fit, setFit] = useState('cars');

  if (state?.ok) {
    return (
      <div className="pad stack" style={{ paddingTop: 24, gap: 16 }}>
        <h2 className="display" style={{ margin: 0, fontSize: 28 }}>Got it. Your lot is in review.</h2>
        <p className="sub" style={{ fontSize: 15, margin: 0 }}>We'll check the details and email you when it's live, usually within a day. You'll add your bank when your first spot sells.</p>
        <Link href="/" className="btn">Back to home</Link>
      </div>
    );
  }

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <input type="hidden" name="fit" value={fit} />
      <div className="pad stack" style={{ paddingTop: 12, gap: 14 }}>
        <label className="field">Lot name
          <input className="input" name="name" placeholder="e.g. Grace Church Lot" required />
        </label>
        <label className="field">Lot address
          <input className="input" name="address" placeholder="Street address, Tampa FL" autoComplete="street-address" required />
        </label>
        <div className="grid2">
          <label className="field">Spots
            <input className="input" name="spots" type="number" min="1" max="5000" inputMode="numeric" placeholder="50" required />
          </label>
          <label className="field">Price per car
            <input className="input" name="price" inputMode="decimal" placeholder="$25" required />
          </label>
        </div>
        <div className="field">What fits
          <div className="grid2">
            <button type="button" className="toggle" aria-pressed={fit === 'cars'} onClick={() => setFit('cars')}>Cars only</button>
            <button type="button" className="toggle" aria-pressed={fit === 'trucks_ok'} onClick={() => setFit('trucks_ok')}>Trucks &amp; SUVs OK</button>
          </div>
        </div>
        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend style={{ marginBottom: 6 }}>Events you'll open for</legend>
          <div className="stack" style={{ gap: 8 }}>
            {events.length === 0 && <p className="sub">No upcoming events yet.</p>}
            {events.map((e) => (
              <label key={e.id} className="check"><input type="checkbox" name="events" value={e.id} />{e.label}</label>
            ))}
          </div>
        </fieldset>
        <label className="field">How drivers get in
          <textarea className="textarea" name="instructions" placeholder="Enter on the side street. Attendant at the gate." />
        </label>
        <div className="section-label" style={{ padding: '8px 0 0' }}>Your info</div>
        <label className="field">Your name
          <input className="input" name="owner" autoComplete="name" required />
        </label>
        <div className="grid2">
          <label className="field">Email
            <input className="input" name="email" type="email" autoComplete="email" required />
          </label>
          <label className="field">Phone
            <input className="input" name="phone" type="tel" autoComplete="tel" />
          </label>
        </div>
        {state?.error && <p className="error" role="alert">{state.error}</p>}
      </div>
      <div className="grow" style={{ minHeight: 24 }} />
      <div className="footer-bar">
        <button type="submit" className="btn btn-accent" disabled={pending}>{pending ? 'Sending…' : 'Publish my lot'}</button>
        <div className="note">You keep 85% of every booking. Add your bank when your first spot sells.</div>
      </div>
    </form>
  );
}
