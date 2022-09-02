import { loans, loan, createLoan, updateLoan, deleteLoan } from './loans'
import type { StandardScenario } from './loans.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('loans', () => {
  scenario('returns all loans', async (scenario: StandardScenario) => {
    const result = await loans()

    expect(result.length).toEqual(Object.keys(scenario.loan).length)
  })

  scenario('returns a single loan', async (scenario: StandardScenario) => {
    const result = await loan({ id: scenario.loan.one.id })

    expect(result).toEqual(scenario.loan.one)
  })

  scenario('creates a loan', async (scenario: StandardScenario) => {
    const result = await createLoan({
      input: {
        expectedReturnAt: '2022-09-02T15:07:58Z',
        userId: scenario.loan.two.userId,
        loanHistoryId: scenario.loan.two.loanHistoryId,
        itemId: scenario.loan.two.itemId,
      },
    })

    expect(result.expectedReturnAt).toEqual('2022-09-02T15:07:58Z')
    expect(result.userId).toEqual(scenario.loan.two.userId)
    expect(result.loanHistoryId).toEqual(scenario.loan.two.loanHistoryId)
    expect(result.itemId).toEqual(scenario.loan.two.itemId)
  })

  scenario('updates a loan', async (scenario: StandardScenario) => {
    const original = await loan({ id: scenario.loan.one.id })
    const result = await updateLoan({
      id: original.id,
      input: { expectedReturnAt: '2022-09-03T15:07:58Z' },
    })

    expect(result.expectedReturnAt).toEqual('2022-09-03T15:07:58Z')
  })

  scenario('deletes a loan', async (scenario: StandardScenario) => {
    const original = await deleteLoan({ id: scenario.loan.one.id })
    const result = await loan({ id: original.id })

    expect(result).toEqual(null)
  })
})
