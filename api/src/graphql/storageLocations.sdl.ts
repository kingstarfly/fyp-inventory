export const schema = gql`
  type StorageLocation {
    id: Int!
    block: String!
    floorSection: String
    room: String
    subIndex: String
    item: Item!
    itemId: Int!
  }

  type Query {
    storageLocations: [StorageLocation!]! @requireAuth
    storageLocation(id: Int!): StorageLocation @requireAuth
  }

  input CreateStorageLocationInput {
    block: String!
    floorSection: String
    room: String
    subIndex: String
    itemId: Int!
  }

  input UpdateStorageLocationInput {
    block: String
    floorSection: String
    room: String
    subIndex: String
    itemId: Int
  }

  type Mutation {
    createStorageLocation(input: CreateStorageLocationInput!): StorageLocation!
      @requireAuth
    updateStorageLocation(
      id: Int!
      input: UpdateStorageLocationInput!
    ): StorageLocation! @requireAuth
    deleteStorageLocation(id: Int!): StorageLocation! @requireAuth
  }
`
