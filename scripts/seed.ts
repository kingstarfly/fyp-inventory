import { ItemRow } from '$web/src/components/Item/ItemsCell/ItemsCell'
import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //

    const items: Prisma.ItemCreateArgs['data'][] = makeData(100)
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      //
      // Change to match your data model and seeding needs
      //
      items.map(async (item) => {
        const record = await db.item.create({ data: item })
        console.log(record)
      })
    )
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newItem = (): Prisma.ItemCreateArgs['data'] => {
  return {
    id: faker.datatype.number({ min: 100000, max: 51231322 }),
    name: faker.commerce.productName(),
    itemStatus: faker.helpers.arrayElement(['available', 'on_loan']),
    isAsset: faker.datatype.boolean(),
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
    return range(len).map((d): ItemRow => newItem())
  }

  return makeDataLevel()
}
