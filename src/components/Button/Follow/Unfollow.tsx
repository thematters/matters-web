import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'

import { Button, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import { FollowButtonUser } from './__generated__/FollowButtonUser'
import { UnfollowUser } from './__generated__/UnfollowUser'

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: ID!) {
    unfollowUser(input: { id: $id }) {
      id
      isFollowee
      isFollower
    }
  }
`

const Unfollow = ({
  user,
  isLarge
}: {
  user: FollowButtonUser
  isLarge?: boolean
}) => {
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<UnfollowUser>(UNFOLLOW_USER, {
    variables: { id: user.id },
    optimisticResponse: {
      unfollowUser: {
        id: user.id,
        isFollowee: false,
        isFollower: user.isFollower,
        __typename: 'User'
      }
    },
    update: cache => {
      const userName = _get(user, 'userName', null)
      updateUserFollowerCount({ cache, type: 'decrement', userName })
      updateViewerFolloweeCount({ cache, type: 'decrement' })
    }
  })

  return (
    <Button
      size={isLarge ? ['6rem', '2rem'] : ['4rem', '1.5rem']}
      textColor="white"
      bgColor="green"
      bgHoverColor="red"
      onClick={(e: React.MouseEvent) => {
        unfollow()
        analytics.trackEvent(ANALYTICS_EVENTS.UNFOLLOW_USER, {
          id: user.id
        })
        e.stopPropagation()
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextIcon weight="md" size={isLarge ? 'sm' : 'xs'}>
        {hover ? (
          <Translate
            zh_hant={TEXT.zh_hant.unfollow}
            zh_hans={TEXT.zh_hans.unfollow}
          />
        ) : (
          <Translate
            zh_hant={TEXT.zh_hant.followed}
            zh_hans={TEXT.zh_hans.followed}
          />
        )}
      </TextIcon>
    </Button>
  )
}

export default Unfollow
