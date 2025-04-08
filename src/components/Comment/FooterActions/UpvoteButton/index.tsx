import classNames from 'classnames'
import gql from 'graphql-tag'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { ReactComponent as IconLike } from '@/public/static/icons/24px/like.svg'
import { ReactComponent as IconLikeFill } from '@/public/static/icons/24px/like-fill.svg'
import { numAbbr } from '~/common/utils'
import { Button, Icon, TextIcon, useMutation } from '~/components'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT,
} from '~/components/GQL/mutations/voteComment'
import {
  CommentUpvoteCommentPrivateFragment,
  CommentUpvoteCommentPublicFragment,
  UnvoteCommentMutation,
  Vote,
  VoteCommentMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface UpvoteButtonProps {
  comment: CommentUpvoteCommentPublicFragment &
    Partial<CommentUpvoteCommentPrivateFragment>
  onClick?: () => void
  disabled?: boolean
  inCard: boolean
}

const fragments = {
  comment: {
    public: gql`
      fragment CommentUpvoteCommentPublic on Comment {
        id
        upvotes
      }
    `,
    private: gql`
      fragment CommentUpvoteCommentPrivate on Comment {
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
  const [playHeartBeat, setPlayHeartBeat] = useState(false)


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

  const likeClassNames = classNames({
    [styles.like]: true,
    [styles.heartBeat]: playHeartBeat,
  })

  if (comment.myVote === 'up') {
    return (
      <Button
        spacing={[8, 8]}
        onClick={() => {
          onClick ? onClick() : unvote()
          setPlayHeartBeat(false)
        }}
        disabled={disabled}
        aria-label={intl.formatMessage({
          defaultMessage: 'Undo upvote',
          id: 'z3uIHQ',
        })}
      >
        <TextIcon
          icon={
            <span className={likeClassNames}>
              <Icon icon={IconLikeFill} color="redLight" size={18} />
            </span>
          }
          color="black"
          size={15}
        >
          {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      spacing={[8, 8]}
      textColor="greyDarker"
      textActiveColor="black"
      onClick={() => {
        onClick ? onClick() : upvote()
        setPlayHeartBeat(true)
      }}
      disabled={disabled}
      aria-label={intl.formatMessage({
        defaultMessage: 'Upvote',
        id: 'ZD+vm/',
      })}
    >
      <TextIcon icon={<Icon icon={IconLike} size={18} />} size={15}>
        {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
      </TextIcon>
    </Button>
  )
}

UpvoteButton.fragments = fragments

export default UpvoteButton
