import queryString from 'query-string'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

const Twitter = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const shareUrl =
        'https://twitter.com/share?' +
        queryString.stringify({
          url,
          text,
          via: 'matterslab'
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.TWITTER,
        url
      })
      return window.open(shareUrl, 'Share to Twitter')
    }}
  >
    <TextIcon icon={<Icon.ShareTwitter />} spacing="tight" text="Twitter" />
  </button>
)

export default Twitter
