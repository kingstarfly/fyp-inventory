export const schema = gql`
  type User {
    id: Int!
    email: String!
    passwordHash: String!
    salt: String!
    resetToken: String
    resetTokenExpireAt: DateTime
    roles: String!
    firstName: String
    lastName: String
    createdAt: DateTime!
    loans: [Loan]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    passwordHash: String!
    salt: String!
    resetToken: String
    resetTokenExpireAt: DateTime
    roles: String!
    firstName: String
    lastName: String
  }

  input UpdateUserInput {
    email: String
    passwordHash: String
    salt: String
    resetToken: String
    resetTokenExpireAt: DateTime
    roles: String
    firstName: String
    lastName: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
