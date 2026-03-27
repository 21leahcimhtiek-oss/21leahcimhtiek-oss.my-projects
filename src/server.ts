import { buildApp } from './app';
import { config } from './config';
import { logger } from './libs/logger';

(async () => {
  const app = await buildApp();
  await app.listen({ port: config.port, host: '0.0.0.0' });
  logger.info(`Server running on port ${config.port}`, { env: config.env });
})();