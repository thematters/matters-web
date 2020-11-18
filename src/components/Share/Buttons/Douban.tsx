import queryString from 'query-string'

import { TextIcon, Translate, withIcon } from '~/components'

import { analytics, dom } from '~/common/utils'

import { ReactComponent as IconShareDoubanCircle } from '@/public/static/icons/share-douban-circle.svg'
import { ReactComponent as IconShareDouban } from '@/public/static/icons/share-douban.svg'

const Douban = ({
  title,
  link,
  circle,
}: {
  title: string
  link: string
  circle?: boolean
}) => (
  <button
    type="button"
    onClick={() => {
      const description = dom
        .$('meta[name="description"]')
        ?.getAttribute('content')
      const shareUrl =
        'http://www.douban.com/share/service?' +
        queryString.stringify({
          href: link,
          name: title,
          text: description,
        })
      analytics.trackEvent('share', {
        type: 'douban',
      })
      return window.open(shareUrl)
    }}
  >
    {circle && withIcon(IconShareDoubanCircle)({ size: 'xl-m' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareDouban)({})} spacing="base">
        <Translate zh_hant="豆瓣" zh_hans="豆瓣" />
      </TextIcon>
    )}
  </button>
)

export default Douban
