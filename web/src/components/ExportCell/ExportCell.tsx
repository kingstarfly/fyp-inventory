import { Button } from '@mantine/core'
import dayjs from 'dayjs'
import CsvDownload from 'react-json-to-csv'
import type { FindItems, FindItemsVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindItems {
    items {
      id
      name
      block
      floor
      room
      subIndex
      itemStatus
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<FindItemsVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ items }: CellSuccessProps<FindItems>) => {
  return (
    <div className="container m-auto flex min-h-screen flex-col  items-center justify-center ">
      <h1>Export database</h1>
      <Button>
        <CsvDownload data={items} filename={dayjs().toISOString()} />
      </Button>
    </div>
  )
}
