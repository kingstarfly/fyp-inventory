import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LoanCreateArgs>({
  loan: {
    one: {
      data: {
        expectedReturnAt: '2022-08-25T07:37:20Z',
        user: {
          create: {
            email: 'String8374996',
            passwordHash: 'String',
            salt: 'String',
          },
        },
        loanHistory: { create: { loanId: 1305429 } },
        itemStatus: {
          create: {
            status: 'String',
            item: { create: { name: 'String', category: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        expectedReturnAt: '2022-08-25T07:37:20Z',
        user: {
          create: {
            email: 'String7270410',
            passwordHash: 'String',
            salt: 'String',
          },
        },
        loanHistory: { create: { loanId: 9337663 } },
        itemStatus: {
          create: {
            status: 'String',
            item: { create: { name: 'String', category: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
