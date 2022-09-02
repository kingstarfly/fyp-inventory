import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ItemCreateArgs>({
  item: {
    one: { data: { name: 'String', itemStatus: 'String', block: 'String' } },
    two: { data: { name: 'String', itemStatus: 'String', block: 'String' } },
  },
})

export type StandardScenario = typeof standard
