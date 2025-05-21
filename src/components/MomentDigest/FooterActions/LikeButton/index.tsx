import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext, useState } from 'react'
import { useIntl } from 'react-intl'

import { ReactComponent as IconLike } from '@/public/static/icons/24px/like.svg'
import { ReactComponent as IconLikeFill } from '@/public/static/icons/24px/like-fill.svg'
import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics, numAbbr } from '~/common/utils'
import { Button, useMutation, ViewerContext } from '~/components'
import {
  LIKE_MOMENT,
  UNLIKE_MOMENT,
} from '~/components/GQL/mutations/likeMoment'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'
import {
  LikeMomentMutation,
  MomentDigestFooterActionsLikeButtonMomentPrivateFragment,
  MomentDigestFooterActionsLikeButtonMomentPublicFragment,
  UnlikeMomentMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface LikeButtonProps {
  moment: MomentDigestFooterActionsLikeButtonMomentPublicFragment &
    Partial<MomentDigestFooterActionsLikeButtonMomentPrivateFragment>
  iconSize?: 20 | 22
}

const fragments = {
  moment: {
    public: gql`
      fragment MomentDigestFooterActionsLikeButtonMomentPublic on Moment {
        id
        likeCount
      }
    `,
    private: gql`
      fragment MomentDigestFooterActionsLikeButtonMomentPrivate on Moment {
        id
        liked
      }
    `,
  },
}

const LikeButton = ({ moment, iconSize = 20 }: LikeButtonProps) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { likeCount, liked } = moment

  const [playHeartBeat, setPlayHeartBeat] = useState(false)

  const [likeMoment] = useMutation<LikeMomentMutation>(LIKE_MOMENT, {
    variables: { id: moment.id },
    optimisticResponse: {
      likeMoment: {
        id: moment.id,
        likeCount: moment.likeCount + 1,
        liked: true,
        __typename: 'Moment',
      },
    },
  })

  const [unlikeMoment] = useMutation<UnlikeMomentMutation>(UNLIKE_MOMENT, {
    variables: { id: moment.id },
    optimisticResponse: {
      unlikeMoment: {
        id: moment.id,
        likeCount: moment.likeCount - 1,
        liked: false,
        __typename: 'Moment',
      },
    },
  })

  const likeClassNames = classNames({
    [styles[`size${iconSize}`]]: true,
    [styles.heartBeat]: playHeartBeat,
  })

  if (liked) {
    return (
      <Button
        spacing={[8, 8]}
        onClick={() => {
          unlikeMoment()
          setPlayHeartBeat(false)
        }}
        aria-label={intl.formatMessage({
          defaultMessage: 'Unlike moment',
          id: 'tZKvnZ',
        })}
      >
        <TextIcon
          icon={
            <span className={likeClassNames}>
              <Icon icon={IconLikeFill} color="redLight" size={iconSize} />
            </span>
          }
          color="black"
          size={14}
        >
          {likeCount > 0 ? numAbbr(likeCount) : undefined}
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      spacing={[8, 8]}
      textColor="black"
      textActiveColor="greyDarker"
      onClick={() => {
        if (!viewer.isAuthed) {
          window.dispatchEvent(
            new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
              detail: { trigger: UNIVERSAL_AUTH_TRIGGER.momentLike },
            })
          )
          return
        }

        analytics.trackEvent('click_button', {
          type: 'moment_like',
        })

        likeMoment()
        setPlayHeartBeat(true)
      }}
      aria-label={intl.formatMessage({
        defaultMessage: 'Like moment',
        id: 'mBkZcw',
      })}
    >
      <TextIcon icon={<Icon icon={IconLike} size={iconSize} />} size={14}>
        {likeCount > 0 ? numAbbr(likeCount) : undefined}
      </TextIcon>
    </Button>
  )
}

LikeButton.fragments = fragments

export default LikeButton
