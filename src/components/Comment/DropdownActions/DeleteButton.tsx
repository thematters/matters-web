import gql from 'graphql-tag'

import { Icon, TextIcon, Menu, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'

import { DeleteComment } from './__generated__/DeleteComment'

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
    }
  }
`

const DeleteButton: React.FC<{
  commentId: string
  hideDropdown: () => void
}> = ({ commentId, hideDropdown }) => {
  const [deleteComment] = useMutation<DeleteComment>(DELETE_COMMENT, {
    variables: { id: commentId },
    optimisticResponse: {
      deleteComment: {
        id: commentId,
        state: 'archived' as any,
        __typename: 'Comment'
      }
    }
  })

  return (
    <Menu.Item
      onClick={() => {
        deleteComment()
        hideDropdown()
      }}
    >
      <TextIcon icon={<Icon.RemoveMedium size="md" />} size="md" spacing="base">
        <Translate
          zh_hant={TEXT.zh_hant.delete}
          zh_hans={TEXT.zh_hant.delete}
        />
      </TextIcon>
    </Menu.Item>
  )
}

export default DeleteButton
