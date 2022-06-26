import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
import { useState } from 'react'

import {
  Button,
  ButtonHeight,
  ButtonWidth,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { FollowUserButtonSize } from './index'

import { ToggleFollowUser } from '~/components/GQL/mutations/__generated__/ToggleFollowUser'
import { FollowButtonUserPrivate } from './__generated__/FollowButtonUserPrivate'

interface UnfollowProps {
  user: Partial<FollowButtonUserPrivate>
  size: FollowUserButtonSize
}

const UnfollowUser = ({ user, size }: UnfollowProps) => {
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

  const sizes: Record<FollowUserButtonSize, [ButtonWidth, ButtonHeight]> = {
    lg: ['6rem', '2rem'],
    md: ['4rem', '1.5rem'],
    'md-s': ['4rem', '1.5rem'],
  }

  return (
    <Button
      size={sizes[size]}
      // spacing={['xxtight', 'xtight']}
      textColor="white"
      bgColor="green"
      bgActiveColor="red"
      onClick={() => unfollow()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextIcon weight="md" size={size === 'lg' ? 'sm' : 'xs'}>
        {hover ? <Translate id="unfollow" /> : <Translate id="followed" />}
      </TextIcon>
    </Button>
  )
}

export default UnfollowUser
