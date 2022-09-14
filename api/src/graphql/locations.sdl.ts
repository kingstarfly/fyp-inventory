export const schema = gql`
  type Location {
    id: Int!
    locationName: String!
    block: String!
    floor: String!
    room: String!
  }

  type Query {
    locations: [Location!]! @requireAuth
    location(id: Int!): Location @requireAuth
  }

  input CreateLocationInput {
    locationName: String!
    block: String!
    floor: String!
    room: String!
  }

  input UpdateLocationInput {
    locationName: String
    block: String
    floor: String
    room: String
  }

  type Mutation {
    createLocation(input: CreateLocationInput!): Location! @requireAuth
    updateLocation(id: Int!, input: UpdateLocationInput!): Location!
      @requireAuth
    deleteLocation(id: Int!): Location! @requireAuth
  }
`
