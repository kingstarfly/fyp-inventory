import type { FindItemById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Item from 'src/components/Item/Item'

export const QUERY = gql`
  query FindItemById($id: Int!) {
    item: item(id: $id) {
      id
      name
      category
      description
      itemStatus
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Item not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ item }: CellSuccessProps<FindItemById>) => {
  return <Item item={item} />
}
