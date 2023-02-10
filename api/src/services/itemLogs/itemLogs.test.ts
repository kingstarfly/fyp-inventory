import type { ItemLog } from '@prisma/client'

import { itemLogs, itemLog, createItemLog, deleteItemLog } from './itemLogs'
import type { StandardScenario } from './itemLogs.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('itemLogs', () => {
  scenario('returns all itemLogs', async (scenario: StandardScenario) => {
    const result = await itemLogs()

    expect(result.length).toEqual(Object.keys(scenario.itemLog).length)
  })

  scenario('returns a single itemLog', async (scenario: StandardScenario) => {
    const result = await itemLog({ id: scenario.itemLog.one.id })

    expect(result).toEqual(scenario.itemLog.one)
  })

  scenario('creates a itemLog', async (scenario: StandardScenario) => {
    const result = await createItemLog({
      input: { content: 'String', itemId: scenario.itemLog.two.itemId },
    })

    expect(result.content).toEqual('String')
    expect(result.itemId).toEqual(scenario.itemLog.two.itemId)
  })

  scenario('deletes a itemLog', async (scenario: StandardScenario) => {
    const original = (await deleteItemLog({
      id: scenario.itemLog.one.id,
    })) as ItemLog
    const result = await itemLog({ id: original.id })

    expect(result).toEqual(null)
  })
})
