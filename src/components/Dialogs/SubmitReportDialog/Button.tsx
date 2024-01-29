import { FormattedMessage } from 'react-intl'

import { IconReport20, Menu } from '~/components'

const SubmitReportButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Report issues" id="BaQj20" />}
      icon={<IconReport20 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default SubmitReportButton
