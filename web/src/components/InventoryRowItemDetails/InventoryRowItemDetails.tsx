import { Image } from '@mantine/core'
import { InventoryItemRow } from 'src/pages/HomePage/HomePage'

// Pick name, storagelocationstring, category from InventoryItemRow
export type InventoryRowItemDetailsProps = Pick<
  InventoryItemRow,
  'status' | 'thumbnail' | 'name' | 'storageLocationString' | 'category'
>

const InventoryRowItemDetails = ({
  status,
  thumbnail,
  name,
  storageLocationString,
  category,
}: InventoryRowItemDetailsProps) => {
  return (
    <div className="flex flex-row py-2">
      <div className="flex flex-row items-stretch h-12 mr-4">
        <div
          className={`${
            status === 'available' ? 'bg-green-400' : 'bg-red-400'
          } my-1 mr-2 rounded-xl pl-0.5`}
        />
        <div className="z-0 w-12 h-12 my-auto">
          <Image
            src={thumbnail}
            radius="md"
            withPlaceholder
            style={{ zIndex: 0 }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="align-text-top text-md">{name}</h3>
        <p className="text-sm">
          {storageLocationString} . {category}
        </p>
      </div>
    </div>
  )
}

export default InventoryRowItemDetails
