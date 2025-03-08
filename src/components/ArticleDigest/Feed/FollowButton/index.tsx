import gql from 'graphql-tag'
import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconDot } from '@/public/static/icons/dot.svg'
import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Icon, TextIcon, useMutation, ViewerContext } from '~/components'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import {
  ArticleFeedFollowButtonUserPrivateFragment,
  ToggleFollowUserMutation,
} from '~/gql/graphql'

interface FollowButtonProps {
  user: Partial<ArticleFeedFollowButtonUserPrivateFragment>
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
      cache.evict({ id: cache.identify(user), fieldName: 'following' })
    },
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch()
    },
  })

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

  if (viewer.isInactive || viewer.id === user.id) {
    return null
  }

  if (user.isFollowee) {
    return null
  }

  return (
    <TextIcon
      icon={<Icon icon={IconDot} color="greyDark" />}
      color="green"
      size={14}
      spacing={0}
    >
      <button type="button" onClick={onClick}>
        <FormattedMessage defaultMessage="Follow" id="ieGrWo" />
      </button>
    </TextIcon>
  )
}

FollowButton.fragments = fragments

export default FollowButton
