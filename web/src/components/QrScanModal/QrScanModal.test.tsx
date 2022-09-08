import { render } from '@redwoodjs/testing/web'

import QrScanModal from './QrScanModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('QrScanModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<QrScanModal />)
    }).not.toThrow()
  })
})
