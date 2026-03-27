import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { config } from '../config';
import { logger } from '../libs/logger';
import { retryInvoice } from '../stripe/invoices';
import { withStripe } from '../stripe/client';

const connection = new IORedis(config.redisUrl, { maxRetriesPerRequest: null });

export const invoiceRetryQueue = new Queue('invoice-retry', { connection });

export function startWorkers() {
  new Worker(
    'invoice-retry',
    async job => {
      const { invoiceId } = job.data as { invoiceId: string };
      logger.info('Processing invoice retry', { invoiceId, attempt: job.attemptsMade });
      const result = await retryInvoice(invoiceId);
      logger.info('Invoice retry result', { invoiceId, status: result.status });
    },
    {
      connection,
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    } as any
  );

  logger.info('BullMQ workers started');
}