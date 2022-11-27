import { useEffect, useState } from 'react'

import { Anchor, Image } from '@mantine/core'
import {
  Document,
  Page,
  Text,
  View,
  Image as PDFImage,
  PDFDownloadLink,
} from '@react-pdf/renderer'
import humanize from 'humanize-string'
import { QRCodeCanvas } from 'qrcode.react'
import { FindItemById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { getLocationString } from 'src/components/InventoryTable/helper'

import { QUERY } from '../ItemsCell'
import { capitalize } from 'src/library/display-names'

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
                <PDFPreview item={item} />
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

// Create Document Component
const PDFPreview = ({
  item,
}: {
  item: CellSuccessProps<FindItemById>['item']
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const divRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    const canvas = divRef.current?.querySelector('canvas')
    const url = canvas?.toDataURL('image/png', 1)
    console.log({ url })
    setQrCodeUrl(url)
  }, [item.id])

  return (
    <>
      {/* Dummy div to render the QR Code so that pdf can have the url to the QR code */}
      <div ref={divRef} className="hidden">
        <QRCodeCanvas value={item.id.toString()} />
      </div>

      {qrCodeUrl && (
        <PDFDownloadLink
          document={
            <Document>
              <Page
                size="A8"
                orientation="landscape"
                style={{ padding: 8, flexDirection: 'row', display: 'flex' }}
              >
                <View style={{ flex: 2 }}>
                  <View>
                    <Text style={{ fontSize: 10 }}>{item.name}</Text>
                    <Text style={{ fontSize: 8 }}>ID: {item.id}</Text>
                    <Text style={{ fontSize: 6 }}>{item.assetType}</Text>
                  </View>
                  <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 8 }}>
                      Location: {getLocationString(item)}
                    </Text>
                  </View>
                  <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 8 }}>{item.remarks}</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  {/* src is generated once QR code is generated */}
                  <PDFImage src={qrCodeUrl} />
                </View>
              </Page>
            </Document>
          }
          fileName={`${item.name}_${item.id}_Label.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              'Loading document...'
            ) : (
              <Anchor component="span">
                {item.name}_{item.id}_Label.pdf
              </Anchor>
            )
          }
        </PDFDownloadLink>
      )}
    </>
  )
}
