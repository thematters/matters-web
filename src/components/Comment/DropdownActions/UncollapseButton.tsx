import gql from 'graphql-tag'

import { IconExpand16, Menu, Translate, useMutation } from '~/components'
import { UncollapseCommentMutation } from '~/gql/graphql'

const UNCOLLAPSE_COMMENT = gql`
  mutation UncollapseComment($id: ID!, $state: CommentState!) {
    updateCommentsState(input: { ids: [$id], state: $state }) {
      id
      state
    }
  }
`

const UncollapseButton = ({ commentId }: { commentId: string }) => {
  const [uncollapseComment] = useMutation<UncollapseCommentMutation>(
    UNCOLLAPSE_COMMENT,
    {
      variables: { id: commentId, state: 'active' },
      optimisticResponse: {
        updateCommentsState: [
          {
            id: commentId,
            state: 'active' as any,
            __typename: 'Comment',
          },
        ],
      },
    }
  )

  return (
    <Menu.Item
      text={<Translate zh_hant="取消闔上" zh_hans="取消折叠" />}
      icon={<IconExpand16 size="mdS" />}
      onClick={uncollapseComment}
    />
  )
}

export default UncollapseButton
