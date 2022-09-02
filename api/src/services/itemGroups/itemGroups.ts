import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const itemGroups: QueryResolvers['itemGroups'] = () => {
  return db.itemGroup.findMany()
}

export const itemGroup: QueryResolvers['itemGroup'] = ({ id }) => {
  return db.itemGroup.findUnique({
    where: { id },
  })
}

export const createItemGroup: MutationResolvers['createItemGroup'] = ({
  input,
}) => {
  return db.itemGroup.create({
    data: input,
  })
}

export const updateItemGroup: MutationResolvers['updateItemGroup'] = ({
  id,
  input,
}) => {
  return db.itemGroup.update({
    data: input,
    where: { id },
  })
}

export const deleteItemGroup: MutationResolvers['deleteItemGroup'] = ({
  id,
}) => {
  return db.itemGroup.delete({
    where: { id },
  })
}
