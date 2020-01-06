import queryString from 'query-string'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

const Telegram = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const shareUrl =
        'https://telegram.me/share?' +
        queryString.stringify({
          url,
          text
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.TELEGRAM,
        url
      })
      return window.open(shareUrl, 'Share to Telegram')
    }}
  >
    <TextIcon
      icon={<Icon.ShareTelegram size="sm" />}
      spacing="tight"
      text="Telegram"
    />
  </button>
)

export default Telegram
