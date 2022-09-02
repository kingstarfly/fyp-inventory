import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LoanHistoryCreateArgs>({
  loanHistory: {
    one: {
      data: {
        item: {
          create: { name: 'String', itemStatus: 'String', block: 'String' },
        },
      },
    },
    two: {
      data: {
        item: {
          create: { name: 'String', itemStatus: 'String', block: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
