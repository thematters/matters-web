import queryString from 'query-string'

import { TextIcon, withIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'
import { ReactComponent as IconShareFacebook } from '~/static/icons/share-facebook.svg'

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
    <TextIcon icon={withIcon(IconShareFacebook)({})} spacing="base">
      Facebook
    </TextIcon>
  </button>
)

export default Facebook
