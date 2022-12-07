import { render } from '@redwoodjs/testing/web'

import PrintLabelsPage from './PrintLabelsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PrintLabelsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PrintLabelsPage />)
    }).not.toThrow()
  })
})
