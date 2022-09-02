import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ItemGroupForm from 'src/components/ItemGroup/ItemGroupForm'

const CREATE_ITEM_GROUP_MUTATION = gql`
  mutation CreateItemGroupMutation($input: CreateItemGroupInput!) {
    createItemGroup(input: $input) {
      id
    }
  }
`

const NewItemGroup = () => {
  const [createItemGroup, { loading, error }] = useMutation(CREATE_ITEM_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('ItemGroup created')
      navigate(routes.itemGroups())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createItemGroup({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ItemGroup</h2>
      </header>
      <div className="rw-segment-main">
        <ItemGroupForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewItemGroup
