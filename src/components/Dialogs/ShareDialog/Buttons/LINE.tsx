import { useContext } from 'react'

import IconLINE from '@/public/static/icons/24px/line.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Icon, TextIcon, ViewerContext } from '~/components'

const LINE = ({ title, link }: { title: string; link: string }) => {
  const viewer = useContext(ViewerContext)

  // append utm_source to link
  const utm_source = 'share_line'
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
        const shareUrl = `https://social-plugins.line.me/lineit/share?${new URLSearchParams(
          { url: link, text: title }
        ).toString()}`

        analytics.trackEvent('share', {
          type: 'line',
        })
        return window.open(shareUrl, 'Share to Line')
      }}
    >
      <TextIcon
        icon={<Icon icon={IconLINE} size={24} />}
        spacing={16}
        size={16}
        color="black"
      >
        LINE
      </TextIcon>
    </button>
  )
}

export default LINE
