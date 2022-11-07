import gql from 'graphql-tag'
import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import {
  IconDotDivider,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'

import { ToggleFollowUser } from '~/components/GQL/mutations/__generated__/ToggleFollowUser'
import { ArticleFeedFollowButtonUserPrivate } from './__generated__/ArticleFeedFollowButtonUserPrivate'

interface FollowButtonProps {
  user: Partial<ArticleFeedFollowButtonUserPrivate>
}

const fragments = {
  user: {
    private: gql`
      fragment ArticleFeedFollowButtonUserPrivate on User {
        id
        isFollower
        isFollowee
      }
    `,
  },
}

const FollowButton = ({ user }: FollowButtonProps) => {
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

  const onClick = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { source: UNIVERSAL_AUTH_SOURCE.bookmark },
        })
      )
      return
    }

    follow()
  }

  if (viewer.isInactive || viewer.id === user.id) {
    return null
  }

  if (user.isFollowee) {
    return null
  }

  return (
    <TextIcon
      icon={<IconDotDivider color="grey-dark" />}
      color="green"
      size="sm"
      spacing={0}
    >
      <button type="button" onClick={onClick}>
        <Translate id="follow" />
      </button>
    </TextIcon>
  )
}

FollowButton.fragments = fragments

export default FollowButton
