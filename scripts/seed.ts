import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { ItemRow } from '$web/src/components/Item/ItemsCell/ItemsCell'
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
    name: faker.helpers.arrayElement([
      'Asus Laptop',
      'Dell Laptop',
      'HP Laptop',
      'Lenovo Laptop',
      'Macbook Pro Laptop',
      'Macbook Air Laptop',
      'Acer Laptop',
    ]),

    itemStatus: faker.helpers.arrayElement([
      'available',
      'loaned',
      'reserved',
      'faulty',
    ]),
    imageBlobBase64: faker.image.abstract(),
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

const dummyBase64 =
  'data:image/jpeg;base64,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'
