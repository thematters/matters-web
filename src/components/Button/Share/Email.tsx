import queryString from 'query-string'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, dom } from '~/common/utils'
import ICON_SHARE_EMAIL from '~/static/icons/share-email.svg?sprite'

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
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_EMAIL.id}
          viewBox={ICON_SHARE_EMAIL.viewBox}
          size="small"
        />
      }
      spacing="tight"
    >
      <Translate zh_hant="郵件" zh_hans="邮件" />
    </TextIcon>
  </button>
)

export default Email
