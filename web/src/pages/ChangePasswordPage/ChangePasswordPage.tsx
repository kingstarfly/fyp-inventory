import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { PasswordInput } from '@mantine/core'

const ChangePasswordPage = () => {
  const { currentUser, reauthenticate } = useAuth()
  const [value, setValue] = useState('')

  const CHANGE_PASSWORD_MUTATION = gql`
    mutation ChangePassword($id: Int!, $input: ChangePasswordInput!) {
      changePassword(id: $id, input: $input) {
        id
      }
    }
  `
  const [changePassword] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: async () => {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const passwordRef = useRef<HTMLInputElement>()
  useEffect(() => {
    passwordRef.current.focus()
  }, [])

  const onSubmit = async () => {
    changePassword({
      variables: {
        id: currentUser.id,
        input: {
          password: value,
        },
      },
    })
  }

  return (
    <>
      <MetaTags title="Change Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="bg-transparent rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Change Password
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="password"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      New Password
                    </Label>
                    <PasswordInput
                      name="password"
                      ref={passwordRef}
                      required
                      value={value}
                      onChange={(event) => setValue(event.currentTarget.value)}
                    />

                    <FieldError name="password" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ChangePasswordPage
