import type { FindItems, FindItemsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import InventoryTable from 'src/components/InventoryTable/InventoryTable'
import { ArrayElement } from 'src/library/ts-helpers'

export type ItemRow = ArrayElement<CellSuccessProps<FindItems>['items']>

export const QUERY = gql`
  query FindItems {
    items {
      id
      name
      block
      floor
      room
      subIndex
      itemStatus
      assetType
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

export const Failure = ({ error }: CellFailureProps<FindItemsVariables>) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ items, refetch }: CellSuccessProps<FindItems>) => {
  return <InventoryTable items={items} refetch={refetch} />
}
