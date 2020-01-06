import queryString from 'query-string'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

const Whatsapp = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const shareUrl =
        'https://api.whatsapp.com/send?' +
        queryString.stringify({
          text: text ? text + ' ' + url : url
        })

      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.WHATSAPP,
        url
      })
      return window.open(shareUrl, 'Share to WhatsApp')
    }}
  >
    <TextIcon
      icon={<Icon.ShareWhatsApp size="sm" />}
      spacing="tight"
      text="WhatsApp"
    />
  </button>
)

export default Whatsapp
