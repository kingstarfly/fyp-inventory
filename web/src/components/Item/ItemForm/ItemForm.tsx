import { Image } from '@mantine/core'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  FileField,
} from '@redwoodjs/forms'

const ItemForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.item?.id)
  }

  return (
    <div className="rw-form-wrapper">
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
          name="category"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Category
        </Label>

        <TextField
          name="category"
          defaultValue={props.item?.category}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="category" className="rw-field-error" />

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

        <Label
          name="block"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          block
        </Label>

        <TextField
          name="block"
          defaultValue={props.item?.block}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
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
          defaultValue={props.item?.floor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
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
          defaultValue={props.item?.room}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
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
