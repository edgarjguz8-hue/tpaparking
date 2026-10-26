'use client';

import { useActionState, useState } from 'react';
import { reserve } from './actions';
import { moneyExact } from '@/lib/format';

export default function CheckoutForm({ lotEventId, priceCents, spotsLeft, feeCents }) {
  const [state, action, pending] = useActionState(reserve, null);
  const [cars, setCars] = useState(1);
  const max = Math.min(10, spotsLeft);
  const total = priceCents * cars + feeCents;

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <input type="hidden" name="le" value={lotEventId} />
      <div className="pad stack" style={{ paddingTop: 16, gap: 16 }}>
        <div className="grid2">
          <label className="field">License plate
            <input className="input" name="plate" placeholder="ABC 1234" autoComplete="off" required />
          </label>
          <label className="field">Cars
            <select className="select" name="cars" value={cars} onChange={(e) => setCars(parseInt(e.target.value, 10))}>
              {Array.from({ length: max }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>
        <label className="field">Phone or email for your pass
          <input className="input" name="contact" placeholder="(813) 555-0100" autoComplete="email" required />
        </label>
        <div className="card stack" style={{ gap: 8, fontSize: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Parking × {cars}</span><span>{moneyExact(priceCents * cars)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }} className="muted"><span>Service fee</span><span>{moneyExact(feeCents)}</span></div>
        </div>
        {state?.error && <p className="error" role="alert">{state.error}</p>}
      </div>
      <div className="grow" />
      <div className="footer-bar">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
          <span>Total</span><span className="display" style={{ fontSize: 20 }}>{moneyExact(total)}</span>
        </div>
        <button type="submit" className="btn btn-accent" disabled={pending}>
          {pending ? 'Reserving…' : `Reserve · ${moneyExact(total)}`}
        </button>
        <div className="note">Test mode: card, Apple Pay and Google Pay connect next. No account needed. Free cancellation up to 24 hours before.</div>
      </div>
    </form>
  );
}
