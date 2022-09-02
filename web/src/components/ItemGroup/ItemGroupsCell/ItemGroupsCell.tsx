import type { FindItemGroups } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ItemGroups from 'src/components/ItemGroup/ItemGroups'

export const QUERY = gql`
  query FindItemGroups {
    itemGroups {
      id
      name
      description
      category
      quantity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No itemGroups yet. '}
      <Link
        to={routes.newItemGroup()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ itemGroups }: CellSuccessProps<FindItemGroups>) => {
  return <ItemGroups itemGroups={itemGroups} />
}
