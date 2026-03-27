import { prisma } from '../prisma';

export const eventLogRepo = {
  async exists(stripeEventId: string): Promise<boolean> {
    const record = await prisma.eventLog.findUnique({ where: { stripeEventId } });
    return record !== null;
  },

  async log(stripeEventId: string, type: string, payload: object) {
    return prisma.eventLog.create({
      data: { stripeEventId, type, payload },
    });
  },

  async listRecent(limit = 100) {
    return prisma.eventLog.findMany({
      orderBy: { processedAt: 'desc' },
      take: limit,
    });
  },
};