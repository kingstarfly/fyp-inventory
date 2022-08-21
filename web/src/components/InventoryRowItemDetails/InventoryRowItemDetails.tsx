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
    <div className="flex flex-row my-2">
      <div className="flex flex-row items-stretch mr-4">
        <div
          className={`${
            status === 'available' ? 'bg-green-400' : 'bg-red-400'
          } mr-2 rounded-lg p-0.5`}
        />
        <img src={thumbnail} width={50} height={50} />
      </div>

      <div className="flex flex-col">
        <div>{name}</div>
        <div>
          {storageLocationString} . {category}
        </div>
      </div>
    </div>
  )
}

export default InventoryRowItemDetails
