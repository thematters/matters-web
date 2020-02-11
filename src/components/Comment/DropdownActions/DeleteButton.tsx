import gql from 'graphql-tag'

import { Icon, Menu, TextIcon, Translate } from '~/components'
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
}> = ({ commentId }) => {
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
    <Menu.Item onClick={deleteComment}>
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
