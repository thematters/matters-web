import gql from 'graphql-tag'

export const PUT_QUOTE = gql`
  mutation PutQuote($input: PutQuoteInput!) {
    putQuote(input: $input) {
      id
      content
    }
  }
`

export const DELETE_QUOTE = gql`
  mutation DeleteQuote($input: DeleteQuoteInput!) {
    deleteQuote(input: $input)
  }
`
