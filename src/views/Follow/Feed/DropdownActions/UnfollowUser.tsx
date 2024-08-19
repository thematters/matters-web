import gql from 'graphql-tag'

import { ReactComponent as IconCircleMinus } from '@/public/static/icons/24px/circle-minus.svg'
import { Icon, Menu, toast, Translate, useMutation } from '~/components'
import {
  updateUserFollowerCount,
  updateViewerFolloweeCount,
} from '~/components/GQL'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import {
  ToggleFollowUserMutation,
  UnfollowActionButtonUserPrivateFragment,
} from '~/gql/graphql'

type UnfollowUserActionButtonProps = {
  user: UnfollowActionButtonUserPrivateFragment
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
  const [unfollow] = useMutation<ToggleFollowUserMutation>(TOGGLE_FOLLOW_USER, {
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
      text={
        <Translate
          zh_hant={`取消追蹤 ${user.displayName}`}
          zh_hans={`取消追踪 ${user.displayName}`}
        />
      }
      icon={<Icon icon={IconCircleMinus} size={20} />}
      onClick={async () => {
        await unfollow()

        toast.success({
          message: (
            <Translate
              zh_hant={`已取消追蹤 ${user.displayName}`}
              zh_hans={`已取消追踪 ${user.displayName}`}
            />
          ),
        })
      }}
    />
  )
}

UnfollowUserActionButton.fragments = fragments

export default UnfollowUserActionButton
