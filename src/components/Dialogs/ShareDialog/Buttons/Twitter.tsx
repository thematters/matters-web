import { useContext } from 'react'

import { ReactComponent as IconX } from '@/public/static/icons/24px/x.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Icon, TextIcon, ViewerContext } from '~/components'

const Twitter = ({ title, link }: { title: string; link: string }) => {
  const viewer = useContext(ViewerContext)

  // append utm_source to link
  const utm_source = 'share_twitter'
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
        const shareUrl = `https://twitter.com/intent/tweet?${new URLSearchParams(
          {
            text: title,
            // u.searchParams.set('hashtags', tags.map((w) => w.trim()).join(','))
            // u.searchParams.set('via', 'matterslab')
            related: 'matterslab:MattersNews 中文,Mattersw3b:Matters Lab',
            url: link,
          }
        ).toString()}`

        analytics.trackEvent('share', {
          type: 'twitter',
        })

        return window.open(shareUrl, 'Share to X')
      }}
    >
      <TextIcon
        icon={<Icon icon={IconX} size={24} />}
        spacing={16}
        size={16}
        color="black"
      >
        X
      </TextIcon>
    </button>
  )
}

export default Twitter
