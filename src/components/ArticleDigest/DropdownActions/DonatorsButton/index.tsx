import { FormattedMessage } from 'react-intl'

import { IconDonate24, Menu, TextIcon } from '~/components'

interface DonatorsButtonProps {
  openDialog: () => void
}

const DonatorsButton = ({ openDialog }: DonatorsButtonProps) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconDonate24 size="md" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="Supporters" description="src/components/ArticleDigest/DropdownActions/DonatorsButton/index.tsx"/>
      </TextIcon>
    </Menu.Item>
  )
}

export default DonatorsButton
