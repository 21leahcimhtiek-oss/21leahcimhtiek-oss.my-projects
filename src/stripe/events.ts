import Stripe from 'stripe';
import { invoiceRetryQueue } from '../jobs/queue';
import { logger } from '../libs/logger';

export const eventBus = {
  async handle(event: Stripe.Event) {
    switch (event.type) {
      case 'invoice.payment_failed':
        await invoiceRetryQueue.add('retry', {
          invoiceId: (event.data.object as Stripe.Invoice).id,
        });
        logger.info('Queued invoice retry', { invoiceId: (event.data.object as Stripe.Invoice).id });
        break;

      case 'customer.subscription.created':
        logger.info('Subscription created', { id: (event.data.object as Stripe.Subscription).id });
        break;

      case 'customer.subscription.deleted':
        logger.info('Subscription cancelled', { id: (event.data.object as Stripe.Subscription).id });
        break;

      case 'charge.refunded':
        logger.info('Charge refunded', { id: (event.data.object as Stripe.Charge).id });
        break;

      case 'invoice.payment_succeeded':
        logger.info('Invoice paid', { id: (event.data.object as Stripe.Invoice).id });
        break;

      default:
        logger.info('Unhandled Stripe event', { type: event.type });
        break;
    }
  },
};