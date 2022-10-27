import { render } from '@redwoodjs/testing/web'

import SummaryTable from './SummaryTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InventoryTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SummaryTable />)
    }).not.toThrow()
  })
})
