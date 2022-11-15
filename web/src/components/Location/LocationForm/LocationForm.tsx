import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const LocationForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.location?.id)
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
          name="locationName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location name
        </Label>

        <TextField
          name="locationName"
          defaultValue={props.location?.locationName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="locationName" className="rw-field-error" />

        <Label
          name="block"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Block
        </Label>

        <TextField
          name="block"
          defaultValue={props.location?.block}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
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
          defaultValue={props.location?.floor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
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
          defaultValue={props.location?.room}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="room" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default LocationForm
