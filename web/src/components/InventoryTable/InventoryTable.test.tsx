import { render } from '@redwoodjs/testing/web'

import InventoryTable from './InventoryTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InventoryTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InventoryTable />)
    }).not.toThrow()
  })
})
