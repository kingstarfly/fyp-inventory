import { render } from '@redwoodjs/testing/web'

import InventoryRowItemDetails from './InventoryRowItemDetails'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InventoryRowItemDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InventoryRowItemDetails />)
    }).not.toThrow()
  })
})
