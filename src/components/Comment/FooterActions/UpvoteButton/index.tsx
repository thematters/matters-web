import { gql } from '@apollo/client'

import { Button, IconUpVote, IconUpVoteActive, TextIcon } from '~/components'
import { useMutation } from '~/components/GQL'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT,
} from '~/components/GQL/mutations/voteComment'

import { numAbbr } from '~/common/utils'

import { UnvoteComment } from '~/components/GQL/mutations/__generated__/UnvoteComment'
import { VoteComment } from '~/components/GQL/mutations/__generated__/VoteComment'
import { UpvoteCommentPrivate } from './__generated__/UpvoteCommentPrivate'
import { UpvoteCommentPublic } from './__generated__/UpvoteCommentPublic'

interface UpvoteButtonProps {
  comment: UpvoteCommentPublic & Partial<UpvoteCommentPrivate>
  onClick?: () => void
  disabled?: boolean
  inCard: boolean
}

const fragments = {
  comment: {
    public: gql`
      fragment UpvoteCommentPublic on Comment {
        id
        upvotes
        downvotes
      }
    `,
    private: gql`
      fragment UpvoteCommentPrivate on Comment {
        id
        myVote
      }
    `,
  },
}

const UpvoteButton = ({
  comment,
  onClick,
  disabled,
  inCard,
}: UpvoteButtonProps) => {
  const [unvote] = useMutation<UnvoteComment>(UNVOTE_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unvoteComment: {
        id: comment.id,
        upvotes: comment.upvotes - 1,
        downvotes: comment.downvotes,
        myVote: null,
        __typename: 'Comment',
      },
    },
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
        __typename: 'Comment',
      },
    },
  })

  if (comment.myVote === 'up') {
    return (
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
        onClick={() => {
          onClick ? onClick() : unvote()
        }}
        disabled={disabled}
        aira-label="取消點讚"
      >
        <TextIcon icon={<IconUpVoteActive />} color="green" weight="md">
          {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
      onClick={() => {
        onClick ? onClick() : upvote()
      }}
      disabled={disabled}
      aira-label="點讚"
    >
      <TextIcon icon={<IconUpVote color="grey" />} color="grey" weight="md">
        {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
      </TextIcon>
    </Button>
  )
}

UpvoteButton.fragments = fragments

export default UpvoteButton
