export const schema = gql`
  type Item {
    id: Int!
    name: String!
    itemStatus: String!
    isAsset: Boolean!
    block: String!
    floor: String!
    room: String!
    subIndex: String
    remarks: String
    imageBlobBase64: String
    loan: Loan
    loanHistory: LoanHistory
  }

  type ItemSummary {
    name: String!
    qtyTotal: Int!
    qtyAvailable: Int!
    qtyInUse: Int!
    qtyWriteOff: Int!
    qtyOnLoan: Int!
    imgUrl: String
  }

  type Query {
    item(id: Int!): Item @requireAuth
    items: [Item!]! @requireAuth

    itemSummaries: [ItemSummary!]! @requireAuth
  }

  input CreateItemInput {
    name: String!
    itemStatus: String!
    isAsset: Boolean!
    block: String!
    floor: String!
    room: String!
    subIndex: String
    remarks: String
    imageBlobBase64: String
  }

  input UpdateItemInput {
    name: String
    itemStatus: String
    isAsset: Boolean
    block: String
    floor: String
    room: String
    subIndex: String
    remarks: String
    imageBlobBase64: String
  }

  type Mutation {
    createManyItems(input: CreateItemInput!, quantity: Int!): [Int!]!
      @requireAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
    deleteItems(ids: [Int!]!): [Int!]! @requireAuth
  }
`
