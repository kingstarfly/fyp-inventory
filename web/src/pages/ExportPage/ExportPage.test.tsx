import { render } from '@redwoodjs/testing/web'

import ExportPage from './ExportPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ExportPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExportPage />)
    }).not.toThrow()
  })
})
