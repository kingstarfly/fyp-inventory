import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { email: 'String2993480', passwordHash: 'String', salt: 'String' },
    },
    two: {
      data: { email: 'String1947429', passwordHash: 'String', salt: 'String' },
    },
  },
})

export type StandardScenario = typeof standard
