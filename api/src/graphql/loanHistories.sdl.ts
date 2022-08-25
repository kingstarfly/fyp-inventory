export const schema = gql`
  type LoanHistory {
    id: Int!
    loans: [Loan]!
    loanId: Int!
  }

  type Query {
    loanHistories: [LoanHistory!]! @requireAuth
    loanHistory(id: Int!): LoanHistory @requireAuth
  }

  input CreateLoanHistoryInput {
    loanId: Int!
  }

  input UpdateLoanHistoryInput {
    loanId: Int
  }

  type Mutation {
    createLoanHistory(input: CreateLoanHistoryInput!): LoanHistory! @requireAuth
    updateLoanHistory(id: Int!, input: UpdateLoanHistoryInput!): LoanHistory!
      @requireAuth
    deleteLoanHistory(id: Int!): LoanHistory! @requireAuth
  }
`
