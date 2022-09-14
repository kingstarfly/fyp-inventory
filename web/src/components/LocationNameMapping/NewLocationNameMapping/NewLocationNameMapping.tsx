import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LocationNameMappingForm from 'src/components/LocationNameMapping/LocationNameMappingForm'

const CREATE_LOCATION_NAME_MAPPING_MUTATION = gql`
  mutation CreateLocationNameMappingMutation($input: CreateLocationNameMappingInput!) {
    createLocationNameMapping(input: $input) {
      id
    }
  }
`

const NewLocationNameMapping = () => {
  const [createLocationNameMapping, { loading, error }] = useMutation(CREATE_LOCATION_NAME_MAPPING_MUTATION, {
    onCompleted: () => {
      toast.success('LocationNameMapping created')
      navigate(routes.locationNameMappings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createLocationNameMapping({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New LocationNameMapping</h2>
      </header>
      <div className="rw-segment-main">
        <LocationNameMappingForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewLocationNameMapping
