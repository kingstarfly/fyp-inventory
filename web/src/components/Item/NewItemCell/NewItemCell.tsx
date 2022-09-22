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

const CREATE_MANY_ITEMS_MUTATION = gql`
  mutation CreateManyItemsMutation($input: CreateItemInput!, $quantity: Int!) {
    createManyItems(input: $input, quantity: $quantity)
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)
export const Success = ({ locations }: CellSuccessProps<NewItemLocations>) => {
  const [createManyItems, { loading, error }] = useMutation(
    CREATE_MANY_ITEMS_MUTATION,
    {
      onCompleted: (data) => {
        console.log('Result of createManyItems: ', data)
        toast.success('Many items created')
        navigate(routes.items())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    const { image, quantity, isAsset, ...modifiedInput } = input

    const modifiedIsAsset = isAsset === 'Yes' ? true : false

    if (!image || image.length == 0) {
      createManyItems({
        variables: {
          input: {
            ...modifiedInput,
            isAsset: modifiedIsAsset,
          },
          quantity: quantity,
        },
      })
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(image[0])
      reader.onload = function () {
        const base64data = reader.result
        createManyItems({
          variables: {
            input: {
              ...modifiedInput,
              isAsset: modifiedIsAsset,
              imageBlobBase64: base64data,
            },
            quantity: quantity,
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
