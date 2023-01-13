import { Image, NumberInput, SegmentedControl, Select } from '@mantine/core'
import { RiSearchLine } from 'react-icons/ri'
import { EditItemById, Item, NewItemLocations } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  FileField,
} from '@redwoodjs/forms'
import { CellSuccessProps } from '@redwoodjs/web'

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

  // Control value of block, floor and room
  const [block, setBlock] = React.useState(props?.item?.block || '')
  const [floor, setFloor] = React.useState(props?.item?.floor || '')
  const [room, setRoom] = React.useState(props?.item?.room || '')

  const [assetType, setAssetType] = React.useState(props?.item?.assetType || '')
  const [itemStatus, setItemStatus] = React.useState<ItemStatus>(
    (props.item?.itemStatus as ItemStatus) || 'available'
  )

  const [addMode, setAddMode] = React.useState('single')
  const [quantity, setQuantity] = React.useState(1)

  return (
    <div className="rw-form-wrapper">
      <Form<FormFields>
        onSubmit={(controlledData) => {
          const dataToSubmit = {
            ...controlledData,
            block,
            floor,
            room,
            quantity,
            assetType,
            itemStatus,
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
            radius={0}
            value={addMode}
            onChange={setAddMode}
            className="mt-4"
            color="blue"
            data={[
              { label: 'Add Single Item', value: 'single' },
              { label: 'Bulk Add Items', value: 'bulk' },
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
              Legacy ID
            </Label>

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
          color="blue"
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
          color="blue"
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
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>

        {props.item?.imageBlobBase64 ? (
          <Image src={props.item?.imageBlobBase64} width={150} />
        ) : (
          <>
            <FileField
              name="image"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
          </>
        )}

        <FieldError name="image" className="rw-field-error" />

        <Label
          name="remarks"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Remarks
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
