import queryString from 'query-string'

import { TextIcon, withIcon } from '~/components'

import { analytics } from '~/common/utils'

import { ReactComponent as IconShareFacebook } from '@/public/static/icons/share-facebook.svg'

const Facebook = ({ title, link }: { title: string; link: string }) => (
  <button
    type="button"
    onClick={() => {
      const shareUrl =
        'https://www.facebook.com/sharer/sharer.php?' +
        queryString.stringify({
          u: link,
        })
      analytics.trackEvent('share', {
        type: 'facebook',
      })
      return window.open(shareUrl, 'Share to Facebook')
    }}
  >
    <TextIcon icon={withIcon(IconShareFacebook)({})} spacing="base">
      Facebook
    </TextIcon>
  </button>
)

export default Facebook
