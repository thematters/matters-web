import gql from 'graphql-tag'
import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import { ReactComponent as IconCircleMinus } from '@/public/static/icons/24px/circle-minus.svg'
import {
  Icon,
  Menu,
  toast,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateCircleFollowers } from '~/components/GQL'
import TOGGLE_FOLLOW_CIRCLE from '~/components/GQL/mutations/toggleFollowCircle'
import {
  ToggleFollowCircleMutation,
  UnfollowActionButtonCirclePrivateFragment,
} from '~/gql/graphql'

type UnfollowCircleActionButtonProps = {
  circle: UnfollowActionButtonCirclePrivateFragment
}

const fragments = {
  circle: {
    private: gql`
      fragment UnfollowActionButtonCirclePrivate on Circle {
        id
        name
        displayName
        isFollower
      }
    `,
  },
}

const UnfollowCircleActionButton = ({
  circle,
}: UnfollowCircleActionButtonProps) => {
  const viewer = useContext(ViewerContext)

  const [unfollow] = useMutation<ToggleFollowCircleMutation>(
    TOGGLE_FOLLOW_CIRCLE,
    {
      variables: { id: circle.id, enabled: false },
      optimisticResponse: {
        toggleFollowCircle: {
          id: circle.id,
          isFollower: false,
          __typename: 'Circle',
        },
      },
      update: (cache) => {
        updateCircleFollowers({
          cache,
          type: 'unfollow',
          name: circle.name,
          viewer,
        })
      },
    }
  )

  return (
    <Menu.Item
      text={
        <Translate
          zh_hant={`取消關注 ${circle.displayName}`}
          zh_hans={`取消关注 ${circle.displayName}`}
        />
      }
      icon={<Icon icon={IconCircleMinus} size={20} />}
      onClick={async () => {
        await unfollow()

        toast.success({
          message: (
            <Translate
              zh_hant={`已取消關注 ${circle.displayName}`}
              zh_hans={`已取消关注 ${circle.displayName}`}
            />
          ),
        })
      }}
    />
  )
}

UnfollowCircleActionButton.fragments = fragments

export default UnfollowCircleActionButton
