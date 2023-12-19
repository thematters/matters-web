import { useContext } from 'react'

import { ReactComponent as IconShareWhatsApp } from '@/public/static/icons/16px/share-whatsapp.svg'
import { ReactComponent as IconShareWhatsAppCircle } from '@/public/static/icons/40px/share-whatsapp-circle.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { TextIcon, ViewerContext, withIcon } from '~/components'

const Whatsapp = ({
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
  const utm_source = 'share_whatsapp'
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
}

export default Whatsapp
