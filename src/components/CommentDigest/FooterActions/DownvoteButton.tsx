import gql from 'graphql-tag'

import { Icon, TextIcon } from '~/components'
import { useMutation } from '~/components/GQL'
import { UnvoteComment } from '~/components/GQL/mutations/__generated__/UnvoteComment'
import { VoteComment } from '~/components/GQL/mutations/__generated__/VoteComment'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT
} from '~/components/GQL/mutations/voteComment'

import { numAbbr } from '~/common/utils'
import ICON_DISLIKE_ACTIVE from '~/static/icons/dislike-active.svg?sprite'
import ICON_DISLIKE_INACTIVE from '~/static/icons/dislike-inactive.svg?sprite'

import { DownvoteComment } from './__generated__/DownvoteComment'

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
  const [unvote] = useMutation<UnvoteComment>(UNVOTE_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unvoteComment: {
        id: comment.id,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes - 1,
        myVote: null,
        __typename: 'Comment'
      }
    }
  })
  const [downvote] = useMutation<VoteComment>(VOTE_COMMENT, {
    variables: { id: comment.id, vote: 'down' },
    optimisticResponse: {
      voteComment: {
        id: comment.id,
        upvotes:
          comment.myVote === 'up' ? comment.upvotes - 1 : comment.upvotes,
        downvotes: comment.downvotes + 1,
        myVote: 'down' as any,
        __typename: 'Comment'
      }
    }
  })

  if (comment.myVote === 'down') {
    return (
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
    )
  }

  return (
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
  )
}

DownvoteButton.fragments = fragments

export default DownvoteButton
