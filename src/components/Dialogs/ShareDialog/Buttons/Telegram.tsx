import { useContext } from 'react'

import { ReactComponent as IconTelegram } from '@/public/static/icons/24px/telegram.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Icon, TextIcon, ViewerContext } from '~/components'

const Telegram = ({ title, link }: { title: string; link: string }) => {
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
          text: title,
          url: link,
        }).toString()}`

        analytics.trackEvent('share', {
          type: 'telegram',
        })

        return window.open(shareUrl, 'Share to Telegram')
      }}
    >
      <TextIcon
        icon={<Icon icon={IconTelegram} size={24} />}
        spacing={16}
        size={16}
        color="black"
      >
        Telegram
      </TextIcon>
    </button>
  )
}

export default Telegram
