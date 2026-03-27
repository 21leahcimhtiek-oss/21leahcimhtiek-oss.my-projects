import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { config } from '../../config';
import { retryInvoice } from '../../stripe/invoices';
import { logger } from '../../libs/logger';

const connection = new IORedis(config.redisUrl, { maxRetriesPerRequest: null });

export const invoiceRetryWorker = new Worker(
  'invoice-retry',
  async job => {
    const { invoiceId } = job.data as { invoiceId: string };
    logger.info('invoiceRetryWorker: processing', { invoiceId });
    const invoice = await retryInvoice(invoiceId);
    logger.info('invoiceRetryWorker: done', { invoiceId, status: invoice.status });
    return { invoiceId, status: invoice.status };
  },
  {
    connection,
    concurrency: 5,
  }
);

invoiceRetryWorker.on('failed', (job, err) => {
  logger.error('invoiceRetryWorker: job failed', { jobId: job?.id, message: err.message });
});