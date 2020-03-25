import queryString from 'query-string'

import { TextIcon, Translate, withIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, dom } from '~/common/utils'
import { ReactComponent as IconShareDouban } from '~/static/icons/share-douban.svg'

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
          text: description,
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.DOUBAN,
        url: link,
      })
      return window.open(shareUrl)
    }}
  >
    <TextIcon icon={withIcon(IconShareDouban)({})} spacing="base">
      <Translate zh_hant="豆瓣" zh_hans="豆瓣" />
    </TextIcon>
  </button>
)

export default Douban
