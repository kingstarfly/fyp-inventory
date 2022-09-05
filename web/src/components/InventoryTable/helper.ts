import { CellSuccessProps } from '@redwoodjs/web'
import { ArrayElement } from 'src/library/ts-helpers'
import { FindItems } from 'types/graphql'

export function getLocationString(
  row: ArrayElement<CellSuccessProps<FindItems>['items']>
) {
  const { block, floor, floorSection, room, subIndex } = row
  // join above variables into a string with - as a separator
  const locationString = [block, floor + floorSection, room, subIndex]
    .filter((v) => v) // To remove undefined/empty values
    .join('-')
  return locationString
}
