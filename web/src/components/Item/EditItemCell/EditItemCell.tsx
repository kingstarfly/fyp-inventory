import type { EditItemById } from 'types/graphql'

import { back } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ItemForm from 'src/components/Item/ItemForm'

export const QUERY = gql`
  query EditItemById($id: String!) {
    item: item(id: $id) {
      id
      legacyId
      name
      itemStatus
      assetType

      block
      floor
      room
      subIndex

      remarks
      imageBlobBase64
    }

    locations: locations {
      id
      locationName
      block
      floor
      room
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItemMutation($id: Int!, $input: UpdateItemInput!) {
    updateItem(id: $id, input: $input) {
      name
      itemStatus
      assetType

      block
      floor
      room
      subIndex

      remarks
      imageBlobBase64
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  item,
  locations,
}: CellSuccessProps<EditItemById>) => {
  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item updated', { duration: 1500 })
      back()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const { image, quantity, ...modifiedInput } = input

    if (!image || image.length == 0) {
      updateItem({ variables: { id, input: modifiedInput } })
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(image[0])
      reader.onload = function () {
        const base64data = reader.result

        updateItem({
          variables: {
            id,
            input: { ...modifiedInput, imageBlobBase64: base64data },
          },
        })
      }
    }
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Item {item.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ItemForm
          item={item}
          locations={locations}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
