import queryString from 'query-string'

import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'
import ICON_SHARE_TWITTER from '~/static/icons/share-twitter.svg?sprite'

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
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_TWITTER.id}
          viewBox={ICON_SHARE_TWITTER.viewBox}
          size="small"
        />
      }
      spacing="tight"
      text="Twitter"
    />
  </button>
)

export default Twitter
