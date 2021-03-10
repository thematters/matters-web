import gql from 'graphql-tag'

import {
  IconExpand16,
  Menu,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'

import { UncollapseComment } from './__generated__/UncollapseComment'

const UNCOLLAPSE_COMMENT = gql`
  mutation UncollapseComment($id: ID!, $state: CommentState!) {
    updateCommentsState(input: { ids: [$id], state: $state }) {
      id
      state
    }
  }
`

const UncollapseButton = ({ commentId }: { commentId: string }) => {
  const [uncollapseComment] = useMutation<UncollapseComment>(
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
    <Menu.Item onClick={uncollapseComment}>
      <TextIcon icon={<IconExpand16 size="md" />} size="md" spacing="base">
        <Translate zh_hant="取消闔上" zh_hans="取消折叠" />
      </TextIcon>
    </Menu.Item>
  )
}

export default UncollapseButton
