import type {
  QueryResolvers,
  MutationResolvers,
  ItemResolvers,
} from 'types/graphql'

import sharp from 'sharp'

import { db } from 'src/lib/db'

export const items: QueryResolvers['items'] = () => {
  return db.item.findMany()
}

export const item: QueryResolvers['item'] = ({ id }) => {
  return db.item.findUnique({
    where: { id },
  })
}

export const createItem: MutationResolvers['createItem'] = async ({
  input,
}) => {
  const { image, ...restOfInput } = input
  const uri = image.split(';base64,').pop()
  const buffer = Buffer.from(uri, 'base64')
  const resizedImageBuf = await sharp(buffer).resize(150, null).toBuffer()

  return db.item.create({
    data: {
      ...restOfInput,
      thumbnailUrl: `data:image/png;base64,${resizedImageBuf.toString(
        'base64'
      )}`,
    },
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

export const Item: ItemResolvers = {
  storageLocation: (_obj, { root }) =>
    db.item.findUnique({ where: { id: root.id } }).storageLocation(),
  itemStatus: (_obj, { root }) =>
    db.item.findUnique({ where: { id: root.id } }).itemStatus(),
}
