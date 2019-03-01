import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Mutation } from 'react-apollo'

import { Icon, TextIcon } from '~/components'

import ICON_LIKE_ACTIVE from '~/static/icons/like-active.svg?sprite'
import ICON_LIKE_INACTIVE from '~/static/icons/like-inactive.svg?sprite'

import { UpvoteComment } from './__generated__/UpvoteComment'

const UPVOTE_COMMENT = gql`
  mutation voteComment($id: ID!) {
    voteComment(input: { vote: up, id: $id }) {
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
    fragment UpvoteComment on Comment {
      id
      upvotes
      downvotes
      myVote
    }
  `
}

const IconLikeInactive = () => (
  <Icon
    id={ICON_LIKE_INACTIVE.id}
    viewBox={ICON_LIKE_INACTIVE.viewBox}
    size="small"
  />
)
const IconLikeActive = () => (
  <Icon
    id={ICON_LIKE_ACTIVE.id}
    viewBox={ICON_LIKE_ACTIVE.viewBox}
    size="small"
  />
)

const UpvoteButton = ({
  comment,
  disabled
}: {
  comment: UpvoteComment
  disabled?: boolean
}) => {
  if (comment.myVote === 'up') {
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
            <TextIcon
              icon={<IconLikeActive />}
              color="grey"
              weight="medium"
              text={comment.upvotes}
              size="sm"
              spacing="xxxtight"
            />
          </button>
        )}
      </Mutation>
    )
  }

  return (
    <Mutation
      mutation={UPVOTE_COMMENT}
      variables={{ id: comment.id }}
      optimisticResponse={{
        voteComment: {
          id: comment.id,
          myVote: null,
          __typename: 'Comment'
        }
      }}
    >
      {(upvote, { data }) => (
        <button type="button" onClick={() => upvote()} disabled={disabled}>
          <TextIcon
            icon={<IconLikeInactive />}
            color="grey"
            weight="medium"
            text={comment.upvotes}
            size="sm"
            spacing="xxxtight"
          />
        </button>
      )}
    </Mutation>
  )
}

UpvoteButton.fragments = fragments

export default UpvoteButton
