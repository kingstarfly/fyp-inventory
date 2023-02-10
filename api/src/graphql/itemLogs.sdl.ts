export const schema = gql`
  type ItemLog {
    id: Int!
    content: String!
    createdAt: DateTime!
    itemId: Int!
    item: Item!
  }

  type Query {
    itemLogs(itemId: Int!): [ItemLog!]! @requireAuth
    itemLog(id: Int!): ItemLog @requireAuth
  }

  input CreateItemLogInput {
    content: String!
    itemId: Int!
  }

  type Mutation {
    createItemLog(input: CreateItemLogInput!): ItemLog! @requireAuth
    deleteItemLog(id: Int!): ItemLog! @requireAuth
  }
`
