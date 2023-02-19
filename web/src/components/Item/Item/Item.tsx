import { Button, Image, Modal, TextInput } from '@mantine/core'
import {
  CreateItemLogInput,
  DeleteItemLogMutationVariables,
  FindItemById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { getLocationString } from 'src/components/InventoryTable/helper'

import { QUERY } from '../../ItemLog/ItemLogsCell/ItemLogsCell'
import { capitalize } from 'src/lib/display-names'
import PDFGeneratorWithQR from 'src/components/PDFGeneratorWithQR/PDFGeneratorWithQR'
import ItemLogsCell from 'src/components/ItemLog/ItemLogsCell'
import { useState } from 'react'

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const CREATE_ITEM_LOG_MUTATION = gql`
  mutation CreateItemLogMutation($input: CreateItemLogInput!) {
    createItemLog(input: $input) {
      id
    }
  }
`

const Item = ({ item }: CellSuccessProps<FindItemById>) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [logContent, setLogContent] = useState('')

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item deleted')
      navigate(routes.inventory())
    },
    refetchQueries: [QUERY],
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [createItemLog, { loading, error }] = useMutation(
    CREATE_ITEM_LOG_MUTATION,
    {
      onCompleted: () => {
        toast.success('Item Log created')
        setLogContent('')
        setModalOpened(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY, variables: { itemId: item.id } }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteItemClick = (id) => {
    if (confirm('Are you sure you want to delete item ' + id + '?')) {
      deleteItem({ variables: { id } })
    }
  }
  const handleAddNewLog = () => {
    setModalOpened(false)
    console.log({
      itemId: item.id,
      content: logContent,
    })
    createItemLog({
      variables: {
        input: {
          itemId: item.id,
          content: logContent,
        } as CreateItemLogInput,
      },
    })
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Item {item.id} Detail
          </h2>
        </header>
        <div className="flex flex-col justify-between md:flex-row">
          <table className="rw-table flex-1">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{item.id}</td>
              </tr>
              <tr>
                <th>Legacy ID</th>
                <td>{item.legacyId ?? '-'}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{item.name}</td>
              </tr>
              <tr>
                <th>Item Status</th>
                <td>{capitalize(item.itemStatus)}</td>
              </tr>
              <tr>
                <th>Asset Type</th>
                {/* Stringify a boolean */}
                <td>{capitalize(item.assetType)}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{getLocationString(item)}</td>
              </tr>
              <tr>
                <th>Image</th>
                <td>
                  {item.imageBlobBase64 ? (
                    <Image
                      width="20vw"
                      src={item.imageBlobBase64}
                      alt={item.name}
                    />
                  ) : (
                    'N.A'
                  )}
                </td>
              </tr>
              <tr>
                <th>Label PDF</th>
                <td>
                  <PDFGeneratorWithQR items={[item]} />
                </td>
              </tr>
              <tr>
                <th>Remarks</th>
                <td>{item.remarks || 'N.A'}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-1 flex-col items-center justify-start gap-4">
            <div className="flex w-full flex-row justify-between px-8 pt-4">
              <h3 className="text-lg font-semibold">Item Logs</h3>
              <button
                type="button"
                onClick={() => {
                  setModalOpened(true)
                }}
                className="rounded bg-[#48bb78] px-4 py-2 text-center text-sm tracking-wide text-white"
              >
                + ADD NEW LOG
              </button>
              <Modal
                opened={modalOpened}
                withCloseButton
                onClose={() => setModalOpened(false)}
                size="lg"
                radius="md"
                title={<h3 className="text-lg font-semibold">New Item Log</h3>}
              >
                <div className="flex flex-row justify-between gap-2">
                  <TextInput
                    className="flex-1"
                    value={logContent}
                    onChange={(event) =>
                      setLogContent(event.currentTarget.value)
                    }
                    data-autoFocus
                  />
                  <Button onClick={handleAddNewLog} loading={loading}>
                    Save
                  </Button>
                </div>
              </Modal>
            </div>

            <ItemLogsCell itemId={item.id} />
          </div>
        </div>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editItem({ id: `${item.id}` })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteItemClick(item.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Item
