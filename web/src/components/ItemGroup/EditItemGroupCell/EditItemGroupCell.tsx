import type { EditItemGroupById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ItemGroupForm from 'src/components/ItemGroup/ItemGroupForm'

export const QUERY = gql`
  query EditItemGroupById($id: Int!) {
    itemGroup: itemGroup(id: $id) {
      id
      name
      description
      category
      quantity
    }
  }
`
const UPDATE_ITEM_GROUP_MUTATION = gql`
  mutation UpdateItemGroupMutation($id: Int!, $input: UpdateItemGroupInput!) {
    updateItemGroup(id: $id, input: $input) {
      id
      name
      description
      category
      quantity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ itemGroup }: CellSuccessProps<EditItemGroupById>) => {
  const [updateItemGroup, { loading, error }] = useMutation(UPDATE_ITEM_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('ItemGroup updated')
      navigate(routes.itemGroups())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateItemGroup({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit ItemGroup {itemGroup.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ItemGroupForm itemGroup={itemGroup} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
