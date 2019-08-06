import _get from 'lodash/get'

import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, objectToGetParams } from '~/common/utils'
import ICON_SHARE_WHATSAPP from '~/static/icons/share-whatsapp.svg?sprite'

const Whatsapp = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const shareUrl =
        'https://api.whatsapp.com/send' +
        objectToGetParams({
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
      icon={
        <Icon
          id={ICON_SHARE_WHATSAPP.id}
          viewBox={ICON_SHARE_WHATSAPP.viewBox}
          size="small"
        />
      }
      spacing="tight"
      text="WhatsApp"
    />
  </button>
)

export default Whatsapp
