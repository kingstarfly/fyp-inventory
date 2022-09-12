export const schema = gql`
  type Item {
    id: Int!
    name: String!
    itemStatus: String!
    category: String!
    block: String!
    floor: String!
    room: String!
    subIndex: String
    description: String
    imageBlobBase64: String
    loan: Loan
    loanHistory: LoanHistory
  }

  type Query {
    items: [Item!]! @requireAuth
    item(id: Int!): Item @requireAuth
  }

  input CreateItemInput {
    name: String!
    itemStatus: String!
    category: String!
    block: String!
    floor: String!
    room: String!
    subIndex: String
    description: String
    imageBlobBase64: String
  }

  input UpdateItemInput {
    name: String
    itemStatus: String
    category: String
    block: String
    floor: String
    room: String
    subIndex: String
    description: String
    imageBlobBase64: String
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item! @requireAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
    deleteItems(ids: [Int!]!): [Int!]! @requireAuth
  }
`
