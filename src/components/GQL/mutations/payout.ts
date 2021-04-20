import { gql } from '@apollo/client'

export default gql`
  mutation Payout($amount: PositiveFloat!, $password: String!) {
    payout(input: { amount: $amount, password: $password }) {
      id
      state
    }
  }
`
