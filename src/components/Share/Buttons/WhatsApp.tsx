import { ReactComponent as IconShareWhatsApp } from '@/public/static/icons/16px/share-whatsapp.svg'
import { ReactComponent as IconShareWhatsAppCircle } from '@/public/static/icons/40px/share-whatsapp-circle.svg'
import { analytics } from '~/common/utils'
import { TextIcon, withIcon } from '~/components'

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
      const shareUrl = `https://api.whatsapp.com/send?${new URLSearchParams({
        text: title ? title + ' ' + link : link,
      }).toString()}`

      analytics.trackEvent('share', {
        type: 'whatsapp',
      })
      return window.open(shareUrl, 'Share to WhatsApp')
    }}
  >
    {circle && withIcon(IconShareWhatsAppCircle)({ size: 'xlM' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareWhatsApp)({})} spacing="base">
        WhatsApp
      </TextIcon>
    )}
  </button>
)

export default Whatsapp
