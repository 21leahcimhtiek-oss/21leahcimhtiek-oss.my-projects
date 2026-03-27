import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../../libs/logger';

export function errorHandler(
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
) {
  logger.error('Unhandled request error', {
    method: req.method,
    url: req.url,
    message: error.message,
    stack: error.stack,
  });

  const statusCode = error.statusCode ?? 500;
  reply.code(statusCode).send({
    error: statusCode === 500 ? 'Internal Server Error' : error.message,
  });
}