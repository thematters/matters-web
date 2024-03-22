import { useContext } from 'react'

import { ReactComponent as IconShareFacebook } from '@/public/static/icons/16px/share-facebook.svg'
import { ReactComponent as IconShareFacebookCircle } from '@/public/static/icons/24px/share-facebook-circle.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { TextIcon, ViewerContext, withIcon } from '~/components'

const Facebook = ({
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
          {
            u: link,
          }
        ).toString()}`
        analytics.trackEvent('share', {
          type: 'facebook',
        })
        return window.open(shareUrl, 'Share to Facebook')
      }}
    >
      {circle && (
        <TextIcon
          icon={withIcon(IconShareFacebookCircle)({ size: 'md' })}
          spacing="base"
          size="md"
          color="black"
        >
          Facebook
        </TextIcon>
      )}

      {!circle && (
        <TextIcon icon={withIcon(IconShareFacebook)({})} spacing="base">
          Facebook
        </TextIcon>
      )}
    </button>
  )
}

export default Facebook
