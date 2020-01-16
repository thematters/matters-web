import queryString from 'query-string'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

const Telegram = ({ title, link }: { title: string; link: string }) => (
  <button
    type="button"
    onClick={() => {
      const shareUrl =
        'https://telegram.me/share?' +
        queryString.stringify({
          url: link,
          text: title
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.TELEGRAM,
        url: link
      })
      return window.open(shareUrl, 'Share to Telegram')
    }}
  >
    <TextIcon icon={<Icon.ShareTelegram />} spacing="tight" text="Telegram" />
  </button>
)

export default Telegram
