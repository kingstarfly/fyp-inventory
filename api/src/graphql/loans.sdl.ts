export const schema = gql`
  type Loan {
    id: Int!
    loanedAt: DateTime!
    expectedReturnAt: DateTime!
    returnedAt: DateTime
    remarks: String
    user: User!
    userId: Int!
    loanHistory: LoanHistory!
    loanHistoryId: Int!
    itemStatus: ItemStatus!
    itemStatusId: Int!
  }

  type Query {
    loans: [Loan!]! @requireAuth
    loan(id: Int!): Loan @requireAuth
  }

  input CreateLoanInput {
    loanedAt: DateTime!
    expectedReturnAt: DateTime!
    returnedAt: DateTime
    remarks: String
    userId: Int!
    loanHistoryId: Int!
    itemStatusId: Int!
  }

  input UpdateLoanInput {
    loanedAt: DateTime
    expectedReturnAt: DateTime
    returnedAt: DateTime
    remarks: String
    userId: Int
    loanHistoryId: Int
    itemStatusId: Int
  }

  type Mutation {
    createLoan(input: CreateLoanInput!): Loan! @requireAuth
    updateLoan(id: Int!, input: UpdateLoanInput!): Loan! @requireAuth
    deleteLoan(id: Int!): Loan! @requireAuth
  }
`