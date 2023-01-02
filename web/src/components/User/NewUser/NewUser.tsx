import { useAuth } from '@redwoodjs/auth'
import {
  FieldError,
  Form,
  Label,
  PasswordField,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const NewUser = () => {
  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User created')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // focus on email box on page load
  const usernameRef = React.useRef<HTMLInputElement>()
  React.useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    createUser({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
    })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New User</h2>
      </header>
      <div className="rw-segment-main">
        <Form onSubmit={onSubmit} className="rw-form-wrapper">
          <Label
            name="email"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Email Address
          </Label>
          <TextField
            name="email"
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            ref={usernameRef}
            validation={{
              required: {
                value: true,
                message: 'email is required',
              },
            }}
          />
          <FieldError name="email" className="rw-field-error" />

          <Label
            name="password"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Password
          </Label>
          <PasswordField
            name="password"
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            autoComplete="current-password"
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />
          <FieldError name="password" className="rw-field-error" />

          <div className="rw-button-group">
            <Submit className="rw-button rw-button-blue">Sign Up</Submit>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default NewUser
