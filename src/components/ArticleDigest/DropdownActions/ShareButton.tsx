import { useIntl } from 'react-intl'

import IconShare from '@/public/static/icons/24px/share.svg'
import type { ClickButtonProp as TrackEventProps } from '~/common/utils'
import { analytics } from '~/common/utils'
import { Icon, Menu } from '~/components'

type ShareButtonProps = {
  openDialog: () => void
} & Omit<TrackEventProps, 'type'>

const ShareButton = ({
  openDialog,
  pageType,
  pageComponent,
}: ShareButtonProps) => {
  const intl = useIntl()

  return (
    <Menu.Item
      text={intl.formatMessage({
        defaultMessage: 'Share Article',
        id: '/GyMKa',
      })}
      icon={<Icon icon={IconShare} size={20} />}
      onClick={() => {
        if (pageType || pageComponent) {
          analytics.trackEvent('click_button', {
            type: 'share_article_open',
            pageType,
            pageComponent,
          })
        }
        openDialog()
      }}
      ariaHasPopup="dialog"
    />
  )
}

export default ShareButton
