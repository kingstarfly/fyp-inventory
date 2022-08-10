import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String6985705' } },
    two: { data: { email: 'String7208987' } },
  },
})

export type StandardScenario = typeof standard
