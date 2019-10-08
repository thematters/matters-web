import gql from 'graphql-tag'

export const VOTE_COMMENT = gql`
  mutation VoteComment($id: ID!) {
    voteComment(input: { vote: up, id: $id }) {
      id
      upvotes
      downvotes
      myVote
    }
  }
`

export const UNVOTE_COMMENT = gql`
  mutation UnvoteComment($id: ID!) {
    unvoteComment(input: { id: $id }) {
      id
      upvotes
      downvotes
      myVote
    }
  }
`
