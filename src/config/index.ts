export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),

  stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,

  dbUrl: process.env.DATABASE_URL!,
  redisUrl: process.env.REDIS_URL!,

  copilot: {
    apiKey: process.env.COPILOT_MODEL_API_KEY!,
    model: process.env.COPILOT_MODEL_NAME ?? 'gpt-4.1-mini',
  },
};