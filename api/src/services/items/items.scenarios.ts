import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ItemCreateArgs>({
  item: {
    one: {
      data: {
        name: 'Arduino V2',
        category: 'inventory',
        description:
          'This is version 2 of the ardunio. Mainly for use in LAB 4.',
        id: 512,
        itemStatus: {
          create: {
            id: 1,
            status: 'available',
          },
        },
        storageLocation: {
          create: {
            id: 1,
            block: 'N4',
            floorSection: 'C',
            room: '02',
            subIndex: 'a',
          },
        },
        thumbnailUrl:
          'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      },
    },
    two: {
      data: {
        name: 'Lenovo Laptop N550JR',
        category: 'asset',
        description: 'This is a Lenovo N550JR laptop',
        id: 20,
        itemStatus: {
          create: {
            id: 5,
            status: 'available',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
