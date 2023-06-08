import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconShareEmail } from '@/public/static/icons/16px/share-email.svg'
import { ReactComponent as IconShareEmailCircle } from '@/public/static/icons/40px/share-email-circle.svg'
import { analytics, dom } from '~/common/utils'
import { TextIcon, withIcon } from '~/components'

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
    {circle && withIcon(IconShareEmailCircle)({ size: 'xlM' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareEmail)({})} spacing="base">
        <FormattedMessage defaultMessage="Email" description="" />
      </TextIcon>
    )}
  </button>
)

export default Email
