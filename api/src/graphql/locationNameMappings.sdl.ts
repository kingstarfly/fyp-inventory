export const schema = gql`
  type LocationNameMapping {
    id: Int!
    locationName: String!
    block: String!
    floor: String!
    room: String!
  }

  type Query {
    locationNameMappings: [LocationNameMapping!]! @requireAuth
    locationNameMapping(id: Int!): LocationNameMapping @requireAuth
  }

  input CreateLocationNameMappingInput {
    locationName: String!
    block: String!
    floor: String!
    room: String!
  }

  input UpdateLocationNameMappingInput {
    locationName: String
    block: String
    floor: String
    room: String
  }

  type Mutation {
    createLocationNameMapping(
      input: CreateLocationNameMappingInput!
    ): LocationNameMapping! @requireAuth
    updateLocationNameMapping(
      id: Int!
      input: UpdateLocationNameMappingInput!
    ): LocationNameMapping! @requireAuth
    deleteLocationNameMapping(id: Int!): LocationNameMapping! @requireAuth
  }
`
