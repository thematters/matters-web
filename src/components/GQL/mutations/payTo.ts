import { gql } from '@apollo/client'

export default gql`
  mutation PayTo(
    $amount: PositiveFloat!
    $currency: TransactionCurrency!
    $purpose: TransactionPurpose!
    $recipientId: ID!
    $targetId: ID
    $password: String
  ) {
    payTo(
      input: {
        amount: $amount
        currency: $currency
        purpose: $purpose
        recipientId: $recipientId
        targetId: $targetId
        password: $password
      }
    ) {
      transaction {
        id
        state
      }
      redirectUrl
    }
  }
`
