import { withStripe } from './client';

export async function createSubscription(params: {
  customerId: string;
  priceId: string;
  trialDays?: number;
}) {
  return withStripe(async stripe =>
    stripe.subscriptions.create({
      customer: params.customerId,
      items: [{ price: params.priceId }],
      trial_period_days: params.trialDays,
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    })
  );
}

export async function cancelSubscription(subscriptionId: string, immediately = false) {
  return withStripe(async stripe => {
    if (immediately) return stripe.subscriptions.cancel(subscriptionId);
    return stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
  });
}

export async function listActiveSubscriptions(customerId: string) {
  return withStripe(async stripe =>
    stripe.subscriptions.list({ customer: customerId, status: 'active', limit: 10 })
  );
}

export async function updateSubscriptionPrice(subscriptionId: string, newPriceId: string) {
  return withStripe(async stripe => {
    const sub = await stripe.subscriptions.retrieve(subscriptionId);
    return stripe.subscriptions.update(subscriptionId, {
      items: [{ id: sub.items.data[0].id, price: newPriceId }],
      proration_behavior: 'create_prorations',
    });
  });
}