import queryString from 'query-string'

import { TextIcon, withIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'
import { ReactComponent as IconShareWhatsApp } from '~/static/icons/share-whatsapp.svg'

const Whatsapp = ({ title, link }: { title: string; link: string }) => (
  <button
    type="button"
    onClick={() => {
      const shareUrl =
        'https://api.whatsapp.com/send?' +
        queryString.stringify({
          text: title ? title + ' ' + link : link
        })

      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.WHATSAPP,
        url: link
      })
      return window.open(shareUrl, 'Share to WhatsApp')
    }}
  >
    <TextIcon
      icon={withIcon(IconShareWhatsApp)({})}
      spacing="tight"
      text="WhatsApp"
    />
  </button>
)

export default Whatsapp
