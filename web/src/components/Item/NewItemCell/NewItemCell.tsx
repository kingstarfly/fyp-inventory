import { navigate, routes } from '@redwoodjs/router'
import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ItemForm from 'src/components/Item/ItemForm'
import { Item, NewItemLocations } from 'types/graphql'

export const QUERY = gql`
  query NewItemLocations {
    locations: locations {
      id
      locationName
      block
      floor
      room
    }
  }
`

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ locations }: CellSuccessProps<NewItemLocations>) => {
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item created')
      navigate(routes.items())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const { image, ...inputWithoutImage } = input

    if (!image || image.length == 0) {
      createItem({ variables: { input: inputWithoutImage } })
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(image[0])
      reader.onload = function () {
        const base64data = reader.result
        createItem({
          variables: {
            input: { ...inputWithoutImage, imageBlobBase64: base64data },
          },
        })
      }
    }
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Item</h2>
      </header>
      <div className="rw-segment-main">
        <ItemForm
          locations={locations}
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}
