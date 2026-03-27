import { retryInvoice } from '../../stripe/invoices';
import { logger } from '../../libs/logger';

export async function retryFailedInvoice({ invoiceId }: { invoiceId: string }) {
  try {
    const result = await retryInvoice(invoiceId);
    logger.info('Invoice retry succeeded', { invoiceId, status: result.status });
    return {
      invoiceId,
      status: result.status,
      amountDue: result.amount_due,
      amountPaid: result.amount_paid,
    };
  } catch (err: any) {
    logger.error('Invoice retry failed', { invoiceId, message: err.message });
    throw err;
  }
}