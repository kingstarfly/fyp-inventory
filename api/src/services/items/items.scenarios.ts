import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ItemCreateArgs>({
  item: {
    one: {
      data: {
        name: 'String',
        itemStatus: 'String',
        assetType: 'String',
        block: 'String',
        floor: 'String',
        room: 'String',
      },
    },
    two: {
      data: {
        name: 'String',
        itemStatus: 'String',
        assetType: 'String',
        block: 'String',
        floor: 'String',
        room: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
