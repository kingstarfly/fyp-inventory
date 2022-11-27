export const schema = gql`
  type Item {
    id: Int!
    name: String!
    itemStatus: String!
    assetType: String!
    block: String!
    floor: String!
    room: String!
    subIndex: String
    remarks: String
    imageBlobBase64: String
    loan: Loan
    loanHistory: LoanHistory
  }

  type Query {
    items: [Item!]! @requireAuth
  }
`
