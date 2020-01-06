import queryString from 'query-string'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

const LINE = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const shareUrl =
        'https://social-plugins.line.me/lineit/share?' +
        queryString.stringify({
          url,
          text
        })

      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.LINE,
        url
      })
      return window.open(shareUrl, 'Share to Line')
    }}
  >
    <TextIcon icon={<Icon.ShareLine size="sm" />} spacing="tight" text="LINE" />
  </button>
)

export default LINE
