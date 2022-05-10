// import queryString from 'query-string'

import { TextIcon, Translate, withIcon } from '~/components'

import { analytics, dom } from '~/common/utils'

import { ReactComponent as IconShareEmail } from '@/public/static/icons/16px/share-email.svg'
import { ReactComponent as IconShareEmailCircle } from '@/public/static/icons/40px/share-email-circle.svg'

const Email = ({
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
      const shareUrl = `mailto:?${new URLSearchParams({
        subject: title,
        body: `${description}\n\n${link}`,
      }).toString()}`
      analytics.trackEvent('share', {
        type: 'email',
      })
      return (window.location.href = shareUrl)
    }}
  >
    {circle && withIcon(IconShareEmailCircle)({ size: 'xl-m' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareEmail)({})} spacing="base">
        <Translate zh_hant="郵件" zh_hans="邮件" en="email" />
      </TextIcon>
    )}
  </button>
)

export default Email
