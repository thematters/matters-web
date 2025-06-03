import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconReport from '@/public/static/icons/24px/report.svg'
import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import type { ClickButtonProp as TrackEventProps } from '~/common/utils'
import { analytics } from '~/common/utils'
import { Icon, Menu, ViewerContext } from '~/components'

type SubmitReportButtonProps = {
  openDialog: () => void
} & Partial<TrackEventProps>

const SubmitReportButton = ({
  openDialog,
  type,
  pageType,
  pageComponent,
}: SubmitReportButtonProps) => {
  const viewer = useContext(ViewerContext)

  const onClick = () => {
    if (type && (pageType || pageComponent)) {
      analytics.trackEvent('click_button', {
        type,
        pageType,
        pageComponent,
      })
    }

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
      icon={<Icon icon={IconReport} size={20} />}
      onClick={onClick}
      ariaHasPopup="dialog"
    />
  )
}

export default SubmitReportButton
