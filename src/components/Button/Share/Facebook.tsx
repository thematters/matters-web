import queryString from 'query-string'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

const Facebook = ({ title, link }: { title: string; link: string }) => (
  <button
    type="button"
    onClick={() => {
      const shareUrl =
        'https://www.facebook.com/sharer/sharer.php?' +
        queryString.stringify({
          u: link
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.FACEBOOK,
        url: link
      })
      return window.open(shareUrl, 'Share to Facebook')
    }}
  >
    <TextIcon icon={<Icon.ShareFacebook />} spacing="tight" text="Facebook" />
  </button>
)

export default Facebook
