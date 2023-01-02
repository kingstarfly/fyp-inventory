export const schema = gql`
  type User {
    id: Int!
    email: String!
    roles: String!
    createdAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input ModifyUserRoleInput {
    roles: String
  }

  input ChangePasswordInput {
    password: String!
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    modifyUserRole(id: Int!, input: ModifyUserRoleInput!): User! @requireAuth
    changePassword(id: Int!, input: ChangePasswordInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth(roles: ["L2", "L3"])
    createUser(input: CreateUserInput!): User! @requireAuth(roles: ["L2", "L3"])
  }
`
