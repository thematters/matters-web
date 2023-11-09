import { useIntl } from 'react-intl'

import { IconDonate24, Menu } from '~/components'

interface DonatorsButtonProps {
  openDialog: () => void
}

const DonatorsButton = ({ openDialog }: DonatorsButtonProps) => {
  const intl = useIntl()

  return (
    <Menu.Item
      text={intl.formatMessage({
        defaultMessage: 'Supporters',
        id: '/qgntf',
        description:
          'src/components/ArticleDigest/DropdownActions/DonatorsButton/index.tsx',
      })}
      icon={<IconDonate24 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default DonatorsButton
