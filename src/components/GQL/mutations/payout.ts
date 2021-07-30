import gql from 'graphql-tag'

export default gql`
  mutation Payout(
    $amount: amount_Float_NotNull_exclusiveMin_0!
    $password: String!
  ) {
    payout(input: { amount: $amount, password: $password }) {
      id
      state
    }
  }
`
