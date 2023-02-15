import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Button,
  ButtonHeight,
  ButtonSpacingX,
  ButtonSpacingY,
  ButtonWidth,
  TextIcon,
  useMutation,
} from '~/components'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'
import {
  FollowButtonUserPrivateFragment,
  ToggleFollowUserMutation,
} from '~/gql/graphql'

import { FollowUserButtonSize } from './index'

interface UnfollowProps {
  user: Partial<FollowButtonUserPrivateFragment>
  size: FollowUserButtonSize
}

const UnfollowUser = ({ user, size }: UnfollowProps) => {
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<ToggleFollowUserMutation>(TOGGLE_FOLLOW_USER, {
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
    md: [null, '1.5rem'],
  }
  const spacings: Record<
    FollowUserButtonSize,
    [ButtonSpacingY, ButtonSpacingX]
  > = {
    lg: [0, 0],
    md: [0, 'tight'],
  }

  return (
    <Button
      size={sizes[size]}
      spacing={spacings[size]}
      textColor="white"
      bgColor="green"
      bgActiveColor="red"
      onClick={() => unfollow()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextIcon weight="md" size={size === 'lg' ? 'sm' : 'xs'}>
        {hover ?
          <FormattedMessage defaultMessage="Unfollow" description="src/components/Buttons/FollowUser/Unfollow.tsx" />
          : <FormattedMessage defaultMessage="Followed" description="src/components/Buttons/FollowUser/Unfollow.tsx" />}
      </TextIcon>
    </Button>
  )
}

export default UnfollowUser
