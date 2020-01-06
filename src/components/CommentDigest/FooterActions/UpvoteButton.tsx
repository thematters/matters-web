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

const UpvoteButton = ({
  comment,
  onClick,
  disabled
}: {
  comment: UpvoteComment
  onClick?: () => any
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
      <button
        type="button"
        onClick={() => {
          onClick ? onClick() : unvote()
        }}
        disabled={disabled}
      >
        <TextIcon
          icon={<Icon.LikeActive />}
          color="grey"
          weight="medium"
          text={numAbbr(comment.upvotes)}
          spacing="xxxtight"
        />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        onClick ? onClick() : upvote()
      }}
      disabled={disabled}
    >
      <TextIcon
        icon={<Icon.LikeInactive />}
        color="grey"
        weight="medium"
        text={numAbbr(comment.upvotes)}
        spacing="xxxtight"
      />
    </button>
  )
}

UpvoteButton.fragments = fragments

export default UpvoteButton
