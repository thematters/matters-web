import queryString from 'query-string'

import { Icon, TextIcon, Translate } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, dom } from '~/common/utils'

const Email = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const description = dom
        .$('meta[name="description"]')
        .getAttribute('content')
      const shareUrl =
        'mailto:?' +
        queryString.stringify({
          subject: text,
          body: `${description}\n\n${url}`
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.EMAIL,
        url
      })
      return (window.location.href = shareUrl)
    }}
  >
    <TextIcon icon={<Icon.ShareEmail />} spacing="tight">
      <Translate zh_hant="郵件" zh_hans="邮件" />
    </TextIcon>
  </button>
)

export default Email
