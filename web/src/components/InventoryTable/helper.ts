import { FindItems } from 'types/graphql'

import { CellSuccessProps } from '@redwoodjs/web'

import { ArrayElement } from 'src/library/ts-helpers'

export function getLocationString(
  row: ArrayElement<CellSuccessProps<FindItems>['items']>
) {
  const { block, floor, room, subIndex } = row
  // join above variables into a string with - as a separator
  const locationString = [block, floor, room, subIndex]
    .filter((v) => v) // To remove undefined/empty values
    .join('-')
  return locationString
}
