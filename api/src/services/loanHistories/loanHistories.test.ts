import {
  loanHistories,
  loanHistory,
  createLoanHistory,
  updateLoanHistory,
  deleteLoanHistory,
} from './loanHistories'
import type { StandardScenario } from './loanHistories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('loanHistories', () => {
  scenario('returns all loanHistories', async (scenario: StandardScenario) => {
    const result = await loanHistories()

    expect(result.length).toEqual(Object.keys(scenario.loanHistory).length)
  })

  scenario(
    'returns a single loanHistory',
    async (scenario: StandardScenario) => {
      const result = await loanHistory({ id: scenario.loanHistory.one.id })

      expect(result).toEqual(scenario.loanHistory.one)
    }
  )

  scenario('creates a loanHistory', async () => {
    const result = await createLoanHistory({
      input: { loanId: 5333521 },
    })

    expect(result.loanId).toEqual(5333521)
  })

  scenario('updates a loanHistory', async (scenario: StandardScenario) => {
    const original = await loanHistory({ id: scenario.loanHistory.one.id })
    const result = await updateLoanHistory({
      id: original.id,
      input: { loanId: 2106217 },
    })

    expect(result.loanId).toEqual(2106217)
  })

  scenario('deletes a loanHistory', async (scenario: StandardScenario) => {
    const original = await deleteLoanHistory({
      id: scenario.loanHistory.one.id,
    })
    const result = await loanHistory({ id: original.id })

    expect(result).toEqual(null)
  })
})
