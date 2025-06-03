import { FormattedMessage } from 'react-intl'

import IconArchive from '@/public/static/icons/24px/archive.svg'
import { Icon, Menu } from '~/components'

const ArchiveArticleButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Archive" id="hrgo+E" />}
      icon={<Icon icon={IconArchive} size={20} />}
      onClick={openDialog}
      ariaHasPopup="dialog"
      textColor="red"
      textActiveColor="redDark"
    />
  )
}

export default ArchiveArticleButton
