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
import { toast } from '@redwoodjs/web/toast'


import { useApolloClient } from '@apollo/client'
import { QUERY as FIND_USERS_QUERY } from '../UsersCell'

const NewUser = () => {
  const { signUp, currentUser } = useAuth()
  const apolloClient = useApolloClient()

  // focus on email box on page load
  const usernameRef = React.useRef<HTMLInputElement>()
  React.useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      await apolloClient.refetchQueries({ include: [FIND_USERS_QUERY] })

      toast.success('User created')
      navigate(routes.users())
    }
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New User</h2>
      </header>
      <div className="rw-segment-main">
        <Form onSubmit={onSubmit} className="rw-form-wrapper">
          <Label
            name="username"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Email Address
          </Label>
          <TextField
            name="username"
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            ref={usernameRef}
            validation={{
              required: {
                value: true,
                message: 'Username is required',
              },
            }}
          />
          <FieldError name="username" className="rw-field-error" />

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
