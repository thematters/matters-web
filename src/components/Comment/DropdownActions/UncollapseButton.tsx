import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconExpand } from '@/public/static/icons/24px/expand.svg'
import { Icon, Menu, useMutation } from '~/components'
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
      text={
        <FormattedMessage
          defaultMessage="Uncollapse"
          id="k1SWZ2"
          description="src/components/Comment/DropdownActions/UncollapseButton.tsx"
        />
      }
      icon={<Icon icon={IconExpand} size={20} />}
      onClick={uncollapseComment}
    />
  )
}

export default UncollapseButton
