import queryString from 'query-string'

import { TextIcon, Translate, withIcon } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, dom } from '~/common/utils'
import { ReactComponent as IconShareEmail } from '~/static/icons/share-email.svg'

const Email = ({ title, link }: { title: string; link: string }) => (
  <button
    type="button"
    onClick={() => {
      const description = dom
        .$('meta[name="description"]')
        .getAttribute('content')
      const shareUrl =
        'mailto:?' +
        queryString.stringify({
          subject: title,
          body: `${description}\n\n${link}`,
        })
      analytics.trackEvent(ANALYTICS_EVENTS.SHARE, {
        type: SHARE_TYPE.EMAIL,
        url: link,
      })
      return (window.location.href = shareUrl)
    }}
  >
    <TextIcon icon={withIcon(IconShareEmail)({})} spacing="base">
      <Translate zh_hant="郵件" zh_hans="邮件" />
    </TextIcon>
  </button>
)

export default Email
