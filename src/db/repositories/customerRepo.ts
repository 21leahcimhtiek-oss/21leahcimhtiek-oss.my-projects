import { prisma } from '../prisma';

export const customerRepo = {
  async upsert(stripeId: string, email: string, metadata?: Record<string, any>) {
    return prisma.customer.upsert({
      where: { stripeId },
      update: { email, metadata },
      create: { stripeId, email, metadata },
    });
  },

  async findByStripeId(stripeId: string) {
    return prisma.customer.findUnique({ where: { stripeId } });
  },

  async findByEmail(email: string) {
    return prisma.customer.findUnique({ where: { email } });
  },

  async list(limit = 50) {
    return prisma.customer.findMany({ take: limit, orderBy: { createdAt: 'desc' } });
  },
};