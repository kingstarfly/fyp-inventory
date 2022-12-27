import { Anchor } from '@mantine/core'
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer'
import { CellSuccessProps } from '@redwoodjs/web'
import { QRCodeCanvas } from 'qrcode.react'
import { FindItems } from 'types/graphql'
import { getLocationString } from '../InventoryTable/helper'

const PDFGeneratorWithQR = ({ items }: CellSuccessProps<FindItems>) => {
  // If items has only one item, then filename should be `label_${item.id}.pdf`
  // Else, filename should be labels + the timestamp with colons remove.

  const filename =
    items.length === 1
      ? `label_${items[0].id}.pdf`
      : `labels_${new Date().toISOString().replaceAll(':', '')}.pdf`

  return (
    <div>
      <div>
        {items.map((selectedItem) => {
          return (
            <div
              className="hidden"
              key={`qrGenerator_${selectedItem.id.toString()}`}
            >
              <QRCodeCanvas
                id={`canvas_${selectedItem.id.toString()}`}
                value={selectedItem.id.toString()}
              />
            </div>
          )
        })}
      </div>
      {items.length === 0 ? (
        <p>Oops! There weren't any labels given to print.</p>
      ) : (
        <PDFDownloadLink
          document={<PDFDocument items={items} />}
          fileName={filename}
        >
          {({ loading }) =>
            loading ? (
              'Loading document...'
            ) : (
              <Anchor component="span">{filename}</Anchor>
            )
          }
        </PDFDownloadLink>
      )}
    </div>
  )
}

export default PDFGeneratorWithQR

const PDFDocument = ({ items }: CellSuccessProps<FindItems>) => {
  const qrCodeUrlMap = new Map<number, string>()

  items.forEach((item) => {
    const canvas = document.getElementById(
      `canvas_${item.id.toString()}`
    ) as HTMLCanvasElement

    qrCodeUrlMap.set(item.id, canvas?.toDataURL('image/png', 1))
    return
  })

  return (
    <Document>
      {items.map((item) => (
        <Page
          key={`pageId_${item.id.toString()}`}
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
            <Image src={qrCodeUrlMap.get(item.id)} />
          </View>
        </Page>
      ))}
    </Document>
  )
}
