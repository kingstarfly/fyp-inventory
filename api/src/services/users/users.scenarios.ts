import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { email: 'String6160376', passwordHash: 'String', salt: 'String' },
    },
    two: {
      data: { email: 'String464141', passwordHash: 'String', salt: 'String' },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
