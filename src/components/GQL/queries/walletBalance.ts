import gql from 'graphql-tag'

export default gql`
  query WalletBalance {
    viewer {
      id
      wallet {
        balance {
          HKD
        }
      }
    }
  }
`
