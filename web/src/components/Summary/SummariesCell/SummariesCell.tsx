import type { GetItemSummaries, GetItemSummariesVariables } from 'types/graphql'

import SummaryTable from 'src/components/SummaryTable/SummaryTable'
import { ArrayElement } from 'src/library/ts-helpers'

import { Link, routes } from '@redwoodjs/router'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
export type ItemSummaryRow = ArrayElement<
  CellSuccessProps<GetItemSummaries>['itemSummaries']
>

export const QUERY = gql`
  query GetItemSummaries {
    itemSummaries {
      name
      qtyTotal
      qtyAvailable
      qtyReserved
      qtyLoaned
      qtyFaulty
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
  return <SummaryTable itemSummaries={itemSummaries} />
}
