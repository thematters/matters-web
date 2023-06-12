import { ReactComponent as IconShareFacebook } from '@/public/static/icons/16px/share-facebook.svg'
import { ReactComponent as IconShareFacebookCircle } from '@/public/static/icons/40px/share-facebook-circle.svg'
import { analytics } from '~/common/utils'
import { TextIcon, withIcon } from '~/components'

const Facebook = ({
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
    {circle && withIcon(IconShareFacebookCircle)({ size: 'xlM' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareFacebook)({})} spacing="base">
        Facebook
      </TextIcon>
    )}
  </button>
)

export default Facebook
