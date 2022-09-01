import {
  itemStatuses,
  itemStatus,
  createItemStatus,
  updateItemStatus,
  deleteItemStatus,
} from './itemStatuses'
import type { StandardScenario } from './itemStatuses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('itemStatuses', () => {
  scenario('returns all itemStatuses', async (scenario: StandardScenario) => {
    const result = await itemStatuses()

    expect(result.length).toEqual(Object.keys(scenario.itemStatus).length)
  })

  scenario(
    'returns a single itemStatus',
    async (scenario: StandardScenario) => {
      const result = await itemStatus({ id: scenario.itemStatus.one.id })

      expect(result).toEqual(scenario.itemStatus.one)
    }
  )

  scenario('creates a itemStatus', async (scenario: StandardScenario) => {
    const result = await createItemStatus({
      input: { status: 'String', itemId: scenario.itemStatus.two.itemId },
    })

    expect(result.status).toEqual('String')
    expect(result.itemId).toEqual(scenario.itemStatus.two.itemId)
  })

  scenario('updates a itemStatus', async (scenario: StandardScenario) => {
    const original = await itemStatus({ id: scenario.itemStatus.one.id })
    const result = await updateItemStatus({
      id: original.id,
      input: { status: 'String2' },
    })

    expect(result.status).toEqual('String2')
  })

  scenario('deletes a itemStatus', async (scenario: StandardScenario) => {
    const original = await deleteItemStatus({ id: scenario.itemStatus.one.id })
    const result = await itemStatus({ id: original.id })

    expect(result).toEqual(null)
  })
})