import gql from 'graphql-tag'

export default gql`
  mutation Payout($amount: PositiveFloat!, $password: String!) {
    payout(input: { amount: $amount, password: $password }) {
      id
      state
    }
  }
`
