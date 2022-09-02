import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ItemGroupCreateArgs>({
  itemGroup: {
    one: {
      data: {
        name: 'String',
        description: 'String',
        category: 'String',
        quantity: 443081,
      },
    },
    two: {
      data: {
        name: 'String',
        description: 'String',
        category: 'String',
        quantity: 1829711,
      },
    },
  },
})

export type StandardScenario = typeof standard
