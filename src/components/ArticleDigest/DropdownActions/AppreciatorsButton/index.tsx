import { FormattedMessage } from 'react-intl'

import { IconClap16, Menu, TextIcon } from '~/components'

interface AppreciatorsButtonProps {
  openDialog: () => void
}

const AppreciatorsButton = ({ openDialog }: AppreciatorsButtonProps) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconClap16 size="md" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="Likers" description="src/components/ArticleDigest/DropdownActions/AppreciatorsButton/index.tsx" />
      </TextIcon>
    </Menu.Item>
  )
}

export default AppreciatorsButton
