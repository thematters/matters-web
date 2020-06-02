import gql from 'graphql-tag'

import { IconEdit, Menu, TextIcon, Translate } from '~/components'

interface EditButtonProps {
  openEditCommentDialog: () => void
}

const fragments = {
  comment: gql`
    fragment EditButtonComment on Comment {
      id
      state
      content
      article {
        id
        author {
          id
          isBlocking
        }
      }
      parentComment {
        id
      }
    }
  `,
}

const EditButton = ({ openEditCommentDialog }: EditButtonProps) => {
  return (
    <Menu.Item onClick={openEditCommentDialog}>
      <TextIcon icon={<IconEdit size="md" />} size="md" spacing="base">
        <Translate id="edit" />
      </TextIcon>
    </Menu.Item>
  )
}

EditButton.fragments = fragments

export default EditButton
