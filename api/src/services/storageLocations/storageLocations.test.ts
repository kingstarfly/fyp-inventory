import {
  storageLocations,
  storageLocation,
  createStorageLocation,
  updateStorageLocation,
  deleteStorageLocation,
} from './storageLocations'
import type { StandardScenario } from './storageLocations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('storageLocations', () => {
  scenario(
    'returns all storageLocations',
    async (scenario: StandardScenario) => {
      const result = await storageLocations()

      expect(result.length).toEqual(
        Object.keys(scenario.storageLocation).length
      )
    }
  )

  scenario(
    'returns a single storageLocation',
    async (scenario: StandardScenario) => {
      const result = await storageLocation({
        id: scenario.storageLocation.one.id,
      })

      expect(result).toEqual(scenario.storageLocation.one)
    }
  )

  scenario('creates a storageLocation', async (scenario: StandardScenario) => {
    const result = await createStorageLocation({
      input: { block: 'String', itemId: scenario.storageLocation.two.itemId },
    })

    expect(result.block).toEqual('String')
    expect(result.itemId).toEqual(scenario.storageLocation.two.itemId)
  })

  scenario('updates a storageLocation', async (scenario: StandardScenario) => {
    const original = await storageLocation({
      id: scenario.storageLocation.one.id,
    })
    const result = await updateStorageLocation({
      id: original.id,
      input: { block: 'String2' },
    })

    expect(result.block).toEqual('String2')
  })

  scenario('deletes a storageLocation', async (scenario: StandardScenario) => {
    const original = await deleteStorageLocation({
      id: scenario.storageLocation.one.id,
    })
    const result = await storageLocation({ id: original.id })

    expect(result).toEqual(null)
  })
})
