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
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import updateTagFollowers from '~/components/GQL/updates/tagFollowers'

import { ADD_TOAST } from '~/common/enums'

import { ToggleFollowTag } from '~/components/GQL/mutations/__generated__/ToggleFollowTag'
import { UnfollowActionButtonTagPrivate } from './__generated__/UnfollowActionButtonTagPrivate'

type UnfollowTagActionButtonProps = {
  tag: UnfollowActionButtonTagPrivate
}

const fragments = {
  tag: {
    private: gql`
      fragment UnfollowActionButtonTagPrivate on Tag {
        id
        content
        isFollower
      }
    `,
  },
}

const UnfollowTagActionButton = ({ tag }: UnfollowTagActionButtonProps) => {
  const viewer = useContext(ViewerContext)

  const [unfollow] = useMutation<ToggleFollowTag>(TOGGLE_FOLLOW_TAG, {
    variables: { id: tag.id, enabled: false },
    optimisticResponse: {
      toggleFollowTag: {
        id: tag.id,
        isFollower: false,
        __typename: 'Tag',
      },
    },
    update: (cache) => {
      updateTagFollowers({
        cache,
        type: 'unfollow',
        id: tag.id,
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
                  zh_hant={`已取消追蹤 ${tag.content}`}
                  zh_hans={`已取消追踪 ${tag.content}`}
                />
              ),
            },
          })
        )
      }}
    >
      <TextIcon icon={<IconRemove24 size="md" />} size="md" spacing="base">
        <Translate
          zh_hant={`取消追蹤 ${tag.content}`}
          zh_hans={`取消追踪 ${tag.content}`}
        />
      </TextIcon>
    </Menu.Item>
  )
}

UnfollowTagActionButton.fragments = fragments

export default UnfollowTagActionButton
