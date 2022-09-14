import {
  locationNameMappings,
  locationNameMapping,
  createLocationNameMapping,
  updateLocationNameMapping,
  deleteLocationNameMapping,
} from './locationNameMappings'
import type { StandardScenario } from './locationNameMappings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('locationNameMappings', () => {
  scenario(
    'returns all locationNameMappings',
    async (scenario: StandardScenario) => {
      const result = await locationNameMappings()

      expect(result.length).toEqual(
        Object.keys(scenario.locationNameMapping).length
      )
    }
  )

  scenario(
    'returns a single locationNameMapping',
    async (scenario: StandardScenario) => {
      const result = await locationNameMapping({
        id: scenario.locationNameMapping.one.id,
      })

      expect(result).toEqual(scenario.locationNameMapping.one)
    }
  )

  scenario('creates a locationNameMapping', async () => {
    const result = await createLocationNameMapping({
      input: {
        locationName: 'String',
        block: 'String',
        floor: 'String',
        room: 'String',
      },
    })

    expect(result.locationName).toEqual('String')
    expect(result.block).toEqual('String')
    expect(result.floor).toEqual('String')
    expect(result.room).toEqual('String')
  })

  scenario(
    'updates a locationNameMapping',
    async (scenario: StandardScenario) => {
      const original = await locationNameMapping({
        id: scenario.locationNameMapping.one.id,
      })
      const result = await updateLocationNameMapping({
        id: original.id,
        input: { locationName: 'String2' },
      })

      expect(result.locationName).toEqual('String2')
    }
  )

  scenario(
    'deletes a locationNameMapping',
    async (scenario: StandardScenario) => {
      const original = await deleteLocationNameMapping({
        id: scenario.locationNameMapping.one.id,
      })
      const result = await locationNameMapping({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
