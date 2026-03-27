import { withStripe } from './client';

export async function listInvoices(customerId: string, limit = 10) {
  return withStripe(async stripe =>
    stripe.invoices.list({ customer: customerId, limit })
  );
}

export async function retryInvoice(invoiceId: string) {
  return withStripe(async stripe => stripe.invoices.pay(invoiceId));
}

export async function voidInvoice(invoiceId: string) {
  return withStripe(async stripe => stripe.invoices.voidInvoice(invoiceId));
}

export async function getInvoice(invoiceId: string) {
  return withStripe(async stripe =>
    stripe.invoices.retrieve(invoiceId, { expand: ['payment_intent'] })
  );
}

export async function listOverdueInvoices(limit = 50) {
  return withStripe(async stripe =>
    stripe.invoices.list({ status: 'open', limit })
  );
}