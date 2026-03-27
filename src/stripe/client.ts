import Stripe from 'stripe';
import { config } from '../config';
import { logger } from '../libs/logger';

export const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: '2024-06-20',
});

export async function withStripe<T>(fn: (s: Stripe) => Promise<T>): Promise<T> {
  try {
    return await fn(stripe);
  } catch (err: any) {
    logger.error('Stripe error', {
      type: err.type,
      code: err.code,
      message: err.message,
    });
    throw err;
  }
}