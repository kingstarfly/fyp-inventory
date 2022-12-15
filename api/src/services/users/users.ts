import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { validateWith } from '@redwoodjs/api'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const modifyUserRole: MutationResolvers['modifyUserRole'] = async ({
  id,
  input,
}) => {
  requireAuth({ roles: ['L3'] })

  // Ensure that the user is not trying to change their own role
  // Ensure that the role of the target user is not equal or higher than the role of the current user

  const targetUser = await db.user.findUnique({ where: { id } })
  const currentUser = await db.user.findUnique({
    where: { id: context.currentUser.id },
  })

  validateWith(() => {
    if (targetUser.id === currentUser.id) {
      throw new Error('You cannot change your own role')
    }

    if (getRoleLevel(targetUser.roles) >= getRoleLevel(currentUser.roles)) {
      throw new Error(
        'You cannot change the role of a user with equal or higher role'
      )
    }
  })

  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = async ({ id }) => {
  requireAuth({ roles: ['L3'] })
  const targetUser = await db.user.findUnique({ where: { id } })
  const currentUser = await db.user.findUnique({
    where: { id: context.currentUser.id },
  })

  validateWith(() => {
    if (targetUser.id === currentUser.id) {
      throw new Error('You cannot delete your own account')
    }

    if (getRoleLevel(targetUser.roles) >= getRoleLevel(currentUser.roles)) {
      throw new Error(
        'You cannot delete another user with equal or higher role'
      )
    }
  })

  return db.user.delete({
    where: { id },
  })
}

function getRoleLevel(role: string) {
  return parseInt(role.substring(1))
}