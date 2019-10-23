import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'
import ICON_REMOVE from '~/static/icons/remove.svg?sprite'

import { DeleteComment } from './__generated__/DeleteComment'
import styles from './styles.css'

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
      <TextIcon
        icon={
          <Icon
            id={ICON_REMOVE.id}
            viewBox={ICON_REMOVE.viewBox}
            size="small"
          />
        }
        spacing="tight"
      >
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
