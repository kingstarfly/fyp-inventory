export const schema = gql`
  type LoanHistory {
    id: Int!
    loans: [Loan]!
    item: Item!
    itemId: Int!
  }

  type Query {
    loanHistories: [LoanHistory!]! @requireAuth
    loanHistory(id: Int!): LoanHistory @requireAuth
  }

  input CreateLoanHistoryInput {
    itemId: Int!
  }

  input UpdateLoanHistoryInput {
    itemId: Int
  }

  type Mutation {
    createLoanHistory(input: CreateLoanHistoryInput!): LoanHistory! @requireAuth
    updateLoanHistory(id: Int!, input: UpdateLoanHistoryInput!): LoanHistory!
      @requireAuth
    deleteLoanHistory(id: Int!): LoanHistory! @requireAuth
  }
`
