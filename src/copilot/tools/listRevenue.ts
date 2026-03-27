import { withStripe } from '../../stripe/client';

export async function listMonthlyRevenue({ months = 3 }: { months?: number }) {
  return withStripe(async stripe => {
    const now = Math.floor(Date.now() / 1000);
    const from = now - months * 30 * 24 * 60 * 60;

    const charges = await stripe.charges.list({
      created: { gte: from, lte: now },
      limit: 100,
    });

    const total = charges.data
      .filter(c => c.paid && !c.refunded)
      .reduce((sum, c) => sum + (c.amount_captured ?? 0), 0);

    return {
      months,
      totalCents: total,
      totalFormatted: `$${(total / 100).toFixed(2)}`,
      currency: charges.data[0]?.currency ?? 'usd',
      chargeCount: charges.data.length,
    };
  });
}