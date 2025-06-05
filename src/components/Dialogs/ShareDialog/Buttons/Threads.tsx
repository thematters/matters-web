import { useContext } from 'react'

import IconThreads from '@/public/static/icons/24px/threads.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Icon, TextIcon, ViewerContext } from '~/components'

const Threads = ({ title, link }: { title: string; link: string }) => {
  const viewer = useContext(ViewerContext)

  // append utm_source to link
  const utm_source = 'share_threads'
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
        const shareUrl = `https://threads.com/intent/post?text=${encodeURIComponent(`${title} ${link}`)}`

        analytics.trackEvent('share', {
          type: 'threads',
        })
        return window.open(shareUrl, 'Share to Threads')
      }}
    >
      <TextIcon
        icon={<Icon icon={IconThreads} size={24} />}
        spacing={16}
        size={16}
        color="black"
      >
        Threads
      </TextIcon>
    </button>
  )
}

export default Threads
