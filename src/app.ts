import Fastify from 'fastify';
import { stripeWebhookHandler } from './stripe/webhooks';
import { stripeAdminRoutes } from './api/routes/stripeAdmin';
import { copilotRoutes } from './api/routes/copilot';
import { healthRoutes } from './api/routes/health';
import { errorHandler } from './api/middlewares/errorHandler';
import { startWorkers } from './jobs/queue';

export async function buildApp() {
  const app = Fastify({ logger: true });

  // Raw body capture for Stripe webhook signature verification
  app.addContentTypeParser('*', { parseAs: 'buffer' }, (req, body, done) => {
    (req as any).rawBody = body;
    done(null, body);
  });

  app.setErrorHandler(errorHandler);

  await app.register(healthRoutes);
  app.post('/webhooks/stripe', stripeWebhookHandler);
  await app.register(stripeAdminRoutes);
  await app.register(copilotRoutes);

  startWorkers();

  return app;
}