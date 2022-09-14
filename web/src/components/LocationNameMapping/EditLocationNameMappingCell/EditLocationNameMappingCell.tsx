import type { EditLocationNameMappingById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LocationNameMappingForm from 'src/components/LocationNameMapping/LocationNameMappingForm'

export const QUERY = gql`
  query EditLocationNameMappingById($id: Int!) {
    locationNameMapping: locationNameMapping(id: $id) {
      id
      locationName
      block
      floor
      room
    }
  }
`
const UPDATE_LOCATION_NAME_MAPPING_MUTATION = gql`
  mutation UpdateLocationNameMappingMutation($id: Int!, $input: UpdateLocationNameMappingInput!) {
    updateLocationNameMapping(id: $id, input: $input) {
      id
      locationName
      block
      floor
      room
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ locationNameMapping }: CellSuccessProps<EditLocationNameMappingById>) => {
  const [updateLocationNameMapping, { loading, error }] = useMutation(UPDATE_LOCATION_NAME_MAPPING_MUTATION, {
    onCompleted: () => {
      toast.success('LocationNameMapping updated')
      navigate(routes.locationNameMappings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateLocationNameMapping({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit LocationNameMapping {locationNameMapping.id}</h2>
      </header>
      <div className="rw-segment-main">
        <LocationNameMappingForm locationNameMapping={locationNameMapping} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
