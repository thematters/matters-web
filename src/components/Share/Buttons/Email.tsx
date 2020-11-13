import queryString from 'query-string'

import { TextIcon, Translate, withIcon } from '~/components'

import { analytics, dom } from '~/common/utils'

import { ReactComponent as IconShareEmailCircle } from '@/public/static/icons/share-email-circle.svg'
import { ReactComponent as IconShareEmail } from '@/public/static/icons/share-email.svg'

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
      const shareUrl =
        'mailto:?' +
        queryString.stringify({
          subject: title,
          body: `${description}\n\n${link}`,
        })
      analytics.trackEvent('share', {
        type: 'email',
      })
      return (window.location.href = shareUrl)
    }}
  >
    {circle && withIcon(IconShareEmailCircle)({ size: 'xl-m' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareEmail)({})} spacing="base">
        <Translate zh_hant="郵件" zh_hans="邮件" />
      </TextIcon>
    )}
  </button>
)

export default Email
