'use server';

import { supabase } from '@/lib/supabase';

export async function submitLot(_prev, formData) {
  const get = (k) => String(formData.get(k) || '').trim();
  const spots = parseInt(get('spots'), 10);
  const price = Math.round(parseFloat(get('price').replace(/[^0-9.]/g, '')) * 100);
  const events = formData.getAll('events').map(String);
  const email = get('email');

  if (!get('name') || !get('address')) return { error: 'Add your lot name and address.' };
  if (!spots || spots < 1) return { error: 'Enter how many cars fit.' };
  if (!price || price < 100) return { error: 'Enter a price per car of at least $1.' };
  if (events.length === 0) return { error: 'Pick at least one event.' };
  if (!get('owner') || !/^\S+@\S+\.\S+$/.test(email)) return { error: 'Add your name and a valid email.' };

  const { error } = await supabase.rpc('submit_lot', {
    p_owner_name: get('owner'), p_owner_email: email, p_owner_phone: get('phone'),
    p_name: get('name'), p_address: get('address'), p_spots: spots,
    p_fit: get('fit') === 'trucks_ok' ? 'trucks_ok' : 'cars', p_instructions: get('instructions'),
    p_price_cents: price, p_event_ids: events,
  });
  if (error) return { error: 'Something went wrong. Please check your details and try again.' };
  return { ok: true };
}
