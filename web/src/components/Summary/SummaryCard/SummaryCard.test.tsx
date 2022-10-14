import { render } from '@redwoodjs/testing/web'

import SummaryCard from './SummaryCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SummaryCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SummaryCard />)
    }).not.toThrow()
  })
})
