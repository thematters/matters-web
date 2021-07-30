import gql from 'graphql-tag'

import {
  IconRemove24,
  Menu,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { ADD_TOAST } from '~/common/enums'

import { ToggleFollowUser } from '~/components/GQL/mutations/__generated__/ToggleFollowUser'
import { UnfollowActionButtonUserPrivate } from './__generated__/UnfollowActionButtonUserPrivate'

type UnfollowUserActionButtonProps = {
  user: UnfollowActionButtonUserPrivate
}

const fragments = {
  user: {
    private: gql`
      fragment UnfollowActionButtonUserPrivate on User {
        id
        userName
        displayName
        isFollower
        isFollowee
      }
    `,
  },
}

const UnfollowUserActionButton = ({ user }: UnfollowUserActionButtonProps) => {
  const [unfollow] = useMutation<ToggleFollowUser>(TOGGLE_FOLLOW_USER, {
    variables: { id: user.id, enabled: false },
    optimisticResponse: {
      toggleFollowUser: {
        id: user.id,
        isFollowee: false,
        isFollower: user.isFollower,
        __typename: 'User',
      },
    },
    update: (cache) => {
      if (user.userName) {
        updateUserFollowerCount({
          cache,
          type: 'decrement',
          userName: user.userName,
        })
      }
      updateViewerFolloweeCount({ cache, type: 'decrement' })
    },
  })

  return (
    <Menu.Item
      onClick={async () => {
        await unfollow()

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate
                  zh_hant={`已取消追蹤 ${user.displayName}`}
                  zh_hans={`已取消追踪 ${user.displayName}`}
                />
              ),
            },
          })
        )
      }}
    >
      <TextIcon icon={<IconRemove24 size="md" />} size="md" spacing="base">
        <Translate
          zh_hant={`取消追蹤 ${user.displayName}`}
          zh_hans={`取消追踪 ${user.displayName}`}
        />
      </TextIcon>
    </Menu.Item>
  )
}

UnfollowUserActionButton.fragments = fragments

export default UnfollowUserActionButton
