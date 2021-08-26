import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
import { useState } from 'react'

import {
  Button,
  TextIcon,
  Translate,
  useMutation,
  withIcon,
} from '~/components'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { ReactComponent as IconProfileUnfollow } from '@/public/static/icons/48px/profile-unfollow.svg'

import { ToggleFollowUser } from '~/components/GQL/mutations/__generated__/ToggleFollowUser'
import { FollowButtonUserPrivate } from './__generated__/FollowButtonUserPrivate'

interface UnfollowProps {
  user: Partial<FollowButtonUserPrivate>
  inProfile?: boolean
}

const UnfollowUser = ({ user, inProfile }: UnfollowProps) => {
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<ToggleFollowUser>(TOGGLE_FOLLOW_USER, {
    variables: { id: user.id, enabled: false },
    optimisticResponse:
      !_isNil(user.id) && !_isNil(user.isFollower)
        ? {
            toggleFollowUser: {
              id: user.id,
              isFollowee: false,
              isFollower: user.isFollower,
              __typename: 'User',
            },
          }
        : undefined,
    update: (cache) => {
      const userName = _get(user, 'userName', null)
      updateUserFollowerCount({ cache, type: 'decrement', userName })
      updateViewerFolloweeCount({ cache, type: 'decrement' })
    },
  })

  return (
    <Button
      size={inProfile ? undefined : ['3.25rem', '1.5rem']}
      textColor="white"
      bgColor={inProfile ? 'grey' : 'green'}
      bgActiveColor={inProfile ? undefined : 'red'}
      onClick={() => unfollow()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {inProfile && withIcon(IconProfileUnfollow)({ size: 'xl' })}
      {!inProfile && (
        <TextIcon weight="md" size="xs">
          {hover ? <Translate id="unfollow" /> : <Translate id="followed" />}
        </TextIcon>
      )}
    </Button>
  )
}

export default UnfollowUser
