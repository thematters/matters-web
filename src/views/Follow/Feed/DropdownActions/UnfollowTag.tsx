import gql from 'graphql-tag'

import IconCircleMinus from '@/public/static/icons/24px/circle-minus.svg'
import { Icon, Menu, toast, Translate, useMutation } from '~/components'
import TOGGLE_BOOKMARK_TAG from '~/components/GQL/mutations/toggleBookmarkTag'
import {
  ToggleBookmarkTagMutation,
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
  const [unfollow] = useMutation<ToggleBookmarkTagMutation>(
    TOGGLE_BOOKMARK_TAG,
    {
      variables: { id: tag.id, enabled: false },
      optimisticResponse: {
        toggleBookmarkTag: {
          id: tag.id,
          isFollower: false,
          __typename: 'Tag',
        },
      },
    }
  )

  return (
    <Menu.Item
      text={
        <Translate
          zh_hant={`取消追蹤 #${tag.content}`}
          zh_hans={`取消关注 #${tag.content}`}
        />
      }
      icon={<Icon icon={IconCircleMinus} size={20} />}
      onClick={async () => {
        await unfollow()

        toast.info({
          message: (
            <Translate
              zh_hant={`已取消追蹤 #${tag.content}`}
              zh_hans={`已取消关注 #${tag.content}`}
            />
          ),
        })
      }}
    />
  )
}

UnfollowTagActionButton.fragments = fragments

export default UnfollowTagActionButton
