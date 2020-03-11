import gql from 'graphql-tag'

import { Button, Icon, TextIcon } from '~/components'
import { useMutation } from '~/components/GQL'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT
} from '~/components/GQL/mutations/voteComment'

import { numAbbr } from '~/common/utils'

import { UnvoteComment } from '~/components/GQL/mutations/__generated__/UnvoteComment'
import { VoteComment } from '~/components/GQL/mutations/__generated__/VoteComment'
import { DownvoteComment } from './__generated__/DownvoteComment'

interface DownvoteButtonProps {
  comment: DownvoteComment
  onClick?: () => void
  disabled?: boolean
  inCard: boolean
}

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

const DownvoteButton = ({
  comment,
  onClick,
  disabled,
  inCard
}: DownvoteButtonProps) => {
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
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor={inCard ? 'grey-lighter-active' : 'green-lighter'}
        onClick={() => {
          onClick ? onClick() : unvote()
        }}
        disabled={disabled}
        aria-label="取消點踩"
      >
        <TextIcon icon={<Icon.DownVoteActive />} color="green" weight="md">
          {comment.downvotes > 0 ? numAbbr(comment.downvotes) : undefined}
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'grey-lighter-active' : 'green-lighter'}
      onClick={() => {
        onClick ? onClick() : downvote()
      }}
      disabled={disabled}
      aria-label="點踩"
    >
      <TextIcon icon={<Icon.DownVote color="grey" />} color="grey" weight="md">
        {comment.downvotes > 0 ? numAbbr(comment.downvotes) : undefined}
      </TextIcon>
    </Button>
  )
}

DownvoteButton.fragments = fragments

export default DownvoteButton
