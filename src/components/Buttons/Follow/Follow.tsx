import _get from 'lodash/get'
import _isNil from 'lodash/isNil'

import {
  Button,
  ButtonHeight,
  ButtonWidth,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { FollowButtonSize } from './index'

import { ToggleFollowUser } from '~/components/GQL/mutations/__generated__/ToggleFollowUser'
import { FollowButtonUserPrivate } from './__generated__/FollowButtonUserPrivate'

interface FollowProps {
  user: Partial<FollowButtonUserPrivate>
  size: FollowButtonSize
}

const Follow = ({ user, size }: FollowProps) => {
  const [follow] = useMutation<ToggleFollowUser>(TOGGLE_FOLLOW_USER, {
    variables: { id: user.id, enabled: true },
    optimisticResponse:
      !_isNil(user.id) && !_isNil(user.isFollower)
        ? {
            toggleFollowUser: {
              id: user.id,
              isFollowee: true,
              isFollower: user.isFollower,
              __typename: 'User',
            },
          }
        : undefined,
    update: (cache) => {
      const userName = _get(user, 'userName', null)
      updateUserFollowerCount({ cache, type: 'increment', userName })
      updateViewerFolloweeCount({ cache, type: 'increment' })
    },
  })

  const sizes: Record<FollowButtonSize, [ButtonWidth, ButtonHeight]> = {
    lg: ['6rem', '2rem'],
    md: ['4rem', '1.5rem'],
    'md-s': ['3rem', '1.5rem'],
  }

  return (
    <Button
      size={sizes[size]}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={follow}
    >
      <TextIcon weight="md" size={size === 'lg' ? 'sm' : 'xs'}>
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default Follow
