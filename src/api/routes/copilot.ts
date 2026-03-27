import { FastifyInstance } from 'fastify';
import { requireApiKey } from '../middlewares/auth';
import { copilotQuery } from '../../copilot/engine';

export async function copilotRoutes(app: FastifyInstance) {
  app.addHook('preHandler', requireApiKey);

  app.post('/copilot/query', async (req, reply) => {
    const body = req.body as {
      userMessage: string;
      toolCall?: { name: any; args: any };
    };
    const result = await copilotQuery(body);
    reply.send(result);
  });
}