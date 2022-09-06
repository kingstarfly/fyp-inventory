import { faker } from '@faker-js/faker'
import { ItemRow } from '../Item/ItemsCell'

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newItemRow = (): ItemRow => {
  return {
    id: faker.datatype.number({ min: 100000, max: 51231322 }),
    name: faker.commerce.productName(),
    itemStatus: faker.helpers.arrayElement(['available', 'on_loan']),
    block: faker.helpers.arrayElement('N1,N2,N3,N4,S1,S2,S3,S4'.split(',')),
    floor: faker.helpers.arrayElement('1,2,3,4,5,6'.split(',')),
    room: faker.datatype
      .number({ min: 1, max: 25 })
      .toString()
      .padStart(2, '0'),
    subIndex: faker.helpers.arrayElement(',A,B,C,D'.split(',')),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): ItemRow[] => {
    const len = lens[depth]!
    return range(len).map((d): ItemRow => newItemRow())
  }

  return makeDataLevel()
}
