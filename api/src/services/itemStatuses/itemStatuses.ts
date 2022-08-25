import type {
  QueryResolvers,
  MutationResolvers,
  ItemStatusResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const itemStatuses: QueryResolvers['itemStatuses'] = () => {
  return db.itemStatus.findMany()
}

export const itemStatus: QueryResolvers['itemStatus'] = ({ id }) => {
  return db.itemStatus.findUnique({
    where: { id },
  })
}

export const createItemStatus: MutationResolvers['createItemStatus'] = ({
  input,
}) => {
  return db.itemStatus.create({
    data: input,
  })
}

export const updateItemStatus: MutationResolvers['updateItemStatus'] = ({
  id,
  input,
}) => {
  return db.itemStatus.update({
    data: input,
    where: { id },
  })
}

export const deleteItemStatus: MutationResolvers['deleteItemStatus'] = ({
  id,
}) => {
  return db.itemStatus.delete({
    where: { id },
  })
}

export const ItemStatus: ItemStatusResolvers = {
  loan: (_obj, { root }) =>
    db.itemStatus.findUnique({ where: { id: root.id } }).loan(),
  item: (_obj, { root }) =>
    db.itemStatus.findUnique({ where: { id: root.id } }).item(),
}
