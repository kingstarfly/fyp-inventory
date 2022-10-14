import { render } from '@redwoodjs/testing/web'

import NavBarButton from './NavBarButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavBarButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavBarButton />)
    }).not.toThrow()
  })
})
