import {
  itemGroups,
  itemGroup,
  createItemGroup,
  updateItemGroup,
  deleteItemGroup,
} from './itemGroups'
import type { StandardScenario } from './itemGroups.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('itemGroups', () => {
  scenario('returns all itemGroups', async (scenario: StandardScenario) => {
    const result = await itemGroups()

    expect(result.length).toEqual(Object.keys(scenario.itemGroup).length)
  })

  scenario('returns a single itemGroup', async (scenario: StandardScenario) => {
    const result = await itemGroup({ id: scenario.itemGroup.one.id })

    expect(result).toEqual(scenario.itemGroup.one)
  })

  scenario('creates a itemGroup', async () => {
    const result = await createItemGroup({
      input: {
        name: 'String',
        description: 'String',
        category: 'String',
        quantity: 1423773,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.category).toEqual('String')
    expect(result.quantity).toEqual(1423773)
  })

  scenario('updates a itemGroup', async (scenario: StandardScenario) => {
    const original = await itemGroup({ id: scenario.itemGroup.one.id })
    const result = await updateItemGroup({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a itemGroup', async (scenario: StandardScenario) => {
    const original = await deleteItemGroup({ id: scenario.itemGroup.one.id })
    const result = await itemGroup({ id: original.id })

    expect(result).toEqual(null)
  })
})
