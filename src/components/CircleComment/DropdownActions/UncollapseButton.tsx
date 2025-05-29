import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconExpand from '@/public/static/icons/24px/expand.svg'
import { Icon, Menu, useMutation } from '~/components'
import { CommentState, UncollapseCommentMutation } from '~/gql/graphql'

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
            state: CommentState.Active,
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
          id="g//2O2"
          description="src/components/CircleComment/DropdownActions/UncollapseButton.tsx"
        />
      }
      icon={<Icon icon={IconExpand} size={20} />}
      onClick={uncollapseComment}
    />
  )
}

export default UncollapseButton
