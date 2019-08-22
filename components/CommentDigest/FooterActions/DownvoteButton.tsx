import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon } from '~/components'
import { Mutation } from '~/components/GQL'

import { numAbbr } from '~/common/utils'
import ICON_DISLIKE_ACTIVE from '~/static/icons/dislike-active.svg?sprite'
import ICON_DISLIKE_INACTIVE from '~/static/icons/dislike-inactive.svg?sprite'

import { DownvoteComment } from './__generated__/DownvoteComment'

const DOWNVOTE_COMMENT = gql`
  mutation VoteComment($id: ID!) {
    voteComment(input: { vote: down, id: $id }) {
      id
      upvotes
      downvotes
      myVote
    }
  }
`

const UNVOTE_COMMENT = gql`
  mutation UnvoteComment($id: ID!) {
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
            <TextIcon
              icon={<IconDislikeActive />}
              color="grey"
              weight="medium"
              text={numAbbr(comment.downvotes)}
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
          <TextIcon
            icon={<IconDislikeInactive />}
            color="grey"
            weight="medium"
            text={numAbbr(comment.downvotes)}
            size="sm"
            spacing="xxxtight"
          />
        </button>
      )}
    </Mutation>
  )
}

DownvoteButton.fragments = fragments

export default DownvoteButton
