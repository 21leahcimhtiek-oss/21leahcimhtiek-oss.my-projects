import { FastifyRequest, FastifyReply } from 'fastify';
import { stripe } from './client';
import { config } from '../config';
import { eventBus } from './events';
import { eventLogRepo } from '../db/repositories/eventLogRepo';
import { logger } from '../libs/logger';

export async function stripeWebhookHandler(req: FastifyRequest, reply: FastifyReply) {
  const sig = req.headers['stripe-signature'] as string | undefined;
  const rawBody = (req as any).rawBody;

  if (!sig || !rawBody) {
    reply.code(400).send({ error: 'Missing signature or body' });
    return;
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, config.stripeWebhookSecret);
  } catch (err: any) {
    logger.error('Webhook signature verification failed', { message: err.message });
    reply.code(400).send({ error: 'Invalid signature' });
    return;
  }

  const alreadyProcessed = await eventLogRepo.exists(event.id);
  if (alreadyProcessed) {
    reply.code(200).send({ received: true, duplicate: true });
    return;
  }

  await eventLogRepo.log(event.id, event.type, event);
  await eventBus.handle(event);

  reply.code(200).send({ received: true });
}