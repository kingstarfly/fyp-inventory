import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/LocationNameMapping/LocationNameMappingsCell'

const DELETE_LOCATION_NAME_MAPPING_MUTATION = gql`
  mutation DeleteLocationNameMappingMutation($id: Int!) {
    deleteLocationNameMapping(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const LocationNameMappingsList = ({ locationNameMappings }) => {
  const [deleteLocationNameMapping] = useMutation(DELETE_LOCATION_NAME_MAPPING_MUTATION, {
    onCompleted: () => {
      toast.success('LocationNameMapping deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete locationNameMapping ' + id + '?')) {
      deleteLocationNameMapping({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Location name</th>
            <th>Block</th>
            <th>Floor</th>
            <th>Room</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {locationNameMappings.map((locationNameMapping) => (
            <tr key={locationNameMapping.id}>
              <td>{truncate(locationNameMapping.id)}</td>
              <td>{truncate(locationNameMapping.locationName)}</td>
              <td>{truncate(locationNameMapping.block)}</td>
              <td>{truncate(locationNameMapping.floor)}</td>
              <td>{truncate(locationNameMapping.room)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.locationNameMapping({ id: locationNameMapping.id })}
                    title={'Show locationNameMapping ' + locationNameMapping.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editLocationNameMapping({ id: locationNameMapping.id })}
                    title={'Edit locationNameMapping ' + locationNameMapping.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete locationNameMapping ' + locationNameMapping.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(locationNameMapping.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LocationNameMappingsList
