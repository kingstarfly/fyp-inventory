import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LocationCreateArgs>({
  location: {
    one: {
      data: {
        locationName: 'String',
        block: 'String',
        floor: 'String',
        room: 'String',
      },
    },
    two: {
      data: {
        locationName: 'String',
        block: 'String',
        floor: 'String',
        room: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
