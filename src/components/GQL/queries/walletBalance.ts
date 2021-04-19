import { gql } from '@apollo/client'

export default gql`
  query WalletBalance {
    viewer {
      id
      wallet {
        balance {
          HKD
        }
        stripeAccount {
          id
        }
      }
    }
  }
`
