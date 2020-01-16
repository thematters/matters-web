import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'

import { Button, Translate } from '~/components'
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
  size = 'sm'
}: {
  user: FollowButtonUser
  size?: 'sm' | 'default'
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
      size={size}
      style={size === 'sm' ? { width: '4rem' } : { width: '5.5rem' }}
      onClick={() => {
        unfollow()
        analytics.trackEvent(ANALYTICS_EVENTS.UNFOLLOW_USER, {
          id: user.id
        })
      }}
      bgColor={hover ? 'red' : 'green'}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
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
    </Button>
  )
}

export default Unfollow
