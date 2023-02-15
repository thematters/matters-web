import { FormattedMessage } from 'react-intl'

import { IconShare16, Menu, TextIcon } from '~/components'

interface ShareButtonProps {
  openDialog: () => void
}

const ShareButton = ({ openDialog }: ShareButtonProps) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconShare16 size="md" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="Share Article" description="src/components/ArticleDigest/DropdownActions/ShareButton.tsx" />
      </TextIcon>
    </Menu.Item>
  )
}

export default ShareButton
