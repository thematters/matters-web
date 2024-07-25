import gql from 'graphql-tag'

export const LIKE_COLLECTION = gql`
  mutation likeCollection($id: ID!) {
    likeCollection(input: { id: $id }) {
      id
      likeCount
      liked
    }
  }
`

export const UNLIKE_COLLECTION = gql`
  mutation UnlikeCollection($id: ID!) {
    unlikeCollection(input: { id: $id }) {
      id
      likeCount
      liked
    }
  }
`