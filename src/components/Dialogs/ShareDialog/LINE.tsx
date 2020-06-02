import queryString from 'query-string'

import { TextIcon, withIcon } from '~/components'

import { analytics } from '~/common/utils'

import { ReactComponent as IconShareLINE } from '@/public/static/icons/share-line.svg'

const LINE = ({ title, link }: { title: string; link: string }) => (
  <button
    type="button"
    onClick={() => {
      const shareUrl =
        'https://social-plugins.line.me/lineit/share?' +
        queryString.stringify({
          url: link,
          text: title,
        })

      analytics.trackEvent('share', {
        type: 'line',
      })
      return window.open(shareUrl, 'Share to Line')
    }}
  >
    <TextIcon icon={withIcon(IconShareLINE)({})} spacing="base">
      LINE
    </TextIcon>
  </button>
)

export default LINE
