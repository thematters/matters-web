import { FormattedMessage } from 'react-intl'

import { IconArchive24, Menu, TextIcon } from '~/components'

const ArchiveArticleButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconArchive24 size="md" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="Archive"
        description="src/components/ArticleDigest/DropdownActions/ArchiveArticle/Button.tsx"/>
      </TextIcon>
    </Menu.Item>
  )
}

export default ArchiveArticleButton
