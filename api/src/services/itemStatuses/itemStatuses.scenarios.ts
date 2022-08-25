import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ItemStatusCreateArgs>({
  itemStatus: {
    one: {
      data: {
        status: 'String',
        item: { create: { name: 'String', category: 'String' } },
      },
    },
    two: {
      data: {
        status: 'String',
        item: { create: { name: 'String', category: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
