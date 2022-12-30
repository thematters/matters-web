import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import {
  Button,
  ButtonHeight,
  ButtonWidth,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { ToggleFollowUser } from '~/components/GQL/mutations/__generated__/ToggleFollowUser'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { FollowButtonUserPrivate } from './__generated__/FollowButtonUserPrivate'
import { FollowUserButtonSize } from './index'

interface FollowUserProps {
  user: Partial<FollowButtonUserPrivate>
  size: FollowUserButtonSize
}

const FollowUser = ({ user, size }: FollowUserProps) => {
  const viewer = useContext(ViewerContext)

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

  const sizes: Record<FollowUserButtonSize, [ButtonWidth, ButtonHeight]> = {
    lg: ['6rem', '2rem'],
    md: ['4rem', '1.5rem'],
    'md-s': ['3rem', '1.5rem'],
  }

  const onClick = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { source: UNIVERSAL_AUTH_SOURCE.followUser },
        })
      )
      return
    }

    follow()
  }

  return (
    <Button
      size={sizes[size]}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={onClick}
    >
      <TextIcon weight="md" size={size === 'lg' ? 'sm' : 'xs'}>
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default FollowUser
