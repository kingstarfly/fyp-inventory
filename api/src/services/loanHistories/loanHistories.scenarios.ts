import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LoanHistoryCreateArgs>({
  loanHistory: {
    one: { data: { loanId: 8637359 } },
    two: { data: { loanId: 7583962 } },
  },
})

export type StandardScenario = typeof standard
