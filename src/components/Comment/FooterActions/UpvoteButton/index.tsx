import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import { numAbbr } from '~/common/utils'
import {
  Button,
  IconUpVote16,
  IconUpVoted16,
  TextIcon,
  useMutation,
} from '~/components'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT,
} from '~/components/GQL/mutations/voteComment'
import {
  UnvoteCommentMutation,
  UpvoteCommentPrivateFragment,
  UpvoteCommentPublicFragment,
  VoteCommentMutation,
} from '~/gql/graphql'

interface UpvoteButtonProps {
  comment: UpvoteCommentPublicFragment & Partial<UpvoteCommentPrivateFragment>
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
  const intl = useIntl()

  const [unvote] = useMutation<UnvoteCommentMutation>(UNVOTE_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unvoteComment: {
        id: comment.id,
        upvotes: comment.upvotes - 1,
        downvotes: 0,
        myVote: null,
        __typename: 'Comment',
      },
    },
  })
  const [upvote] = useMutation<VoteCommentMutation>(VOTE_COMMENT, {
    variables: { id: comment.id, vote: 'up' },
    optimisticResponse: {
      voteComment: {
        id: comment.id,
        upvotes: comment.upvotes + 1,
        downvotes: 0,
        myVote: 'up' as any,
        __typename: 'Comment',
      },
    },
  })

  if (comment.myVote === 'up') {
    return (
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
        onClick={() => {
          onClick ? onClick() : unvote()
        }}
        disabled={disabled}
        aria-label={intl.formatMessage({
          defaultMessage: 'Undo upvote',
          id: 'z3uIHQ',
        })}
      >
        <TextIcon icon={<IconUpVoted16 />} color="green" weight="md">
          {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
      onClick={() => {
        onClick ? onClick() : upvote()
      }}
      disabled={disabled}
      aria-label={intl.formatMessage({
        defaultMessage: 'Upvote',
        id: 'ZD+vm/',
      })}
    >
      <TextIcon icon={<IconUpVote16 color="grey" />} color="grey" weight="md">
        {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
      </TextIcon>
    </Button>
  )
}

UpvoteButton.fragments = fragments

export default UpvoteButton
