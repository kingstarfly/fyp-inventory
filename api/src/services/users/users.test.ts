import type { User } from '@prisma/client'
import { ServiceValidationError } from '@redwoodjs/api'
import { ForbiddenError, RedwoodGraphQLError } from '@redwoodjs/graphql-server'

import {
  users,
  user,
  createUser,
  modifyUserRole,
  deleteUser,
  changePassword,
} from './users'
import type { StandardScenario } from './users.scenarios'

const CryptoJS = require('crypto-js')

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async (scenario: StandardScenario) => {
    mockCurrentUser((await user({ id: scenario.user.three.id })) as User)
    const fakePassword = 'fakePassword'

    const result = await createUser({
      input: {
        email: 'String6623709',
        password: fakePassword,
      },
    })

    expect(result.email).toEqual('String6623709')
    expect(result.salt).toEqual(expect.any(String))

    const expectedHashedPassword = CryptoJS.PBKDF2(fakePassword, result.salt, {
      keySize: 256 / 32,
    }).toString()

    expect(result.hashedPassword).toEqual(expectedHashedPassword)
  })

  scenario(
    "L3 user modifies a L1 user's role to L2",
    async (scenario: StandardScenario) => {
      // Mock L3 user in order to modify another user's role
      mockCurrentUser((await user({ id: scenario.user.three.id })) as User)

      const original = (await user({ id: scenario.user.one.id })) as User

      expect(original.roles).not.toEqual('L2')

      const result = await modifyUserRole({
        id: original.id,
        input: { roles: 'L2' },
      })

      expect(result.roles).toEqual('L2')
    }
  )

  scenario(
    "L3 user fails to modify a L1 user's role to L3",
    async (scenario: StandardScenario) => {
      // Mock L3 user in order to modify another user's role
      mockCurrentUser((await user({ id: scenario.user.three.id })) as User)

      const original = (await user({ id: scenario.user.one.id })) as User

      expect(original.roles).not.toEqual('L3')

      try {
        await modifyUserRole({
          id: original.id,
          input: { roles: 'L3' },
        })
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceValidationError)
        expect(error.message).toEqual(
          'You cannot change the role of a user to be an equal or higher role'
        )
      }
    }
  )

  scenario(
    "L2 user failes to modifiy a L3 user's role",
    async (scenario: StandardScenario) => {
      mockCurrentUser((await user({ id: scenario.user.two.id })) as User)

      const original = (await user({ id: scenario.user.three.id })) as User

      try {
        await modifyUserRole({
          id: original.id,
          input: { roles: 'L2' },
        })
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenError)
        expect(error.message).toEqual("You don't have access to do that.")
      }
    }
  )

  scenario(
    'user fails to change their own user role',
    async (scenario: StandardScenario) => {
      mockCurrentUser((await user({ id: scenario.user.three.id })) as User)

      try {
        await modifyUserRole({
          id: scenario.user.three.id,
          input: { roles: 'L2' },
        })
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceValidationError)
        expect(error.message).toEqual('You cannot change your own role')
      }
    }
  )

  scenario(
    'user changes their own password',
    async (scenario: StandardScenario) => {
      mockCurrentUser((await user({ id: scenario.user.one.id })) as User)

      const newPassword = 'newPassword'
      const updatedUser = await changePassword({
        id: scenario.user.one.id,
        input: { password: newPassword },
      })

      const expectedHashedPassword = CryptoJS.PBKDF2(
        newPassword,
        updatedUser.salt,
        {
          keySize: 256 / 32,
        }
      ).toString()

      expect(updatedUser.hashedPassword).not.toEqual(
        scenario.user.one.hashedPassword
      )

      expect(updatedUser.hashedPassword).toEqual(expectedHashedPassword)
    }
  )

  scenario(
    "user fails to change another user's password",
    async (scenario: StandardScenario) => {
      mockCurrentUser((await user({ id: scenario.user.one.id })) as User)

      const newPassword = 'newPassword'

      try {
        await changePassword({
          id: scenario.user.two.id,
          input: { password: newPassword },
        })
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceValidationError)
        expect(error.message).toEqual(
          'You cannot change the password of another user'
        )
      }
    }
  )

  scenario('deletes a user', async (scenario: StandardScenario) => {
    mockCurrentUser((await user({ id: scenario.user.three.id })) as User)

    const original = (await deleteUser({ id: scenario.user.one.id })) as User
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
