import _isNil from 'lodash/isNil'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Button,
  ButtonHeight,
  ButtonSpacingX,
  ButtonSpacingY,
  ButtonWidth,
  TextIcon,
  useMutation,
  ViewerContext,
} from '~/components'
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
  const viewer = useContext(ViewerContext)

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
      // decrement user's followers count
      cache.modify({
        id: cache.identify(user),
        fields: {
          followers: (existingFollowers) => {
            // Check if existingFollowers exists
            if (!existingFollowers) {
              return existingFollowers
            }

            return {
              ...existingFollowers,
              totalCount: existingFollowers.totalCount - 1,
            }
          },
        },
      })

      // decrement viewer's following count
      cache.modify({
        id: cache.identify(viewer),
        fields: {
          following: (existingFollowing) => {
            const usersFieldName = 'users({"input":{"first":0}})'
            const usersData = existingFollowing[usersFieldName]

            // Create a new object with the updated count
            return {
              ...existingFollowing,
              [usersFieldName]: {
                ...usersData,
                totalCount: usersData.totalCount - 1,
              },
            }
          },
        },
      })
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
    md: [0, 12],
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
        weight="medium"
        size={size === 'xl' ? 16 : size === 'lg' ? 14 : 12}
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
