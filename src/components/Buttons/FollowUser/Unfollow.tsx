import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
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
import {
  updateUserFollowerCount,
  updateViewerFolloweeCount,
} from '~/components/GQL'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
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
    xl: ['7.5rem', '2.5rem'],
    lg: ['6rem', '2rem'],
    md: [null, '1.5rem'],
  }
  const spacings: Record<
    FollowUserButtonSize,
    [ButtonSpacingY, ButtonSpacingX]
  > = {
    xl: [0, 0],
    lg: [0, 0],
    md: [0, 'tight'],
  }

  return (
    <Button
      size={sizes[size]}
      spacing={spacings[size]}
      textColor="greyDarker"
      textActiveColor="black"
      borderColor="greyDarker"
      borderActiveColor="black"
      onClick={() => unfollow()}
    >
      <TextIcon
        weight="md"
        size={size === 'xl' ? 'md' : size === 'lg' ? 'sm' : 'xs'}
      >
        <FormattedMessage
          defaultMessage="Followed"
          id="91IQdk"
          description="src/components/Buttons/FollowUser/Unfollow.tsx"
        />
      </TextIcon>
    </Button>
  )
}

export default UnfollowUser
