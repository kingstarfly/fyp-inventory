import { Image, Select } from '@mantine/core'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  FileField,
  InputField,
  SelectField,
} from '@redwoodjs/forms'
import { RiSearchLine } from 'react-icons/ri'

const ItemForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.item?.id)
  }

  // Control value of block, floor and room
  const [block, setBlock] = React.useState(props?.item?.block)
  const [floor, setFloor] = React.useState(props?.item?.floor)
  const [room, setRoom] = React.useState(props?.item?.room)

  return (
    <div className="rw-form-wrapper">
      {JSON.stringify(props, null, 2)}
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

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
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="isAsset"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is Asset?
        </Label>

        <SelectField
          name="isAsset"
          defaultValue={props.item?.isAsset ? 'true' : 'false'}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </SelectField>

        <FieldError name="isAsset" className="rw-field-error" />

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

        <Label
          name="itemStatus"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Item Status
        </Label>

        <TextField
          name="itemStatus"
          defaultValue={props.item?.itemStatus}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
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
          block
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
          floor
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
          room
        </Label>

        <TextField
          name="room"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
        />

        <FieldError name="room" className="rw-field-error" />

        {props.item?.thumbnailUrl ? (
          <Image src={props.item?.thumbnailUrl} width={150} />
        ) : (
          <>
            <Label
              name="image"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Image
            </Label>

            <FileField
              name="image"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />

            <FieldError name="image" className="rw-field-error" />
          </>
        )}

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
