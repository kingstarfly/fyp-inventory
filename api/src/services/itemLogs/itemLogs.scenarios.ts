import type { Prisma, ItemLog } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ItemLogCreateArgs>({
  itemLog: {
    one: {
      data: {
        content: 'String',
        item: {
          create: {
            name: 'String',
            itemStatus: 'String',
            assetType: 'String',
            block: 'String',
            floor: 'String',
            room: 'String',
            updatedAt: '2023-02-10T12:31:08.826Z',
          },
        },
      },
    },
    two: {
      data: {
        content: 'String',
        item: {
          create: {
            name: 'String',
            itemStatus: 'String',
            assetType: 'String',
            block: 'String',
            floor: 'String',
            room: 'String',
            updatedAt: '2023-02-10T12:31:08.826Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ItemLog, 'itemLog'>
