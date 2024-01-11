import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconShareEmail } from '@/public/static/icons/16px/share-email.svg'
import { ReactComponent as IconShareEmailCircle } from '@/public/static/icons/40px/share-email-circle.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics, dom } from '~/common/utils'
import { TextIcon, ViewerContext, withIcon } from '~/components'

const Email = ({
  title,
  link,
  circle,
}: {
  title: string
  link: string
  circle?: boolean
}) => {
  const viewer = useContext(ViewerContext)

  // append utm_source to link
  const utm_source = 'share_email'
  const url = new URL(link)
  url.searchParams.append('utm_source', utm_source)
  if (viewer.userName) {
    url.searchParams.append(REFERRAL_QUERY_REFERRAL_KEY, viewer.userName)
  }
  link = url.toString()

  return (
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
          <FormattedMessage defaultMessage="Email" id="sy+pv5" />
        </TextIcon>
      )}
    </button>
  )
}

export default Email
