import queryString from 'query-string'

import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'
import ICON_SHARE_TELEGRAM from '~/static/icons/share-telegram.svg?sprite'

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
      icon={
        <Icon
          id={ICON_SHARE_TELEGRAM.id}
          viewBox={ICON_SHARE_TELEGRAM.viewBox}
          size="small"
        />
      }
      spacing="tight"
      text="Telegram"
    />
  </button>
)

export default Telegram
