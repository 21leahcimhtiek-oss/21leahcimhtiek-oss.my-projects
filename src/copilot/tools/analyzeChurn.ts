import { withStripe } from '../../stripe/client';

export async function analyzeChurn({ days = 30 }: { days?: number }) {
  return withStripe(async stripe => {
    const since = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

    const cancelled = await stripe.subscriptions.list({
      status: 'canceled',
      limit: 100,
    });

    const recentCancellations = cancelled.data.filter(
      s => (s.canceled_at ?? 0) >= since
    );

    const created = await stripe.subscriptions.list({
      created: { gte: since },
      limit: 100,
    });

    const churnRate =
      created.data.length > 0
        ? ((recentCancellations.length / created.data.length) * 100).toFixed(2)
        : 'N/A';

    return {
      periodDays: days,
      newSubscriptions: created.data.length,
      cancellations: recentCancellations.length,
      churnRate: `${churnRate}%`,
    };
  });
}