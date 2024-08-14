import gql from 'graphql-tag'

export default gql`
  mutation PayTo(
    $amount: amount_Float_NotNull_exclusiveMin_0!
    $currency: TransactionCurrency!
    $purpose: TransactionPurpose!
    $recipientId: ID!
    $targetId: ID
    $password: String
    $chain: Chain
    $txHash: String
    $id: ID
  ) {
    payTo(
      input: {
        amount: $amount
        currency: $currency
        purpose: $purpose
        recipientId: $recipientId
        targetId: $targetId
        password: $password
        chain: $chain
        txHash: $txHash
        id: $id
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
