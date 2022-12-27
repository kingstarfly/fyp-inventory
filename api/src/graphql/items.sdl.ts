export const schema = gql`
  type Item {
    id: Int!
    legacyId: String
    name: String!
    itemStatus: String!
    assetType: String!

    block: String!
    floor: String!
    room: String!
    subIndex: String

    remarks: String
    imageBlobBase64: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ItemSummary {
    name: String!
    qtyTotal: Int!
    qtyAvailable: Int!
    qtyReserved: Int!
    qtyLoaned: Int!
    qtyFaulty: Int!
    qtyWriteOff: Int!
    imgUrl: String
  }

  type Query {
    # id is a String here because legacy ID is a string. When resolving the query, if isLegacyId is false, then convert the id to an Int since the database stores it as an Int. If not, then use the id as is since legacyId is a string.
    item(id: String!, isLegacyId: Boolean): Item @requireAuth
    items: [Item!]! @requireAuth

    itemSummaries: [ItemSummary!]! @requireAuth
  }

  input CreateItemInput {
    legacyId: String
    name: String!
    itemStatus: String!
    assetType: String!

    block: String!
    floor: String!
    room: String!
    subIndex: String

    remarks: String
    imageBlobBase64: String
  }

  input UpdateItemInput {
    legacyId: String
    name: String
    itemStatus: String
    assetType: String
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
