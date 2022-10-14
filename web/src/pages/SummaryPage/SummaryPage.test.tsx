import { render } from '@redwoodjs/testing/web'

import SummaryPage from './SummaryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SummaryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SummaryPage />)
    }).not.toThrow()
  })
})
