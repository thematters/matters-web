import { useContext } from 'react'

import { ReactComponent as IconShareTelegram } from '@/public/static/icons/16px/share-telegram.svg'
import { ReactComponent as IconShareTelegramCircle } from '@/public/static/icons/24px/share-telegram-circle.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { TextIcon, ViewerContext, withIcon } from '~/components'

const Telegram = ({
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
  const utm_source = 'share_telegram'
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
        const shareUrl = `https://telegram.me/share?${new URLSearchParams({
          url: link,
          text: title,
        }).toString()}`
        analytics.trackEvent('share', {
          type: 'telegram',
        })
        return window.open(shareUrl, 'Share to Telegram')
      }}
    >
      {circle && (
        <TextIcon
          icon={withIcon(IconShareTelegramCircle)({ size: 'md' })}
          spacing="base"
          size="md"
          color="black"
        >
          Telegram
        </TextIcon>
      )}

      {!circle && (
        <TextIcon icon={withIcon(IconShareTelegram)({})} spacing="base">
          Telegram
        </TextIcon>
      )}
    </button>
  )
}

export default Telegram
