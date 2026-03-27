import { withStripe } from './client';

export async function findOrCreateCustomerByEmail(
  email: string,
  metadata?: Record<string, string>
) {
  return withStripe(async stripe => {
    const existing = await stripe.customers.list({ email, limit: 1 });
    if (existing.data[0]) return existing.data[0];
    return stripe.customers.create({ email, metadata });
  });
}

export async function getCustomer(customerId: string) {
  return withStripe(async stripe => stripe.customers.retrieve(customerId));
}

export async function updateCustomerMetadata(
  customerId: string,
  metadata: Record<string, string>
) {
  return withStripe(async stripe => stripe.customers.update(customerId, { metadata }));
}

export async function deleteCustomer(customerId: string) {
  return withStripe(async stripe => stripe.customers.del(customerId));
}