import queryString from 'query-string'

import { TextIcon, withIcon } from '~/components'

import { analytics } from '~/common/utils'

import { ReactComponent as IconShareWhatsAppCircle } from '@/public/static/icons/share-whatsapp-circle.svg'
import { ReactComponent as IconShareWhatsApp } from '@/public/static/icons/share-whatsapp.svg'

const Whatsapp = ({
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
      const shareUrl =
        'https://api.whatsapp.com/send?' +
        queryString.stringify({
          text: title ? title + ' ' + link : link,
        })

      analytics.trackEvent('share', {
        type: 'whatsapp',
      })
      return window.open(shareUrl, 'Share to WhatsApp')
    }}
  >
    {circle && withIcon(IconShareWhatsAppCircle)({ size: 'xl-m' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareWhatsApp)({})} spacing="base">
        WhatsApp
      </TextIcon>
    )}
  </button>
)

export default Whatsapp
