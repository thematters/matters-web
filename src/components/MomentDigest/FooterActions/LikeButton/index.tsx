import classNames from 'classnames'
import gql from 'graphql-tag'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { ReactComponent as IconLike } from '@/public/static/icons/24px/like.svg'
import { ReactComponent as IconLikeFill } from '@/public/static/icons/24px/like-fill.svg'
import { numAbbr } from '~/common/utils'
import { Button, useMutation } from '~/components'
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

const LikeButton = ({ moment }: LikeButtonProps) => {
  const intl = useIntl()
  const { likeCount, liked } = moment

  const [playHeartBeat, setPlayHeartBeat] = useState(false)

  const [likeMoment] = useMutation<LikeMomentMutation>(LIKE_MOMENT, {
    variables: { id: moment.id },
  })

  const [unlikeMoment] = useMutation<UnlikeMomentMutation>(UNLIKE_MOMENT, {
    variables: { id: moment.id },
  })

  const likeClassNames = classNames({
    [styles.like]: true,
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
              <Icon icon={IconLikeFill} color="redLight" size={18} />
            </span>
          }
          color="black"
          size={15}
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
        likeMoment()
        setPlayHeartBeat(true)
      }}
      aria-label={intl.formatMessage({
        defaultMessage: 'Like moment',
        id: 'mBkZcw',
      })}
    >
      <TextIcon icon={<Icon icon={IconLike} size={18} />} size={15}>
        {likeCount > 0 ? numAbbr(likeCount) : undefined}
      </TextIcon>
    </Button>
  )
}

LikeButton.fragments = fragments

export default LikeButton
