import classNames from 'classnames'
import gql from 'graphql-tag'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import IconLike from '@/public/static/icons/24px/like.svg'
import IconLikeFill from '@/public/static/icons/24px/like-fill.svg'
import { analytics, numAbbr } from '~/common/utils'
import { Button, useMutation } from '~/components'
import {
  LIKE_COLLECTION,
  UNLIKE_COLLECTION,
} from '~/components/GQL/mutations/likeCollection'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'
import {
  CollectionLikeButtonPrivateFragment,
  CollectionLikeButtonPublicFragment,
  LikeCollectionMutation,
  UnlikeCollectionMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface LikeButtonProps {
  collection: CollectionLikeButtonPublicFragment &
    Partial<CollectionLikeButtonPrivateFragment>
  iconSize?: 20 | 22
  onClick?: () => void
}

const fragments = {
  collection: {
    public: gql`
      fragment CollectionLikeButtonPublic on Collection {
        id
        likeCount
      }
    `,
    private: gql`
      fragment CollectionLikeButtonPrivate on Collection {
        id
        liked
      }
    `,
  },
}

const LikeButton = ({
  collection,
  onClick,
  iconSize = 20,
}: LikeButtonProps) => {
  const intl = useIntl()
  const { likeCount, liked } = collection

  const [playHeartBeat, setPlayHeartBeat] = useState(false)

  const [likeCollection] = useMutation<LikeCollectionMutation>(
    LIKE_COLLECTION,
    {
      variables: { id: collection.id },
      optimisticResponse: {
        likeCollection: {
          id: collection.id,
          likeCount: collection.likeCount + 1,
          liked: true,
          __typename: 'Collection',
        },
      },
    }
  )

  const [unlikeCollection] = useMutation<UnlikeCollectionMutation>(
    UNLIKE_COLLECTION,
    {
      variables: { id: collection.id },
      optimisticResponse: {
        unlikeCollection: {
          id: collection.id,
          likeCount: collection.likeCount - 1,
          liked: false,
          __typename: 'Collection',
        },
      },
    }
  )

  const [handleLike, handleUnlike] = [
    () => {
      analytics.trackEvent('click_button', {
        type: 'collection_like',
      })
      likeCollection()
      setPlayHeartBeat(true)
    },
    () => {
      unlikeCollection()
      setPlayHeartBeat(false)
    },
  ]

  const likeClassNames = classNames({
    [styles[`size${iconSize}`]]: true,
    [styles.heartBeat]: playHeartBeat,
  })

  if (liked) {
    return (
      <Button
        spacing={[8, 8]}
        onClick={onClick || handleUnlike}
        aria-label={intl.formatMessage({
          defaultMessage: 'Unlike collection',
          id: '9aorag',
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
      onClick={onClick || handleLike}
      aria-label={intl.formatMessage({
        defaultMessage: 'Like collection',
        id: '8YgVvt',
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
