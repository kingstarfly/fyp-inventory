import type { EditUserRoleById, ModifyUserRoleInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EditUserRoleForm from 'src/components/User/EditUserRoleForm/EditUserRoleForm'

export const QUERY = gql`
  query EditUserRoleById($id: Int!) {
    user: user(id: $id) {
      id
      roles
    }
  }
`
const UPDATE_USER_ROLE_MUTATION = gql`
  mutation ModifyUserRoleMutation($id: Int!, $input: ModifyUserRoleInput!) {
    modifyUserRole(id: $id, input: $input) {
      roles
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<EditUserRoleById>) => {
  const [updateUserRole, { loading, error }] = useMutation(
    UPDATE_USER_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('User updated')
        navigate(routes.users())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: ModifyUserRoleInput,
    id: EditUserRoleById['user']['id']
  ) => {
    updateUserRole({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit User Role {user?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EditUserRoleForm
          user={user}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
