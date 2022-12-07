import type { FindItems } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { TbCheck } from 'react-icons/tb'
import { ArrayElement } from 'src/library/ts-helpers'

import { Button, Modal, TransferList, TransferListData } from '@mantine/core'

import PDFGeneratorWithQR from '../PDFGeneratorWithQR/PDFGeneratorWithQR'

export const QUERY = gql`
  query FindItemsForPrintLabels {
    items {
      id
      name
      block
      floor
      room
      subIndex
      itemStatus
      assetType
      remarks
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ items }: CellSuccessProps<FindItems>) => {
  const [data, setData] = React.useState<TransferListData>([
    items.map((item) => {
      return {
        value: item.id.toString(),
        label: item.id.toString(),
      }
    }),
    [],
  ])

  const [itemsToPrint, setItemsToPrint] = React.useState<typeof items>([])
  const [opened, setOpened] = React.useState(false)

  const mapOfAllItems = React.useMemo(() => {
    const map = new Map<string, ArrayElement<typeof items>>()
    items.forEach((item) => {
      map.set(item.id.toString(), item)
    })
    return map
  }, [items])

  const selectedItems = React.useMemo(() => {
    return data[1].map((item) => {
      return mapOfAllItems.get(item.value)
    })
  }, [data, mapOfAllItems])

  return (
    <div className="flex flex-col items-center gap-4">
      <TransferList
        value={data}
        onChange={setData}
        searchPlaceholder="Search..."
        nothingFound="Nothing here"
        titles={['Available', 'Selected']}
        breakpoint="xs"
        listHeight={350}
        showTransferAll={false}
      />
      <div className="flex flex-row justify-center">
        <Button
          onClick={() => {
            setOpened(true)
            setItemsToPrint(selectedItems)
          }}
          leftIcon={<TbCheck size={16} />}
        >
          Confirm Selection
        </Button>
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        centered
      >
        <div className="flex flex-col align-middle">
          <h3 className="mb-4 text-lg font-semibold text-center">
            Your Generated PDF File
          </h3>

          <PDFGeneratorWithQR items={itemsToPrint} />
        </div>
      </Modal>
    </div>
  )
}
