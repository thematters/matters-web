import queryString from 'query-string'

import { Icon } from '~/components'
import { TextIcon } from '~/components/TextIcon'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, dom } from '~/common/utils'

const Douban = ({ title, link }: { title: string; link: string }) => (
  <button
    type="button"
    onClick={() => {
      const description = dom
        .$('meta[name="description"]')
        .getAttribute('content')
      const shareUrl =
        'http://www.douban.com/share/service?' +
        queryString.stringify({
          href: link,
          name: title,
          text: description
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.DOUBAN,
        url: link
      })
      return window.open(shareUrl)
    }}
  >
    <TextIcon icon={<Icon.ShareDouban />} spacing="tight" text="豆瓣" />
  </button>
)

export default Douban
