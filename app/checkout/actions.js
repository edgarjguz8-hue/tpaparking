'use server';

import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export async function reserve(_prev, formData) {
  const lotEvent = String(formData.get('le') || '');
  const plate = String(formData.get('plate') || '').trim();
  const contact = String(formData.get('contact') || '').trim();
  const cars = parseInt(formData.get('cars'), 10) || 1;

  if (plate.length < 2) return { error: 'Enter your license plate.' };
  if (contact.length < 5) return { error: 'Enter a phone number or email for your pass.' };

  const { data, error } = await supabase.rpc('create_booking', {
    p_lot_event: lotEvent, p_plate: plate, p_contact: contact, p_cars: cars,
  });
  if (error || !data?.length) {
    const msg = error?.message || '';
    if (msg.includes('Not enough spots')) return { error: 'Sorry, not enough spots left in this lot.' };
    if (msg.includes('not available')) return { error: 'This lot is no longer available.' };
    return { error: 'Something went wrong. Please try again.' };
  }
  redirect(`/pass/${data[0].code}`);
}
