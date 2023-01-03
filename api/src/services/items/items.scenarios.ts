import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ItemCreateArgs>({
  item: {
    one: {
      data: {
        id: 1,
        name: 'String',
        legacyId: '*12345-1*',
        itemStatus: 'String',
        assetType: 'String',
        block: 'String',
        floor: 'String',
        room: 'String',
        subIndex: 'String',
        remarks: 'String',
        createdAt: '2021-05-01T00:00:00.000Z',
        updatedAt: '2021-05-01T00:00:00.000Z',
        imageBlobBase64: 'String',
      },
    },
    two: {
      data: {
        id: 2,
        name: 'String',
        legacyId: '*12345-2*',
        itemStatus: 'String',
        assetType: 'String',
        block: 'String',
        floor: 'String',
        room: 'String',
        subIndex: 'String',
        remarks: 'String',
        createdAt: '2021-05-01T00:00:00.000Z',
        updatedAt: '2021-05-01T00:00:00.000Z',
        imageBlobBase64: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
