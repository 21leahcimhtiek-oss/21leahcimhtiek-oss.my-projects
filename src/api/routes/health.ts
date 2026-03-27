import { FastifyInstance } from 'fastify';
import { prisma } from '../../db/prisma';

export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async (_req, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      reply.send({ status: 'ok', db: 'connected', ts: new Date().toISOString() });
    } catch {
      reply.code(503).send({ status: 'degraded', db: 'unreachable', ts: new Date().toISOString() });
    }
  });
}