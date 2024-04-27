import { useIntl } from 'react-intl'

import { ReactComponent as IconClap } from '@/public/static/icons/24px/clap.svg'
import { Icon, Menu } from '~/components'

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
      icon={<Icon icon={IconClap} size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default AppreciatorsButton
