import { gql } from '@apollo/client'

export default gql`
  mutation PutComment($input: PutCommentInput!) {
    putComment(input: $input) {
      id
      content
    }
  }
`
