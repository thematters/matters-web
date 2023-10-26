import { useIntl } from 'react-intl'

import { IconClap16, Menu } from '~/components'

interface AppreciatorsButtonProps {
  openDialog: () => void
}

const AppreciatorsButton = ({ openDialog }: AppreciatorsButtonProps) => {
  const intl = useIntl()

  return (
    <Menu.Item
      text={intl.formatMessage({
        defaultMessage: 'Likers',
        description:
          'src/components/ArticleDigest/DropdownActions/AppreciatorsButton/index.tsx',
        id: 'dZQ+ba',
      })}
      icon={<IconClap16 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default AppreciatorsButton
