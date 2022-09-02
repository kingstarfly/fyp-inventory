import type { FindItemGroupById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ItemGroup from 'src/components/ItemGroup/ItemGroup'

export const QUERY = gql`
  query FindItemGroupById($id: Int!) {
    itemGroup: itemGroup(id: $id) {
      id
      name
      description
      category
      quantity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ItemGroup not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ itemGroup }: CellSuccessProps<FindItemGroupById>) => {
  return <ItemGroup itemGroup={itemGroup} />
}
