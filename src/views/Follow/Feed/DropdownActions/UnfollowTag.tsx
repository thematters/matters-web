import gql from 'graphql-tag'
import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import {
  IconRemove24,
  Menu,
  toast,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateTagFollowers } from '~/components/GQL'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import {
  ToggleFollowTagMutation,
  UnfollowActionButtonTagPrivateFragment,
} from '~/gql/graphql'

type UnfollowTagActionButtonProps = {
  tag: UnfollowActionButtonTagPrivateFragment
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

  const [unfollow] = useMutation<ToggleFollowTagMutation>(TOGGLE_FOLLOW_TAG, {
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
      text={
        <Translate
          zh_hant={`取消追蹤 #${tag.content}`}
          zh_hans={`取消追踪 #${tag.content}`}
        />
      }
      icon={<IconRemove24 size="mdS" />}
      onClick={async () => {
        await unfollow()

        toast.success({
          message: (
            <Translate
              zh_hant={`已取消追蹤 #${tag.content}`}
              zh_hans={`已取消追踪 #${tag.content}`}
            />
          ),
        })
      }}
    />
  )
}

UnfollowTagActionButton.fragments = fragments

export default UnfollowTagActionButton
