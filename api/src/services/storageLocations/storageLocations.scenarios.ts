import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.StorageLocationCreateArgs>({
  storageLocation: {
    one: {
      data: {
        block: 'String',
        item: { create: { name: 'String', category: 'String' } },
      },
    },
    two: {
      data: {
        block: 'String',
        item: { create: { name: 'String', category: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
