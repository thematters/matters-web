import { FormattedMessage } from 'react-intl'

import { IconRemove24, Menu, TextIcon } from '~/components'

const DeleteCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconRemove24 size="md" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="Delete" description="" />
      </TextIcon>
    </Menu.Item>
  )
}

export default DeleteCommentButton
