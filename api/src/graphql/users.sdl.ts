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

  type Mutation {
    modifyUserRole(id: Int!, input: ModifyUserRoleInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth(roles: ["L2", "L3"])
  }
`
