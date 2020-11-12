import queryString from 'query-string'

import { TextIcon, withIcon } from '~/components'

import { analytics } from '~/common/utils'

import { ReactComponent as IconShareTwitterCircle } from '@/public/static/icons/share-twitter-circle.svg'
import { ReactComponent as IconShareTwitter } from '@/public/static/icons/share-twitter.svg'

const Twitter = ({
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
        'https://twitter.com/share?' +
        queryString.stringify({
          url: link,
          text: title,
          via: 'matterslab',
        })
      analytics.trackEvent('share', {
        type: 'twitter',
      })
      return window.open(shareUrl, 'Share to Twitter')
    }}
  >
    {circle && withIcon(IconShareTwitterCircle)({ size: 'xl-m' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareTwitter)({})} spacing="base">
        Twitter
      </TextIcon>
    )}
  </button>
)

export default Twitter
