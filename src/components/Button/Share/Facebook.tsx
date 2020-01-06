import queryString from 'query-string'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

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
    <TextIcon icon={<Icon.ShareFacebook />} spacing="tight" text="Facebook" />
  </button>
)

export default Facebook
