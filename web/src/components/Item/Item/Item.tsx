import { Image } from '@mantine/core'
import humanize from 'humanize-string'
import { FindItemById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { getLocationString } from 'src/components/InventoryTable/helper'

import { QUERY } from '../ItemsCell'
import { capitalize } from 'src/library/display-names'
import PDFGeneratorWithQR from 'src/components/PDFGeneratorWithQR/PDFGeneratorWithQR'

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

const Item = ({ item, locations }: CellSuccessProps<FindItemById>) => {
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item deleted')
      navigate(routes.items())
    },
    refetchQueries: [QUERY],
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete item ' + id + '?')) {
      deleteItem({ variables: { id } })
    }
  }

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
              <th>Legacy ID</th>
              <td>{item.legacyId ?? '-'}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{item.name}</td>
            </tr>
            <tr>
              <th>Item Status</th>
              <td>{capitalize(item.itemStatus)}</td>
            </tr>
            <tr>
              <th>Asset Type</th>
              {/* Stringify a boolean */}
              <td>{capitalize(item.assetType)}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{getLocationString(item)}</td>
            </tr>
            <tr>
              <th>Remarks</th>
              <td>{item.remarks || 'N.A'}</td>
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
            <tr>
              <th>Label PDF</th>
              <td>
                <PDFGeneratorWithQR items={[item]} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editItem({ id: `${item.id}` })}
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
