import { ReactComponent as IconShareTelegram } from '@/public/static/icons/16px/share-telegram.svg'
import { ReactComponent as IconShareTelegramCircle } from '@/public/static/icons/40px/share-telegram-circle.svg'
import { analytics } from '~/common/utils'
import { TextIcon, withIcon } from '~/components'

const Telegram = ({
  title,
  link,
  circle,
}: {
  title: string
  link: string
  circle?: boolean
}) => {
  // append utm_source to link
  const utm_source = 'share_telegram'
  const url = new URL(link)
  url.searchParams.append('utm_source', utm_source)
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
      {circle && withIcon(IconShareTelegramCircle)({ size: 'xlM' })}

      {!circle && (
        <TextIcon icon={withIcon(IconShareTelegram)({})} spacing="base">
          Telegram
        </TextIcon>
      )}
    </button>
  )
}

export default Telegram
