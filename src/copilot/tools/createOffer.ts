import { createProductWithPrice } from '../../stripe/products';

export async function createLimitedTimeOffer(input: {
  name: string;
  description?: string;
  currency: string;
  unitAmount: number;
  interval?: 'month' | 'year';
}) {
  const { product, price } = await createProductWithPrice(input);
  return {
    productId: product.id,
    priceId: price.id,
    checkoutUrlHint: `Use priceId ${price.id} in your Stripe Checkout session.`,
    stripeProductUrl: `https://dashboard.stripe.com/products/${product.id}`,
  };
}