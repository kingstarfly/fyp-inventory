export const schema = gql`
  type Item {
    id: Int!
    name: String!
    category: String!
    description: String
    storageLocation: StorageLocation
    itemStatus: ItemStatus
    thumbnailUrl: String
  }

  type Query {
    items: [Item!]! @requireAuth
    item(id: Int!): Item @requireAuth
  }

  input CreateItemInput {
    name: String!
    category: String!
    description: String
    image: String
  }

  input UpdateItemInput {
    name: String
    category: String
    description: String
    image: String
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item! @requireAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`
