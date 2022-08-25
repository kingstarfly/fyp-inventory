import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ItemCreateArgs>({
  item: {
    one: { data: { name: 'String', category: 'String' } },
    two: { data: { name: 'String', category: 'String' } },
  },
})

export type StandardScenario = typeof standard
