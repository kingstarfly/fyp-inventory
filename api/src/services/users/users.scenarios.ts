import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String6160376',
        hashedPassword: 'String',
        salt: 'String',
        roles: 'L1',
      },
    },
    two: {
      data: {
        email: 'String464141',
        hashedPassword: 'String',
        salt: 'String',
        roles: 'L2',
      },
    },
    three: {
      data: {
        email: 'String591230',
        hashedPassword: 'String',
        salt: 'String',
        roles: 'L3',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
