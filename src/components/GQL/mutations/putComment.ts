import gql from 'graphql-tag'

export default gql`
  mutation PutComment($input: PutCommentInput!) {
    putComment(input: $input) {
      id
      content
    }
  }
`
