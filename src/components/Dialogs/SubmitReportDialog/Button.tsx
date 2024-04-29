import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconReport } from '@/public/static/icons/24px/report.svg'
import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Icon, Menu, ViewerContext } from '~/components'

const SubmitReportButton = ({ openDialog }: { openDialog: () => void }) => {
  const viewer = useContext(ViewerContext)

  const onClick = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.reportIssues },
        })
      )

      return
    }

    openDialog()
  }

  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Report issues" id="BaQj20" />}
      icon={<Icon icon={IconReport} size="mdS" />}
      onClick={onClick}
      ariaHasPopup="dialog"
    />
  )
}

export default SubmitReportButton
