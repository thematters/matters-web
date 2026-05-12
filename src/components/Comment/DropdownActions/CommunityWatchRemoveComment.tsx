import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconCircleMinus from '@/public/static/icons/24px/circle-minus.svg'
import { Icon, Menu, toast, useMutation } from '~/components'
import {
  CommentState,
  CommunityWatchRemoveCommentMutation,
  CommunityWatchRemoveCommentReason,
} from '~/gql/graphql'

const COMMUNITY_WATCH_REMOVE_COMMENT = gql`
  mutation CommunityWatchRemoveComment(
    $id: ID!
    $reason: CommunityWatchRemoveCommentReason!
  ) {
    communityWatchRemoveComment(input: { id: $id, reason: $reason }) {
      id
      state
      communityWatchAction {
        uuid
        reason
        createdAt
      }
    }
  }
`

const CommunityWatchRemoveComment = ({ id }: { id: string }) => {
  const [removeComment] = useMutation<CommunityWatchRemoveCommentMutation>(
    COMMUNITY_WATCH_REMOVE_COMMENT
  )

  const submit = async (reason: CommunityWatchRemoveCommentReason) => {
    try {
      await removeComment({
        variables: { id, reason },
        optimisticResponse: {
          communityWatchRemoveComment: {
            __typename: 'Comment',
            id,
            state: CommentState.Banned,
            communityWatchAction: {
              __typename: 'CommunityWatchAction',
              uuid: 'pending',
              reason,
              createdAt: new Date(),
            },
          },
        },
      })
      toast.success({
        message: (
          <FormattedMessage
            defaultMessage="已由守望相助隊檢舉"
            id="rW+2ID"
            description="src/components/Comment/DropdownActions/CommunityWatchRemoveComment.tsx"
          />
        ),
      })
    } catch (error) {
      console.error(error)
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="操作失敗，請稍後再試"
            id="+Gk0O1"
            description="src/components/Comment/DropdownActions/CommunityWatchRemoveComment.tsx"
          />
        ),
      })
    }
  }

  return (
    <>
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="色情廣告"
            id="4E1vEv"
            description="src/components/Comment/DropdownActions/CommunityWatchRemoveComment.tsx"
          />
        }
        icon={<Icon icon={IconCircleMinus} size={20} />}
        onClick={() => submit(CommunityWatchRemoveCommentReason.PornAd)}
      />
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="濫發廣告"
            id="oA2Pur"
            description="src/components/Comment/DropdownActions/CommunityWatchRemoveComment.tsx"
          />
        }
        icon={<Icon icon={IconCircleMinus} size={20} />}
        onClick={() => submit(CommunityWatchRemoveCommentReason.SpamAd)}
      />
    </>
  )
}

export default CommunityWatchRemoveComment
