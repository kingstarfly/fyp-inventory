import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { validateWith, hashPassword } from '@redwoodjs/api'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany({
    orderBy: {
      id: 'asc',
    },
  })
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
        'You cannot change the role of a user who is of equal or higher role than yourself'
      )
    }

    // Disallow changing to a role that is equal or higher than the current user, unless the current user is L3
    if (
      getRoleLevel(input.roles) !== 3 &&
      getRoleLevel(input.roles) >= getRoleLevel(currentUser.roles)
    ) {
      throw new Error(
        'You cannot change the role of a user to be an equal or higher role than yourself'
      )
    }
  })

  return db.user.update({
    data: input,
    where: { id },
  })
}

export const changePassword: MutationResolvers['changePassword'] = async ({
  id,
  input,
}) => {
  const targetUser = await db.user.findUnique({ where: { id } })
  const currentUser = await db.user.findUnique({
    where: { id: context.currentUser.id },
  })

  validateWith(() => {
    if (targetUser.id !== currentUser.id) {
      throw new Error('You cannot change the password of another user')
    }
  })

  const [hashedPassword, salt] = hashPassword(input.password)

  return db.user.update({
    data: {
      hashedPassword,
      salt,
    },
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = async ({
  input,
}) => {
  requireAuth({ roles: ['L2', 'L3'] })

  const CryptoJS = require('crypto-js')
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString() as string
  const hashedPassword = CryptoJS.PBKDF2(input.password, salt, {
    keySize: 256 / 32,
  }).toString()

  return db.user.create({
    data: {
      email: input.email,
      hashedPassword,
      salt,
      roles: 'L1',
    },
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