import { gql } from '@apollo/client'

export const VOTE_COMMENT = gql`
  mutation VoteComment($id: ID!, $vote: Vote!) {
    voteComment(input: { id: $id, vote: $vote }) {
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
