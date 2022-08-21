import { items, item, createItem, updateItem, deleteItem } from './items'
import type { StandardScenario } from './items.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('items', () => {
  scenario('returns all items', async (scenario: StandardScenario) => {
    const result = await items()

    expect(result.length).toEqual(Object.keys(scenario.item).length)
  })

  scenario('returns a single item', async (scenario: StandardScenario) => {
    const result = await item({ id: scenario.item.one.id })

    expect(result).toEqual(scenario.item.one)
  })

  scenario('creates a item', async () => {
    const result = await createItem({
      input: { name: 'String7319330' },
    })

    expect(result.name).toEqual('String7319330')
  })

  scenario('updates a item', async (scenario: StandardScenario) => {
    const original = await item({ id: scenario.item.one.id })
    const result = await updateItem({
      id: original.id,
      input: { name: 'String95062792' },
    })

    expect(result.name).toEqual('String95062792')
  })

  scenario('deletes a item', async (scenario: StandardScenario) => {
    const original = await deleteItem({ id: scenario.item.one.id })
    const result = await item({ id: original.id })

    expect(result).toEqual(null)
  })
})