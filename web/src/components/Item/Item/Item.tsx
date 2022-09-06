import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Item as ItemType } from 'types/graphql'
import { getLocationString } from 'src/components/InventoryTable/helper'
import { Image } from '@mantine/core'
import { useMemo } from 'react'

// TODO: Modify this file to adhere to new prisma schema.
// TODO: Edit functionality
// TODO: Delete functionality

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
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

const Item = ({ item }: { item: ItemType }) => {
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item deleted')
      navigate(routes.items())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete item ' + id + '?')) {
      deleteItem({ variables: { id } })
    }
  }

  // Decode base64 string from item.imageBlobBase64 and return as a data URL

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Item {item.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{item.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{item.name}</td>
            </tr>
            <tr>
              <th>Item Status</th>
              <td>{item.itemStatus}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{item.category}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{getLocationString(item)}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{item.description || 'N.A'}</td>
            </tr>
            <tr>
              <th>Image</th>
              <td>
                {item.imageBlobBase64 ? (
                  <Image
                    width="20vw"
                    src={item.imageBlobBase64}
                    alt={item.name}
                  />
                ) : (
                  'N.A'
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editItem({ id: item.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(item.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Item
