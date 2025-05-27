import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import IconVoteDown from '@/public/static/icons/24px/vote-down.svg'
import IconVoteDownFill from '@/public/static/icons/24px/vote-down-fill.svg'
import { Button, Icon, TextIcon, useMutation } from '~/components'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT,
} from '~/components/GQL/mutations/voteComment'
import {
  CircleCommentDownvoteCommentPrivateFragment,
  CircleCommentDownvoteCommentPublicFragment,
  UnvoteCommentMutation,
  Vote,
  VoteCommentMutation,
} from '~/gql/graphql'

interface DownvoteButtonProps {
  comment: CircleCommentDownvoteCommentPublicFragment &
    Partial<CircleCommentDownvoteCommentPrivateFragment>
  onClick?: () => void
  disabled?: boolean
  inCard: boolean
}

const fragments = {
  comment: {
    public: gql`
      fragment CircleCommentDownvoteCommentPublic on Comment {
        id
        upvotes
        downvotes
      }
    `,
    private: gql`
      fragment CircleCommentDownvoteCommentPrivate on Comment {
        id
        myVote
      }
    `,
  },
}

const DownvoteButton = ({
  comment,
  onClick,
  disabled,
  inCard,
}: DownvoteButtonProps) => {
  const intl = useIntl()

  const [unvote] = useMutation<UnvoteCommentMutation>(UNVOTE_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unvoteComment: {
        id: comment.id,
        upvotes: comment.upvotes,
        downvotes: 0,
        myVote: null,
        __typename: 'Comment',
      },
    },
  })
  const [downvote] = useMutation<VoteCommentMutation>(VOTE_COMMENT, {
    variables: { id: comment.id, vote: 'down' },
    optimisticResponse: {
      voteComment: {
        id: comment.id,
        upvotes:
          comment.myVote === 'up' ? comment.upvotes - 1 : comment.upvotes,
        downvotes: 0,
        myVote: Vote.Down,
        __typename: 'Comment',
      },
    },
  })

  if (comment.myVote === 'down') {
    return (
      <Button
        spacing={[8, 8]}
        bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
        onClick={() => {
          onClick ? onClick() : unvote()
        }}
        disabled={disabled}
        aria-label={intl.formatMessage({
          defaultMessage: 'Undo downvote',
          id: 'qlxeW+',
        })}
      >
        <TextIcon
          icon={<Icon icon={IconVoteDownFill} />}
          color="green"
          weight="medium"
        >
          {/* comment.downvotes > 0 ? numAbbr(comment.downvotes) : undefined */}
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      spacing={[8, 8]}
      bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
      onClick={() => {
        onClick ? onClick() : downvote()
      }}
      disabled={disabled}
      aria-label={intl.formatMessage({
        defaultMessage: 'Downvote',
        id: 'ZZ9zIR',
      })}
    >
      <TextIcon
        icon={<Icon icon={IconVoteDown} color="grey" />}
        color="grey"
        weight="medium"
      >
        {/* comment.downvotes > 0 ? numAbbr(comment.downvotes) : undefined */}
      </TextIcon>
    </Button>
  )
}

DownvoteButton.fragments = fragments

export default DownvoteButton
