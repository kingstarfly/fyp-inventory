export const schema = gql`
  type ItemGroup {
    id: Int!
    name: String!
    description: String!
    category: String!
    quantity: Int!
  }

  type Query {
    itemGroups: [ItemGroup!]! @requireAuth
    itemGroup(id: Int!): ItemGroup @requireAuth
  }

  input CreateItemGroupInput {
    name: String!
    description: String!
    category: String!
    quantity: Int!
  }

  input UpdateItemGroupInput {
    name: String
    description: String
    category: String
    quantity: Int
  }

  type Mutation {
    createItemGroup(input: CreateItemGroupInput!): ItemGroup! @requireAuth
    updateItemGroup(id: Int!, input: UpdateItemGroupInput!): ItemGroup!
      @requireAuth
    deleteItemGroup(id: Int!): ItemGroup! @requireAuth
  }
`
