import { FastifyInstance } from 'fastify';
import { requireApiKey } from '../middlewares/auth';
import { createProductWithPrice, listProducts, archiveProduct } from '../../stripe/products';
import { listOverdueInvoices, retryInvoice } from '../../stripe/invoices';
import { listPayouts } from '../../stripe/payouts';
import { eventLogRepo } from '../../db/repositories/eventLogRepo';

export async function stripeAdminRoutes(app: FastifyInstance) {
  app.addHook('preHandler', requireApiKey);

  app.post('/admin/stripe/products', async (req, reply) => {
    const body = req.body as {
      name: string;
      description?: string;
      currency: string;
      unitAmount: number;
      interval?: 'month' | 'year';
    };
    const result = await createProductWithPrice(body);
    reply.send(result);
  });

  app.get('/admin/stripe/products', async (_req, reply) => {
    const result = await listProducts();
    reply.send(result);
  });

  app.delete('/admin/stripe/products/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    const result = await archiveProduct(id);
    reply.send(result);
  });

  app.get('/admin/stripe/invoices/overdue', async (_req, reply) => {
    const result = await listOverdueInvoices();
    reply.send(result);
  });

  app.post('/admin/stripe/invoices/:id/retry', async (req, reply) => {
    const { id } = req.params as { id: string };
    const result = await retryInvoice(id);
    reply.send(result);
  });

  app.get('/admin/stripe/payouts', async (_req, reply) => {
    const result = await listPayouts();
    reply.send(result);
  });

  app.get('/admin/stripe/events', async (_req, reply) => {
    const result = await eventLogRepo.listRecent();
    reply.send(result);
  });
}