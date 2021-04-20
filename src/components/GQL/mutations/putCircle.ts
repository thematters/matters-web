import { gql } from '@apollo/client'

export default gql`
  mutation PutCircle($input: PutCircleInput!) {
    putCircle(input: $input) {
      id
      name
      displayName
      description
      avatar
      cover
      prices {
        id
        amount
        currency
      }
    }
  }
`
