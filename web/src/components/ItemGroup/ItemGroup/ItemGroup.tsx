import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_ITEM_GROUP_MUTATION = gql`
  mutation DeleteItemGroupMutation($id: Int!) {
    deleteItemGroup(id: $id) {
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

const ItemGroup = ({ itemGroup }) => {
  const [deleteItemGroup] = useMutation(DELETE_ITEM_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('ItemGroup deleted')
      navigate(routes.itemGroups())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete itemGroup ' + id + '?')) {
      deleteItemGroup({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">ItemGroup {itemGroup.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{itemGroup.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{itemGroup.name}</td>
            </tr><tr>
              <th>Description</th>
              <td>{itemGroup.description}</td>
            </tr><tr>
              <th>Category</th>
              <td>{itemGroup.category}</td>
            </tr><tr>
              <th>Quantity</th>
              <td>{itemGroup.quantity}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editItemGroup({ id: itemGroup.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(itemGroup.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ItemGroup
