import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Mutation } from 'react-apollo'

import { Icon } from '~/components'

import ICON_DISLIKE_ACTIVE from '~/static/icons/dislike-active.svg?sprite'
import ICON_DISLIKE_INACTIVE from '~/static/icons/dislike-inactive.svg?sprite'

import { DownvoteComment } from './__generated__/DownvoteComment'

const DOWNVOTE_COMMENT = gql`
  mutation voteComment($id: ID!) {
    voteComment(input: { vote: down, id: $id }) {
      id
      upvotes
      downvotes
      myVote
    }
  }
`

const UNVOTE_COMMENT = gql`
  mutation unvoteComment($id: ID!) {
    unvoteComment(input: { id: $id }) {
      id
      upvotes
      downvotes
      myVote
    }
  }
`

const fragments = {
  comment: gql`
    fragment DownvoteComment on Comment {
      id
      upvotes
      downvotes
      myVote
    }
  `
}

const IconDislikeInactive = () => (
  <Icon
    id={ICON_DISLIKE_INACTIVE.id}
    viewBox={ICON_DISLIKE_INACTIVE.viewBox}
    size="small"
  />
)
const IconDislikeActive = () => (
  <Icon
    id={ICON_DISLIKE_ACTIVE.id}
    viewBox={ICON_DISLIKE_ACTIVE.viewBox}
    size="small"
  />
)

const DownvoteButton = ({
  comment,
  disabled
}: {
  comment: DownvoteComment
  disabled?: boolean
}) => {
  if (comment.myVote === 'down') {
    return (
      <Mutation
        mutation={UNVOTE_COMMENT}
        variables={{ id: comment.id }}
        optimisticResponse={{
          unvoteComment: {
            id: comment.id,
            myVote: null,
            __typename: 'Comment'
          }
        }}
      >
        {(unvote, { data }) => (
          <button type="button" onClick={() => unvote()} disabled={disabled}>
            <IconDislikeActive />
          </button>
        )}
      </Mutation>
    )
  }

  return (
    <Mutation
      mutation={DOWNVOTE_COMMENT}
      variables={{ id: comment.id }}
      optimisticResponse={{
        voteComment: {
          id: comment.id,
          myVote: 'down',
          __typename: 'Comment'
        }
      }}
    >
      {(downvote, { data }) => (
        <button type="button" onClick={() => downvote()} disabled={disabled}>
          <IconDislikeInactive />
        </button>
      )}
    </Mutation>
  )
}

DownvoteButton.fragments = fragments

export default DownvoteButton
