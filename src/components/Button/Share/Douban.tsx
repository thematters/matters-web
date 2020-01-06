import queryString from 'query-string'

import { Icon } from '~/components'
import { TextIcon } from '~/components/TextIcon'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, dom } from '~/common/utils'

const Douban = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const description = dom
        .$('meta[name="description"]')
        .getAttribute('content')
      const shareUrl =
        'http://www.douban.com/share/service?' +
        queryString.stringify({
          href: url,
          name: text,
          text: description
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.DOUBAN,
        url
      })
      return window.open(shareUrl)
    }}
  >
    <TextIcon
      icon={<Icon.ShareDouban size="sm" />}
      spacing="tight"
      text="豆瓣"
    />
  </button>
)

export default Douban
