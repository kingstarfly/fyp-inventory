import type {
  QueryResolvers,
  MutationResolvers,
  StorageLocationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const storageLocations: QueryResolvers['storageLocations'] = () => {
  return db.storageLocation.findMany()
}

export const storageLocation: QueryResolvers['storageLocation'] = ({ id }) => {
  return db.storageLocation.findUnique({
    where: { id },
  })
}

export const createStorageLocation: MutationResolvers['createStorageLocation'] =
  ({ input }) => {
    return db.storageLocation.create({
      data: input,
    })
  }

export const updateStorageLocation: MutationResolvers['updateStorageLocation'] =
  ({ id, input }) => {
    return db.storageLocation.update({
      data: input,
      where: { id },
    })
  }

export const deleteStorageLocation: MutationResolvers['deleteStorageLocation'] =
  ({ id }) => {
    return db.storageLocation.delete({
      where: { id },
    })
  }

export const StorageLocation: StorageLocationResolvers = {
  item: (_obj, { root }) =>
    db.storageLocation.findUnique({ where: { id: root.id } }).item(),
}
