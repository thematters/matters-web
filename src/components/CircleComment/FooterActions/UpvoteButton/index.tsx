import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import IconLike from '@/public/static/icons/24px/like.svg'
import IconLikeFill from '@/public/static/icons/24px/like-fill.svg'
import IconVoteUp from '@/public/static/icons/24px/vote-up.svg'
import IconVoteUpFill from '@/public/static/icons/24px/vote-up-fill.svg'
import { numAbbr } from '~/common/utils'
import {
  Button,
  CircleCommentFormType,
  Icon,
  TextIcon,
  useMutation,
} from '~/components'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT,
} from '~/components/GQL/mutations/voteComment'
import {
  CircleCommentUpvoteCommentPrivateFragment,
  CircleCommentUpvoteCommentPublicFragment,
  UnvoteCommentMutation,
  Vote,
  VoteCommentMutation,
} from '~/gql/graphql'

interface UpvoteButtonProps {
  comment: CircleCommentUpvoteCommentPublicFragment &
    Partial<CircleCommentUpvoteCommentPrivateFragment>
  type?: CircleCommentFormType
  onClick?: () => void
  disabled?: boolean
  inCard: boolean
}

const fragments = {
  comment: {
    public: gql`
      fragment CircleCommentUpvoteCommentPublic on Comment {
        id
        upvotes
        downvotes
      }
    `,
    private: gql`
      fragment CircleCommentUpvoteCommentPrivate on Comment {
        id
        myVote
      }
    `,
  },
}

const UpvoteButton = ({
  comment,
  type,
  onClick,
  disabled,
  inCard,
}: UpvoteButtonProps) => {
  const intl = useIntl()

  // campaign discussion uses a heart (like) instead of the circle up-vote arrow
  const isLike = type === 'campaignDiscussion'

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
        myVote: Vote.Up,
        __typename: 'Comment',
      },
    },
  })

  if (comment.myVote === 'up') {
    return (
      <Button
        spacing={[8, 8]}
        bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
        onClick={() => {
          if (onClick) {
            onClick()
          } else {
            unvote()
          }
        }}
        disabled={disabled}
        aria-label={intl.formatMessage({
          defaultMessage: 'Undo upvote',
          id: 'z3uIHQ',
        })}
      >
        <TextIcon
          icon={
            <Icon
              icon={isLike ? IconLikeFill : IconVoteUpFill}
              color={isLike ? 'redLight' : undefined}
            />
          }
          color={isLike ? 'black' : 'green'}
          weight="medium"
        >
          {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      spacing={[8, 8]}
      bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
      onClick={() => {
        if (onClick) {
          onClick()
        } else {
          upvote()
        }
      }}
      disabled={disabled}
      aria-label={intl.formatMessage({
        defaultMessage: 'Upvote',
        id: 'ZD+vm/',
      })}
    >
      <TextIcon
        icon={<Icon icon={isLike ? IconLike : IconVoteUp} color="grey" />}
        color="grey"
        weight="medium"
      >
        {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
      </TextIcon>
    </Button>
  )
}

UpvoteButton.fragments = fragments

export default UpvoteButton
