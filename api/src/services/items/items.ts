import type {
  QueryResolvers,
  MutationResolvers,
  ItemRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const items: QueryResolvers['items'] = () => {
  return db.item.findMany()
}

export const itemSummaries: QueryResolvers['itemSummaries'] = async () => {
  // Use prisma to group by name and count the number of items.
  const result = await db.item.groupBy({
    by: ['name', 'itemStatus', 'imageBlobBase64'],
    _count: {
      _all: true,
    },
  })

  const itemToStatusMap = new Map<string, Map<string, number>>()
  const itemToImgUrlMap = new Map<string, string>()

  result.forEach((item) => {
    if (!itemToStatusMap.has(item.name)) {
      itemToStatusMap.set(item.name, new Map<string, number>())
    }

    itemToStatusMap.get(item.name).set(item.itemStatus, item._count._all)

    if (item.imageBlobBase64 && !itemToImgUrlMap.has(item.name)) {
      itemToImgUrlMap.set(item.name, item.imageBlobBase64)
    }
  })

  // Iterate through the map and return the result in the expected format.
  const summaries = []
  for (const [name, statusMap] of itemToStatusMap) {
    summaries.push({
      name,
      qtyTotal:
        (statusMap.get('available') || 0) +
        (statusMap.get('loaned') || 0) +
        (statusMap.get('reserved') || 0) +
        (statusMap.get('faulty') || 0) +
        (statusMap.get('write-off') || 0),
      qtyAvailable: statusMap.get('available') || 0,
      qtyReserved: statusMap.get('reserved') || 0,
      qtyLoaned: statusMap.get('loaned') || 0,
      qtyFaulty: statusMap.get('faulty') || 0,
      qtyWriteOff: statusMap.get('write-off') || 0,
      imgUrl: itemToImgUrlMap.get(name),
    })
  }
  return summaries
}

export const item: QueryResolvers['item'] = ({ id }) => {
  return db.item.findUnique({
    where: { id },
  })
}

export const createManyItems: MutationResolvers['createManyItems'] = ({
  input,
  quantity,
}) => {
  const createdItemIds = []
  return Promise.all(
    Array(quantity)
      .fill(null)
      .map((_, i) => {
        return db.item
          .create({
            data: input,
          })
          .then((createdItem) => {
            createdItemIds.push(createdItem.id)
          })
      })
  )
    .then(() => {
      console.log('createdItemIds', createdItemIds)
      return createdItemIds
    })
    .catch((error) => {
      console.log('error', error)
      return []
    })
}

export const updateItem: MutationResolvers['updateItem'] = ({ id, input }) => {
  return db.item.update({
    data: input,
    where: { id },
  })
}

export const deleteItem: MutationResolvers['deleteItem'] = ({ id }) => {
  return db.item.delete({
    where: { id },
  })
}

export const deleteItems: MutationResolvers['deleteItems'] = ({ ids }) => {
  return db.item
    .deleteMany({
      where: { id: { in: ids } },
    })
    .then(
      () => {
        return ids
      },
      (error) => {
        console.error(error)
        return []
      }
    )
}

export const Item: ItemRelationResolvers = {
  loan: (_obj, { root }) =>
    db.item.findUnique({ where: { id: root.id } }).loan(),
  loanHistory: (_obj, { root }) =>
    db.item.findUnique({ where: { id: root.id } }).loanHistory(),
}
