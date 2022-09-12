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

    /*
    const items: Prisma.ItemCreateArgs['data'][] = [
      {
        id: 33551394,
        name: 'Bespoke Bronze Chicken',
        itemStatus: 'available',
        category: 'asset',
        block: 'S2',
        floor: '4',
        room: '04',
        subIndex: 'D',
      },
      {
        id: 24847440,
        name: 'Ergonomic Bronze Cheese',
        itemStatus: 'on_loan',
        category: 'inventory',
        block: 'S2',
        floor: '2',
        room: '01',
        subIndex: '',
      },
      {
        id: 21502425,
        name: 'Small Concrete Fish',
        itemStatus: 'on_loan',
        category: 'inventory',
        block: 'N3',
        floor: '3',
        room: '08',
        subIndex: 'B',
      },
      {
        id: 44811605,
        name: 'Tasty Soft Fish',
        itemStatus: 'available',
        category: 'asset',
        block: 'N3',
        floor: '2',
        room: '18',
        subIndex: 'B',
      },
      {
        id: 22595937,
        name: 'Modern Bronze Car',
        itemStatus: 'available',
        category: 'inventory',
        block: 'N1',
        floor: '6',
        room: '06',
        subIndex: 'D',
      },
      {
        id: 36162503,
        name: 'Luxurious Fresh Hat',
        itemStatus: 'on_loan',
        category: 'asset',
        block: 'S1',
        floor: '5',
        room: '22',
        subIndex: 'B',
      },
      {
        id: 31549270,
        name: 'Awesome Metal Bike',
        itemStatus: 'available',
        category: 'inventory',
        block: 'N4',
        floor: '5',
        room: '20',
        subIndex: 'A',
      },
      {
        id: 34474045,
        name: 'Sleek Cotton Chips',
        itemStatus: 'available',
        category: 'inventory',
        block: 'N3',
        floor: '6',
        room: '18',
        subIndex: '',
      },
      {
        id: 1058322,
        name: 'Sleek Bronze Bacon',
        itemStatus: 'available',
        category: 'inventory',
        block: 'N2',
        floor: '6',
        room: '23',
        subIndex: 'A',
      },
      {
        id: 47639752,
        name: 'Gorgeous Granite Shirt',
        itemStatus: 'on_loan',
        category: 'inventory',
        block: 'S3',
        floor: '1',
        room: '14',
        subIndex: 'C',
      },
    ]
    */

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

const newItemRow = (): ItemRow => {
  return {
    id: faker.datatype.number({ min: 100000, max: 51231322 }),
    name: faker.commerce.productName(),
    itemStatus: faker.helpers.arrayElement(['available', 'on_loan']),
    category: faker.helpers.arrayElement(['inventory', 'asset']),
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
