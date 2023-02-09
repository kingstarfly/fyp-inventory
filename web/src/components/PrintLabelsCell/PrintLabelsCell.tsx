import type { FindItems } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { TbCheck } from 'react-icons/tb'
import { ArrayElement } from 'src/library/ts-helpers'

import { Button, Modal, NumberInput, TransferListData } from '@mantine/core'

import PDFGeneratorWithQR from '../PDFGeneratorWithQR/PDFGeneratorWithQR'
import { useState } from 'react'

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
  const [itemsToPrint, setItemsToPrint] = React.useState<typeof items>([])
  const [opened, setOpened] = React.useState(false)

  const [minId, setMinId] = useState(1)
  const [maxId, setMaxId] = useState(2)

  const [MIN_POSSIBLE_ID, MAX_POSSIBLE_ID] = React.useMemo(() => {
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER
    for (const item of items) {
      if (item.id < min) {
        min = item.id
      }
      if (item.id > max) {
        max = item.id
      }
    }
    return [min, max]
  }, [items])

  const mapOfAllItems = React.useMemo(() => {
    const map = new Map<string, ArrayElement<typeof items>>()
    items.forEach((item) => {
      map.set(item.id.toString(), item)
    })
    return map
  }, [items])

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-8">
      <div className="flex flex-row items-center gap-8">
        <NumberInput
          label="From"
          description={`Minimum ID (${MIN_POSSIBLE_ID} - ${MAX_POSSIBLE_ID})`}
          max={MAX_POSSIBLE_ID}
          min={MIN_POSSIBLE_ID}
          value={minId}
          onChange={(val) => setMinId(val)}
        />

        <NumberInput
          label="To"
          description={`Maximum ID (${MIN_POSSIBLE_ID} - ${MAX_POSSIBLE_ID})`}
          max={MAX_POSSIBLE_ID}
          min={MIN_POSSIBLE_ID}
          value={maxId}
          onChange={(val) => setMaxId(val)}
        />
      </div>
      <div className="flex flex-row justify-center">
        <Button
          onClick={() => {
            const _itemsToPrint: typeof items = []
            for (let i = minId; i <= maxId; i++) {
              if (!mapOfAllItems.has(i.toString())) {
                continue
              }
              _itemsToPrint.push(mapOfAllItems.get(i.toString())!)
            }
            setItemsToPrint(_itemsToPrint)
            setOpened(true)
          }}
          leftIcon={<TbCheck size={16} />}
        >
          Confirm Selection
        </Button>
      </div>

      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <div className="flex flex-col items-center">
          <h3 className="mb-4 text-center text-lg font-semibold">
            Your Generated PDF File
          </h3>

          <PDFGeneratorWithQR items={itemsToPrint} />
        </div>
      </Modal>
    </div>
  )
}
