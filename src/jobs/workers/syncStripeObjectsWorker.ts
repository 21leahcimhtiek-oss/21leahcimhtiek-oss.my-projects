import { Worker, Queue } from 'bullmq';
import IORedis from 'ioredis';
import { config } from '../../config';
import { withStripe } from '../../stripe/client';
import { customerRepo } from '../../db/repositories/customerRepo';
import { subscriptionRepo } from '../../db/repositories/subscriptionRepo';
import { logger } from '../../libs/logger';

const connection = new IORedis(config.redisUrl, { maxRetriesPerRequest: null });

export const syncStripeObjectsQueue = new Queue('sync-stripe-objects', { connection });

export const syncStripeObjectsWorker = new Worker(
  'sync-stripe-objects',
  async job => {
    logger.info('syncStripeObjectsWorker: starting full sync');

    await withStripe(async stripe => {
      // Sync customers
      const customers = await stripe.customers.list({ limit: 100 });
      for (const c of customers.data) {
        if (c.email) {
          await customerRepo.upsert(c.id, c.email, c.metadata as Record<string, any>);
        }
      }
      logger.info('syncStripeObjectsWorker: customers synced', { count: customers.data.length });

      // Sync active subscriptions
      const subs = await stripe.subscriptions.list({ status: 'active', limit: 100 });
      for (const s of subs.data) {
        const customer = await customerRepo.findByStripeId(s.customer as string);
        if (customer) {
          await subscriptionRepo.upsert({
            stripeId: s.id,
            customerId: customer.id,
            status: s.status,
            priceId: s.items.data[0]?.price?.id ?? '',
            currentPeriodEnd: new Date(s.current_period_end * 1000),
            cancelAtPeriodEnd: s.cancel_at_period_end,
          });
        }
      }
      logger.info('syncStripeObjectsWorker: subscriptions synced', { count: subs.data.length });
    });
  },
  { connection, concurrency: 1 }
);

syncStripeObjectsWorker.on('failed', (job, err) => {
  logger.error('syncStripeObjectsWorker: job failed', { jobId: job?.id, message: err.message });
});