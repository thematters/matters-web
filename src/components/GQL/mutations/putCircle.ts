import gql from 'graphql-tag'

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
