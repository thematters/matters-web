import queryString from 'query-string'

import { Icon, TextIcon, Translate } from '~/components'

import { dom } from '~/common/utils'

const Weibo = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const cover = dom.$('meta[property="og:image"]').getAttribute('content')
      const shareUrl =
        'http://service.weibo.com/share/share.php?' +
        queryString.stringify({
          url,
          title: text,
          pic: cover
        })
      return window.open(shareUrl, '分享到微博')
    }}
  >
    <TextIcon icon={<Icon.ShareWeibo size="sm" />} spacing="tight">
      <Translate zh_hant="微博" zh_hans="微博" />
    </TextIcon>
  </button>
)

export default Weibo
