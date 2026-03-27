import { withStripe } from './client';

export async function createProductWithPrice(input: {
  name: string;
  description?: string;
  currency: string;
  unitAmount: number;
  interval?: 'month' | 'year';
}) {
  return withStripe(async stripe => {
    const product = await stripe.products.create({
      name: input.name,
      description: input.description,
    });

    const price = await stripe.prices.create({
      product: product.id,
      currency: input.currency,
      unit_amount: input.unitAmount,
      recurring: input.interval ? { interval: input.interval } : undefined,
    });

    return { product, price };
  });
}

export async function listProducts(limit = 20) {
  return withStripe(async stripe => stripe.products.list({ limit, active: true }));
}

export async function archiveProduct(productId: string) {
  return withStripe(async stripe => stripe.products.update(productId, { active: false }));
}