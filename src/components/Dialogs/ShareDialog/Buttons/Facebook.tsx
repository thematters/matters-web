import { useContext } from 'react'

import IconFacebook from '@/public/static/icons/24px/facebook.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Icon, TextIcon, ViewerContext } from '~/components'

const Facebook = ({ link }: { link: string }) => {
  const viewer = useContext(ViewerContext)

  // append utm_source to link
  const utm_source = 'share_facebook'
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
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams(
          { u: link }
        ).toString()}`

        analytics.trackEvent('share', {
          type: 'facebook',
        })

        // Facebook doesn't support adding text in the sharer URL parameters
        // Only the URL can be shared through this method
        return window.open(shareUrl, 'Share to Facebook')
      }}
    >
      <TextIcon
        icon={<Icon icon={IconFacebook} size={24} />}
        spacing={16}
        size={16}
        color="black"
      >
        Facebook
      </TextIcon>
    </button>
  )
}

export default Facebook
