import type { FindItemLogs } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ItemLogs from 'src/components/ItemLog/ItemLogs'

// The graph ql query should read in a itemId
export const QUERY = gql`
  query FindItemLogs($itemId: Int!) {
    itemLogs: itemLogs(itemId: $itemId) {
      id
      content
      createdAt
      itemId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <p className="text-base">No logs recorded yet!</p>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ itemLogs }: CellSuccessProps<FindItemLogs>) => {
  return <ItemLogs itemLogs={itemLogs} />
}
