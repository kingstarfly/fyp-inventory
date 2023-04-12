import {
  FileInput,
  Image,
  NumberInput,
  SegmentedControl,
  Select,
} from '@mantine/core'
import { RiSearchLine } from 'react-icons/ri'
import { EditItemById, Item, NewItemLocations } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { CellSuccessProps } from '@redwoodjs/web'
import { TbCircle1, TbCircles, TbUpload } from 'react-icons/tb'
import { toast } from '@redwoodjs/web/toast'

interface ItemFormProps {
  locations: CellSuccessProps<NewItemLocations>['locations']
  onSave: (input: any, id?: any) => void
  item?: CellSuccessProps<EditItemById>['item']
  error?: any
  loading?: boolean
}

interface FormFields extends Item {
  quantity: number
}

type ItemStatus = 'available' | 'loaned' | 'reserved' | 'faulty' | 'write-off'
type AssetType = 'inventorised' | 'non-inventorised' | 'SAP'

const ItemForm = (props: ItemFormProps) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.item?.id)
  }

  // Control value of block, floor, room and sub index
  const [block, setBlock] = React.useState(props?.item?.block || '')
  const [floor, setFloor] = React.useState(props?.item?.floor || '')
  const [room, setRoom] = React.useState(props?.item?.room || '')
  const [subIndex, setSubIndex] = React.useState(props?.item?.subIndex || '')

  const [assetType, setAssetType] = React.useState(
    props?.item?.assetType || 'inventorised'
  )
  const [itemStatus, setItemStatus] = React.useState<ItemStatus>(
    (props.item?.itemStatus as ItemStatus) || 'available'
  )
  const [uploadedFile, setUploadedFile] = React.useState<File>(null)

  const [hasClearedImage, setHasClearedImage] = React.useState(false)
  const [addMode, setAddMode] = React.useState('single')
  const [quantity, setQuantity] = React.useState(1)

  function onClearImage() {
    setHasClearedImage(true)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormFields>
        onSubmit={(controlledData) => {
          const dataToSubmit = {
            ...controlledData,
            block,
            floor,
            room,
            subIndex,
            quantity,
            assetType,
            itemStatus,
            image: uploadedFile,
          }

          onSubmit(dataToSubmit)
        }}
        error={props.error}
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        {!props.item && (
          <SegmentedControl
            value={addMode}
            onChange={setAddMode}
            className="mt-4"
            color="blue.6"
            data={[
              {
                label: (
                  <div className="flex aspect-square flex-col items-center justify-center gap-2">
                    <TbCircle1 size={24} />
                    <p className="text-xs tracking-wide">SINGLE ITEM</p>
                  </div>
                ),

                value: 'single',
              },
              {
                label: (
                  <div className="flex aspect-square flex-col items-center justify-center gap-2">
                    <TbCircles size={24} />
                    <p className="text-xs tracking-wide">MANY ITEMS</p>
                  </div>
                ),
                value: 'bulk',
              },
            ]}
          />
        )}

        {addMode === 'bulk' && (
          <>
            <Label
              name="quantity"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Quantity
            </Label>
            <NumberInput
              name="quantity"
              value={quantity}
              id="quantity"
              onChange={(value) => setQuantity(value)}
              classNames={{ input: 'rw-input' }}
              max={1000}
              min={1}
              required={true}
            />

            <FieldError name="quantity" className="rw-field-error" />
          </>
        )}
        {addMode === 'single' && (
          <>
            <Label
              name="legacyId"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Legacy ID (optional)
            </Label>
            <p className="text-xs italic text-gray-600">e.g. *6201012839-0*</p>

            <TextField
              name="legacyId"
              defaultValue={props.item?.legacyId}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />

            <FieldError name="legacyId" className="rw-field-error" />
          </>
        )}

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.item?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          required={true}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="assetType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Asset Type
        </Label>

        <SegmentedControl
          value={assetType}
          onChange={(value) => setAssetType(value as AssetType)}
          data={[
            { label: 'Inventorised', value: 'inventorised' },
            { label: 'Non-Inventorised', value: 'non-inventorised' },
            { label: 'SAP', value: 'SAP' },
          ]}
          color="dark"
        />

        <FieldError name="assetType" className="rw-field-error" />

        <Label
          name="itemStatus"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Item Status
        </Label>

        <SegmentedControl
          value={itemStatus}
          onChange={(value) => setItemStatus(value as ItemStatus)}
          data={[
            { label: 'Available', value: 'available' },
            { label: 'Loaned', value: 'loaned' },
            { label: 'Reserved', value: 'reserved' },
            { label: 'Faulty', value: 'faulty' },
            { label: 'Write-off', value: 'write-off' },
          ]}
          color="dark"
        />

        <FieldError name="itemStatus" className="rw-field-error" />

        <Select
          label="Search location name"
          placeholder="..."
          className="rw-select"
          labelProps={{ className: 'rw-label' }}
          icon={<RiSearchLine size={14} />}
          searchable
          clearable
          nothingFound="No options"
          data={
            !props.locations
              ? []
              : props.locations?.map((location) => {
                  return {
                    value: location.locationName,
                    label: location.locationName,
                  }
                })
          }
          onChange={(value) => {
            props.locations.find((location) => {
              if (location.locationName === value) {
                // Fill in Block, Floor and Room with location.block, location.floor and location.room
                setBlock(location.block)
                setFloor(location.floor)
                setRoom(location.room)
              }
            })
          }}
        />

        <FieldError name="block" className="rw-field-error" />

        <Label
          name="block"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Block
        </Label>

        <TextField
          name="block"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          value={block}
          onChange={(event) => setBlock(event.target.value)}
        />

        <FieldError name="block" className="rw-field-error" />

        <Label
          name="floor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Floor
        </Label>

        <TextField
          name="floor"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          value={floor}
          onChange={(event) => setFloor(event.target.value)}
        />

        <FieldError name="floor" className="rw-field-error" />

        <Label
          name="room"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Room
        </Label>
        <TextField
          name="room"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
        />

        <FieldError name="room" className="rw-field-error" />

        <Label
          name="subIndex"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sub Index (Optional)
        </Label>
        <p className="text-xs italic text-gray-600">e.g. Cabinet number</p>
        <TextField
          name="subIndex"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          value={subIndex}
          onChange={(event) => setSubIndex(event.target.value)}
        />

        <FieldError name="subIndex" className="rw-field-error" />

        <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image (Optional)
        </Label>

        {props.item?.imageBlobBase64 && !hasClearedImage ? (
          <>
            <Image src={props.item?.imageBlobBase64} width={150} />
            <button
              type="button"
              className="mt-2 text-sm text-red-400"
              onClick={onClearImage}
            >
              Clear
            </button>
          </>
        ) : (
          <>
            <FileInput
              placeholder="Pick image"
              accept="image/png, image/jpeg"
              icon={<TbUpload size={14} />}
              value={uploadedFile}
              onChange={(payload) => {
                if (payload.size > 10_000_000) {
                  toast.error('File size too large. Max 10MB')
                  return
                }
                setUploadedFile(payload)
              }}
            />
          </>
        )}

        <FieldError name="image" className="rw-field-error" />

        <Label
          name="remarks"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Remarks (Optional)
        </Label>

        <TextField
          name="remarks"
          defaultValue={props.item?.remarks}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ItemForm
