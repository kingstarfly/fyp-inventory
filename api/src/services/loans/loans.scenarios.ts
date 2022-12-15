import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LoanCreateArgs>({
  loan: {
    one: {
      data: {
        expectedReturnAt: '2022-09-02T15:07:58Z',
        user: {
          create: {
            email: 'String4787894',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        loanHistory: {
          create: {
            item: {
              create: { name: 'String', itemStatus: 'String', block: 'String' },
            },
          },
        },
        item: {
          create: { name: 'String', itemStatus: 'String', block: 'String' },
        },
      },
    },
    two: {
      data: {
        expectedReturnAt: '2022-09-02T15:07:58Z',
        user: {
          create: {
            email: 'String3891442',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        loanHistory: {
          create: {
            item: {
              create: { name: 'String', itemStatus: 'String', block: 'String' },
            },
          },
        },
        item: {
          create: { name: 'String', itemStatus: 'String', block: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
