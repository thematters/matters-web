import queryString from 'query-string'

import { TextIcon, withIcon } from '~/components'

import { analytics } from '~/common/utils'

import { ReactComponent as IconShareTelegramCircle } from '@/public/static/icons/share-telegram-circle.svg'
import { ReactComponent as IconShareTelegram } from '@/public/static/icons/share-telegram.svg'

const Telegram = ({
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
        'https://telegram.me/share?' +
        queryString.stringify({
          url: link,
          text: title,
        })
      analytics.trackEvent('share', {
        type: 'telegram',
      })
      return window.open(shareUrl, 'Share to Telegram')
    }}
  >
    {circle && withIcon(IconShareTelegramCircle)({ size: 'xl-m' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareTelegram)({})} spacing="base">
        Telegram
      </TextIcon>
    )}
  </button>
)

export default Telegram
