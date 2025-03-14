import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
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
  borderWidth?: 'sm' | 'md'
}

const FollowUser = ({ user, size, borderWidth = 'md' }: FollowUserProps) => {
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
    md: [null, '1.625rem'],
  }
  const spacings: Record<
    FollowUserButtonSize,
    [ButtonSpacingY, ButtonSpacingX]
  > = {
    xl: [0, 0],
    lg: [0, 0],
    md: [0, 12],
  }

  const onClick = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.followUser },
        })
      )

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
      borderWidth={borderWidth}
      onClick={onClick}
    >
      <TextIcon
        weight="medium"
        size={size === 'xl' ? 16 : size === 'lg' ? 14 : 12}
      >
        <FormattedMessage
          defaultMessage="Follow"
          id="rJSVni"
          description="src/components/Buttons/FollowUser/Follow.tsx"
        />
      </TextIcon>
    </Button>
  )
}

export default FollowUser
