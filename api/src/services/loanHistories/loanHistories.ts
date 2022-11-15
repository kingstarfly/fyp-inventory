import type {
  QueryResolvers,
  MutationResolvers,
  LoanHistoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const loanHistories: QueryResolvers['loanHistories'] = () => {
  return db.loanHistory.findMany()
}

export const loanHistory: QueryResolvers['loanHistory'] = ({ id }) => {
  return db.loanHistory.findUnique({
    where: { id },
  })
}

export const createLoanHistory: MutationResolvers['createLoanHistory'] = ({
  input,
}) => {
  return db.loanHistory.create({
    data: input,
  })
}

export const updateLoanHistory: MutationResolvers['updateLoanHistory'] = ({
  id,
  input,
}) => {
  return db.loanHistory.update({
    data: input,
    where: { id },
  })
}

export const deleteLoanHistory: MutationResolvers['deleteLoanHistory'] = ({
  id,
}) => {
  return db.loanHistory.delete({
    where: { id },
  })
}

export const LoanHistory: LoanHistoryRelationResolvers = {
  loans: (_obj, { root }) =>
    db.loanHistory.findUnique({ where: { id: root.id } }).loans(),
  item: (_obj, { root }) =>
    db.loanHistory.findUnique({ where: { id: root.id } }).item(),
}
