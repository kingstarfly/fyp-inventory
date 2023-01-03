import {
  items,
  item,
  createManyItems,
  deleteItems,
  updateItem,
  deleteItem,
} from './items'
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

  scenario(
    'returns a single item via non-legacy ID',
    async (scenario: StandardScenario) => {
      const result = await item({ id: scenario.item.one.id.toString() })

      expect(result).toEqual(scenario.item.one)
    }
  )

  scenario(
    'returns a single item via legacy ID',
    async (scenario: StandardScenario) => {
      const result = await item({
        id: scenario.item.one.legacyId,
      })

      expect(result).toEqual(scenario.item.one)
    }
  )

  scenario('creates a item', async () => {
    const result = await createManyItems({
      quantity: 1,
      input: {
        name: 'String',
        legacyId: '*12345-3*',
        imageBlobBase64: 'String',
        remarks: 'String',
        itemStatus: 'String',
        assetType: 'String',
        block: 'String',
        floor: 'String',
        room: 'String',
        subIndex: 'String',
      },
    })

    expect(result.length).toEqual(1)
  })

  scenario('creates 5 items', async () => {
    const result = await createManyItems({
      quantity: 5,
      input: {
        name: 'String',
        imageBlobBase64: 'String',
        remarks: 'String',
        itemStatus: 'String',
        assetType: 'String',
        block: 'String',
        floor: 'String',
        room: 'String',
        subIndex: 'String',
      },
    })

    expect(result.length).toEqual(5)
  })

  scenario('updates an item', async (scenario: StandardScenario) => {
    const original = await item({ id: scenario.item.one.id.toString() })
    const result = await updateItem({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a item', async (scenario: StandardScenario) => {
    const original = await deleteItem({ id: scenario.item.one.id })
    const result = await item({ id: original.id.toString() })

    expect(result).toEqual(null)
  })

  scenario('deletes many items', async (scenario: StandardScenario) => {
    const result = await deleteItems({
      ids: [scenario.item.one.id, scenario.item.two.id],
    })

    expect(result.length).toEqual(2)
  })
})
