import { FastifyRequest, FastifyReply } from 'fastify';

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY ?? '';

export async function requireApiKey(req: FastifyRequest, reply: FastifyReply) {
  const key = req.headers['x-api-key'];
  if (!key || key !== INTERNAL_API_KEY) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
}