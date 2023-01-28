import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    Promise.all([db.user.create({ data: newUser() })])
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

// email is "admin@admin.com"
// password is "admin"

const newUser = (): Prisma.UserCreateArgs['data'] => {
  return {
    id: 1,
    email: 'admin@admin.com',
    roles: 'L3',
    salt: 'salt123',
    hashedPassword:
      '8349a4f3abae8c9ba3bf69bf90dbf2924df2bb2bd340fb5874350c42828291ce',
  }
}
