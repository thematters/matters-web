import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import { OPEN_UNIVERSAL_AUTH_DIALOG } from '~/common/enums'
import {
  Button,
  ButtonHeight,
  ButtonSpacingX,
  ButtonSpacingY,
  ButtonWidth,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
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

interface FollowUserProps {
  user: Partial<FollowButtonUserPrivateFragment>
  size: FollowUserButtonSize
}

const FollowUser = ({ user, size }: FollowUserProps) => {
  const viewer = useContext(ViewerContext)

  const [follow] = useMutation<ToggleFollowUserMutation>(TOGGLE_FOLLOW_USER, {
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

  const onClick = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
      return
    }

    follow()
  }

  return (
    <Button
      size={sizes[size]}
      spacing={spacings[size]}
      textColor="green"
      textActiveColor="greenDark"
      borderColor="green"
      borderActiveColor="greenDark"
      onClick={onClick}
    >
      <TextIcon
        weight="md"
        size={size === 'xl' ? 'md' : size === 'lg' ? 'sm' : 'xs'}
      >
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default FollowUser
