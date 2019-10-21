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
import ICON_LIKE_ACTIVE from '~/static/icons/like-active.svg?sprite'
import ICON_LIKE_INACTIVE from '~/static/icons/like-inactive.svg?sprite'

import { UpvoteComment } from './__generated__/UpvoteComment'

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
  const [unvote] = useMutation<UnvoteComment>(UNVOTE_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unvoteComment: {
        id: comment.id,
        upvotes: comment.upvotes - 1,
        downvotes: comment.downvotes,
        myVote: null,
        __typename: 'Comment'
      }
    }
  })
  const [upvote] = useMutation<VoteComment>(VOTE_COMMENT, {
    variables: { id: comment.id, vote: 'up' },
    optimisticResponse: {
      voteComment: {
        id: comment.id,
        upvotes: comment.upvotes + 1,
        downvotes:
          comment.myVote === 'down' ? comment.downvotes - 1 : comment.downvotes,
        myVote: 'up' as any,
        __typename: 'Comment'
      }
    }
  })

  if (comment.myVote === 'up') {
    return (
      <button type="button" onClick={() => unvote()} disabled={disabled}>
        <TextIcon
          icon={<IconLikeActive />}
          color="grey"
          weight="medium"
          text={numAbbr(comment.upvotes)}
          size="sm"
          spacing="xxxtight"
        />
      </button>
    )
  }

  return (
    <button type="button" onClick={() => upvote()} disabled={disabled}>
      <TextIcon
        icon={<IconLikeInactive />}
        color="grey"
        weight="medium"
        text={numAbbr(comment.upvotes)}
        size="sm"
        spacing="xxxtight"
      />
    </button>
  )
}

UpvoteButton.fragments = fragments

export default UpvoteButton
