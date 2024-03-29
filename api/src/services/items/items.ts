import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const items: QueryResolvers['items'] = () => {
  return db.item.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      itemLogs: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          itemId: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}

export const itemSummaries: QueryResolvers['itemSummaries'] = async () => {
  // Use prisma to group by name and count the number of items.
  const result = await db.item.groupBy({
    by: ['name', 'itemStatus', 'imageBlobBase64'],
    _count: {
      _all: true,
    },
    orderBy: {
      name: 'asc',
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
  let whereSpecifier = {}
  if (id.includes('*') || id.includes('-')) {
    // Legacy ID looks like "*6201012839-0*".
    whereSpecifier = { legacyId: id }
  } else {
    // Normal ID looks like "123456789"
    whereSpecifier = { id: parseInt(id) }
  }

  return db.item.findUnique({
    where: whereSpecifier,
    include: {
      itemLogs: true,
    },
  })
}

export const createManyItems: MutationResolvers['createManyItems'] = async ({
  input,
  quantity,
}) => {
  const createdItemIds = []
  try {
    await Promise.all(
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
    console.log('createdItemIds', createdItemIds)
    return createdItemIds
  } catch (error) {
    console.log('error', error)
    return []
  }
}

export const updateItem: MutationResolvers['updateItem'] = ({ id, input }) => {
  return db.item.update({
    data: input,
    where: { id },
  })
}

export const deleteItem: MutationResolvers['deleteItem'] = ({ id }) => {
  requireAuth({ roles: ['L2', 'L3'] })

  return db.item.delete({
    where: { id },
  })
}

export const deleteItems: MutationResolvers['deleteItems'] = ({ ids }) => {
  requireAuth({ roles: ['L2', 'L3'] })

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
