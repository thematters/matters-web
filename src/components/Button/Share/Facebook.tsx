import queryString from 'query-string'

import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'
import ICON_SHARE_FACEBOOK from '~/static/icons/share-facebook.svg?sprite'

const Facebook = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const shareUrl =
        'https://www.facebook.com/sharer/sharer.php?' +
        queryString.stringify({
          u: url
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.FACEBOOK,
        url
      })
      return window.open(shareUrl, 'Share to Facebook')
    }}
  >
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_FACEBOOK.id}
          viewBox={ICON_SHARE_FACEBOOK.viewBox}
          size="small"
        />
      }
      spacing="tight"
      text="Facebook"
    />
  </button>
)

export default Facebook
