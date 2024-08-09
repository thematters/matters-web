import gql from 'graphql-tag'

export const LIKE_MOMENT = gql`
  mutation LikeMoment($id: ID!) {
    likeMoment(input: { id: $id }) {
      id
      likeCount
      liked
    }
  }
`

export const UNLIKE_MOMENT = gql`
  mutation UnlikeMoment($id: ID!) {
    unlikeMoment(input: { id: $id }) {
      id
      likeCount
      liked
    }
  }
`
