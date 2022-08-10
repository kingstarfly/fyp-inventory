import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ItemCreateArgs>({
  item: {
    one: { data: { name: 'String2980621' } },
    two: { data: { name: 'String5285761' } },
  },
})

export type StandardScenario = typeof standard
