import type { FindItems } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import InventoryTable from 'src/components/InventoryTable/InventoryTable'
import { ArrayElement } from 'src/library/ts-helpers'
// import Items from 'src/components/Item/Items'

export type ItemRow = ArrayElement<CellSuccessProps<FindItems>['items']>

export const QUERY = gql`
  query FindItems {
    items {
      id
      name
      block
      floor
      floorSection
      room
      subIndex
      itemStatus
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No items yet. '}
      <Link to={routes.newItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

// TODO: Add server side pagination for when number of items get too large and initial download is too slow.
export const Success = ({ items }: CellSuccessProps<FindItems>) => {
  // return <Items items={items} />
  return <InventoryTable items={items} />
}
