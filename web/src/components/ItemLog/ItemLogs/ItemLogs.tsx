import { ScrollArea } from '@mantine/core'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ItemLog/ItemLogsCell'

import type {
  DeleteItemLogMutationVariables,
  FindItemLogs,
} from 'types/graphql'
import ItemLog from '../ItemLog/ItemLog'

const DELETE_ITEM_LOG_MUTATION = gql`
  mutation DeleteItemLogMutation($id: Int!) {
    deleteItemLog(id: $id) {
      id
    }
  }
`

const ItemLogsList = ({ itemLogs }: FindItemLogs) => {
  const [deleteItemLog] = useMutation(DELETE_ITEM_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('Item log deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [
      { query: QUERY, variables: { itemId: itemLogs[0]?.itemId } },
    ],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteItemLogMutationVariables['id']) => {
    console.log(id)
    if (confirm('Are you sure you want to delete itemLog ' + id + '?')) {
      deleteItemLog({ variables: { id } })
    }
  }

  return (
    <ScrollArea
      className="h-80 rounded-lg bg-white p-4 shadow-md"
      offsetScrollbars
    >
      <div className="flex flex-col items-center justify-start gap-4">
        {itemLogs.map((itemLog) => (
          <ItemLog
            logContent={itemLog.content}
            timestamp={itemLog.createdAt}
            onDelete={() => onDeleteClick(itemLog.id)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}

export default ItemLogsList
