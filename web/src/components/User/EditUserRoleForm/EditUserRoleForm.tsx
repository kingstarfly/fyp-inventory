import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditUserRoleById, ModifyUserRoleInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormUser = NonNullable<EditUserRoleById['user']>

interface UserFormProps {
  user?: EditUserRoleById['user']
  onSave: (data: ModifyUserRoleInput, id?: FormUser['id']) => void
  error: RWGqlError
  loading: boolean
}

const EditUserRoleForm = (props: UserFormProps) => {
  const onSubmit = (data: FormUser) => {
    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormUser> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="roles"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Roles
        </Label>

        <TextField
          name="roles"
          defaultValue={props.user?.roles}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="roles" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EditUserRoleForm
