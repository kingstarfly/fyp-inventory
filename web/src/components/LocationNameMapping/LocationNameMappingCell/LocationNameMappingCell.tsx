import type { FindLocationNameMappingById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LocationNameMapping from 'src/components/LocationNameMapping/LocationNameMapping'

export const QUERY = gql`
  query FindLocationNameMappingById($id: Int!) {
    locationNameMapping: locationNameMapping(id: $id) {
      id
      locationName
      block
      floor
      room
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>LocationNameMapping not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ locationNameMapping }: CellSuccessProps<FindLocationNameMappingById>) => {
  return <LocationNameMapping locationNameMapping={locationNameMapping} />
}
