import type {
  QueryResolvers,
  MutationResolvers,
  ItemLogRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const itemLogs: QueryResolvers['itemLogs'] = ({ itemId }) => {
  return db.itemLog.findMany({
    where: {
      itemId: itemId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const itemLog: QueryResolvers['itemLog'] = ({ id }) => {
  return db.itemLog.findUnique({
    where: { id },
  })
}

export const createItemLog: MutationResolvers['createItemLog'] = ({
  input,
}) => {
  return db.itemLog.create({
    data: input,
  })
}

export const deleteItemLog: MutationResolvers['deleteItemLog'] = ({ id }) => {
  return db.itemLog.delete({
    where: { id },
  })
}

export const ItemLog: ItemLogRelationResolvers = {
  item: (_obj, { root }) => {
    return db.itemLog.findUnique({ where: { id: root?.id } }).item()
  },
}
