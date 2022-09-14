import type { FindLocationNameMappings } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LocationNameMappings from 'src/components/LocationNameMapping/LocationNameMappings'

export const QUERY = gql`
  query FindLocationNameMappings {
    locationNameMappings {
      id
      locationName
      block
      floor
      room
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No locationNameMappings yet. '}
      <Link
        to={routes.newLocationNameMapping()}
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

export const Success = ({ locationNameMappings }: CellSuccessProps<FindLocationNameMappings>) => {
  return <LocationNameMappings locationNameMappings={locationNameMappings} />
}
