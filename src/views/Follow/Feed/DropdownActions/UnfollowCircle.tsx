import gql from 'graphql-tag'
import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import {
  IconRemove24,
  Menu,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import TOGGLE_FOLLOW_CIRCLE from '~/components/GQL/mutations/toggleFollowCircle'
import updateCircleFollowers from '~/components/GQL/updates/circleFollowers'

import { ADD_TOAST } from '~/common/enums'

import { ToggleFollowCircle } from '~/components/GQL/mutations/__generated__/ToggleFollowCircle'
import { UnfollowActionButtonCirclePrivate } from './__generated__/UnfollowActionButtonCirclePrivate'

type UnfollowCircleActionButtonProps = {
  circle: UnfollowActionButtonCirclePrivate
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

  const [unfollow] = useMutation<ToggleFollowCircle>(TOGGLE_FOLLOW_CIRCLE, {
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
                  zh_hant={`已取消追蹤 ${circle.displayName}`}
                  zh_hans={`已取消追踪 ${circle.displayName}`}
                />
              ),
            },
          })
        )
      }}
    >
      <TextIcon icon={<IconRemove24 size="md" />} size="md" spacing="base">
        <Translate
          zh_hant={`取消追蹤 ${circle.displayName}`}
          zh_hans={`取消追踪 ${circle.displayName}`}
        />
      </TextIcon>
    </Menu.Item>
  )
}

UnfollowCircleActionButton.fragments = fragments

export default UnfollowCircleActionButton
