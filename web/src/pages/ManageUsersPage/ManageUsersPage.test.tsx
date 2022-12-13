import { render } from '@redwoodjs/testing/web'

import ManageUsersPage from './ManageUsersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ManageUsersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ManageUsersPage />)
    }).not.toThrow()
  })
})
