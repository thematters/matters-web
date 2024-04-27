import { useIntl } from 'react-intl'

import { ReactComponent as IconDonate } from '@/public/static/icons/24px/donate.svg'
import { Icon, Menu } from '~/components'

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
      icon={<Icon icon={IconDonate} size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default DonatorsButton
