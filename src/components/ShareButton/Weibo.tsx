import _get from 'lodash/get'
import queryString from 'query-string'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import { dom } from '~/common/utils'
import ICON_SHARE_WEIBO from '~/static/icons/share-weibo.svg?sprite'

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
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_WEIBO.id}
          viewBox={ICON_SHARE_WEIBO.viewBox}
          size="small"
        />
      }
      spacing="tight"
    >
      <Translate zh_hant="微博" zh_hans="微博" />
    </TextIcon>
  </button>
)

export default Weibo
