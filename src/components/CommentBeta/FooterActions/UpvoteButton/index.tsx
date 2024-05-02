import gql from 'graphql-tag'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import Lottie, { EventListener } from 'react-lottie'

import { ReactComponent as IconLike } from '@/public/static/icons/24px/like.svg'
import { ReactComponent as IconLikeFill } from '@/public/static/icons/24px/like-fill.svg'
import hearPulsData from '@/public/static/json/heart-puls.json'
import { numAbbr } from '~/common/utils'
import { Button, Icon, TextIcon, useMutation } from '~/components'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT,
} from '~/components/GQL/mutations/voteComment'
import {
  UnvoteCommentMutation,
  UpvoteCommentBetaPrivateFragment,
  UpvoteCommentBetaPublicFragment,
  VoteCommentMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface UpvoteButtonProps {
  comment: UpvoteCommentBetaPublicFragment &
    Partial<UpvoteCommentBetaPrivateFragment>
  onClick?: () => void
  disabled?: boolean
  inCard: boolean
}

const fragments = {
  comment: {
    public: gql`
      fragment UpvoteCommentBetaPublic on Comment {
        id
        upvotes
      }
    `,
    private: gql`
      fragment UpvoteCommentBetaPrivate on Comment {
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
  const [playHeartPuls, setPlayHeartPuls] = useState(false)
  const [heartPulsDone, setHeartPulsDone] = useState(false)

  const heartPulsListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      setHeartPulsDone(true)
    },
  }

  const LottieOptions = {
    loop: false,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    animationData: hearPulsData,
    isClickToPauseDisabled: true,
    height: 18,
    width: 18,
  }

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
        spacing={[8, 8]}
        onClick={() => {
          if (onClick) {
            onClick()
          } else {
            unvote()
            setHeartPulsDone(false)
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
            heartPulsDone || !playHeartPuls ? (
              <Icon icon={IconLikeFill} color="redLight" size={18} />
            ) : (
              <span className={styles.heart}>
                <Lottie
                  options={LottieOptions}
                  eventListeners={[heartPulsListener]}
                />
              </span>
            )
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
        if (onClick) {
          onClick()
        } else {
          upvote()
          setPlayHeartPuls(true)
        }
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
