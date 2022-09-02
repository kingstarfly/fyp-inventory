import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ItemGroup/ItemGroupsCell'

const DELETE_ITEM_GROUP_MUTATION = gql`
  mutation DeleteItemGroupMutation($id: Int!) {
    deleteItemGroup(id: $id) {
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

const ItemGroupsList = ({ itemGroups }) => {
  const [deleteItemGroup] = useMutation(DELETE_ITEM_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('ItemGroup deleted')
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
    if (confirm('Are you sure you want to delete itemGroup ' + id + '?')) {
      deleteItemGroup({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {itemGroups.map((itemGroup) => (
            <tr key={itemGroup.id}>
              <td>{truncate(itemGroup.id)}</td>
              <td>{truncate(itemGroup.name)}</td>
              <td>{truncate(itemGroup.description)}</td>
              <td>{truncate(itemGroup.category)}</td>
              <td>{truncate(itemGroup.quantity)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.itemGroup({ id: itemGroup.id })}
                    title={'Show itemGroup ' + itemGroup.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editItemGroup({ id: itemGroup.id })}
                    title={'Edit itemGroup ' + itemGroup.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete itemGroup ' + itemGroup.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(itemGroup.id)}
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

export default ItemGroupsList
