import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_LOCATION_NAME_MAPPING_MUTATION = gql`
  mutation DeleteLocationNameMappingMutation($id: Int!) {
    deleteLocationNameMapping(id: $id) {
      id
    }
  }
`

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

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const LocationNameMapping = ({ locationNameMapping }) => {
  const [deleteLocationNameMapping] = useMutation(DELETE_LOCATION_NAME_MAPPING_MUTATION, {
    onCompleted: () => {
      toast.success('LocationNameMapping deleted')
      navigate(routes.locationNameMappings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete locationNameMapping ' + id + '?')) {
      deleteLocationNameMapping({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">LocationNameMapping {locationNameMapping.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{locationNameMapping.id}</td>
            </tr><tr>
              <th>Location name</th>
              <td>{locationNameMapping.locationName}</td>
            </tr><tr>
              <th>Block</th>
              <td>{locationNameMapping.block}</td>
            </tr><tr>
              <th>Floor</th>
              <td>{locationNameMapping.floor}</td>
            </tr><tr>
              <th>Room</th>
              <td>{locationNameMapping.room}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editLocationNameMapping({ id: locationNameMapping.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(locationNameMapping.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default LocationNameMapping
