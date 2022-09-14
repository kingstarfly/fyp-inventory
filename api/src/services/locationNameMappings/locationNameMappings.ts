import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const locationNameMappings: QueryResolvers['locationNameMappings'] =
  () => {
    return db.locationNameMapping.findMany()
  }

export const locationNameMapping: QueryResolvers['locationNameMapping'] = ({
  id,
}) => {
  return db.locationNameMapping.findUnique({
    where: { id },
  })
}

export const createLocationNameMapping: MutationResolvers['createLocationNameMapping'] =
  ({ input }) => {
    return db.locationNameMapping.create({
      data: input,
    })
  }

export const updateLocationNameMapping: MutationResolvers['updateLocationNameMapping'] =
  ({ id, input }) => {
    return db.locationNameMapping.update({
      data: input,
      where: { id },
    })
  }

export const deleteLocationNameMapping: MutationResolvers['deleteLocationNameMapping'] =
  ({ id }) => {
    return db.locationNameMapping.delete({
      where: { id },
    })
  }
