import type { GetItemSummaries, GetItemSummariesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { ArrayElement } from 'src/library/ts-helpers'
import { Grid } from '@mantine/core'
import SummaryCard from '../SummaryCard/SummaryCard'

export type ItemRow = ArrayElement<
  CellSuccessProps<GetItemSummaries>['itemSummaries']
>

export const QUERY = gql`
  query GetItemSummaries {
    itemSummaries {
      name
      qtyTotal
      qtyAvailable
      qtyInUse
      qtyWriteOff
      qtyOnLoan
      imgUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No items yet. '}
      <Link to={routes.newItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({
  error,
}: CellFailureProps<GetItemSummariesVariables>) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  itemSummaries,
}: CellSuccessProps<GetItemSummaries>) => {
  return (
    <Grid>
      {itemSummaries.map((item) => (
        <Grid.Col span={3}>
          <SummaryCard
            name={item.name}
            qtyTotal={item.qtyTotal}
            qtyAvailable={item.qtyAvailable}
            qtyInUse={item.qtyInUse}
            qtyWriteOff={item.qtyWriteOff}
          />
        </Grid.Col>
      ))}
    </Grid>
  )
}
