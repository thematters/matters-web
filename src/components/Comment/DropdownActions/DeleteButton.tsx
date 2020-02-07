import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

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
    <button
      type="button"
      onClick={() => {
        deleteComment()
        hideDropdown()
      }}
    >
      <TextIcon icon={<Icon.RemoveMedium />} spacing="tight">
        <Translate
          zh_hant={TEXT.zh_hant.delete}
          zh_hans={TEXT.zh_hant.delete}
        />
      </TextIcon>

      <style jsx>{styles}</style>
    </button>
  )
}

export default DeleteButton
