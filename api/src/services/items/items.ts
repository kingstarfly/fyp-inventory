import type {
  QueryResolvers,
  MutationResolvers,
  ItemResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const items: QueryResolvers['items'] = () => {
  return db.item.findMany()
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

export const Item: ItemResolvers = {
  loan: (_obj, { root }) =>
    db.item.findUnique({ where: { id: root.id } }).loan(),
  loanHistory: (_obj, { root }) =>
    db.item.findUnique({ where: { id: root.id } }).loanHistory(),
}
