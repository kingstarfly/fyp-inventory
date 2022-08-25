export const schema = gql`
  type ItemStatus {
    id: Int!
    status: String!
    loan: Loan
    item: Item!
    itemId: Int!
  }

  type Query {
    itemStatuses: [ItemStatus!]! @requireAuth
    itemStatus(id: Int!): ItemStatus @requireAuth
  }

  input CreateItemStatusInput {
    status: String!
    itemId: Int!
  }

  input UpdateItemStatusInput {
    status: String
    itemId: Int
  }

  type Mutation {
    createItemStatus(input: CreateItemStatusInput!): ItemStatus! @requireAuth
    updateItemStatus(id: Int!, input: UpdateItemStatusInput!): ItemStatus!
      @requireAuth
    deleteItemStatus(id: Int!): ItemStatus! @requireAuth
  }
`
