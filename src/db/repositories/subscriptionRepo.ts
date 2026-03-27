import { prisma } from '../prisma';

export const subscriptionRepo = {
  async upsert(data: {
    stripeId: string;
    customerId: string;
    status: string;
    priceId: string;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  }) {
    return prisma.subscription.upsert({
      where: { stripeId: data.stripeId },
      update: {
        status: data.status,
        priceId: data.priceId,
        currentPeriodEnd: data.currentPeriodEnd,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd,
      },
      create: data,
    });
  },

  async findByStripeId(stripeId: string) {
    return prisma.subscription.findUnique({ where: { stripeId } });
  },

  async listByCustomer(customerId: string) {
    return prisma.subscription.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async listActive() {
    return prisma.subscription.findMany({
      where: { status: 'active' },
      orderBy: { currentPeriodEnd: 'asc' },
    });
  },
};