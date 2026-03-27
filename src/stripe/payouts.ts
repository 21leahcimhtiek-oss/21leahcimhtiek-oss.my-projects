import { withStripe } from './client';

export async function listPayouts(limit = 10) {
  return withStripe(async stripe => stripe.payouts.list({ limit }));
}

export async function getPayout(payoutId: string) {
  return withStripe(async stripe => stripe.payouts.retrieve(payoutId));
}

export async function createPayout(amount: number, currency: string) {
  return withStripe(async stripe =>
    stripe.payouts.create({ amount, currency, method: 'standard' })
  );
}