// import queryString from 'query-string'

import { TextIcon, withIcon } from '~/components'

import { analytics, stripNonEnglishUrl } from '~/common/utils'

import { ReactComponent as IconShareTwitter } from '@/public/static/icons/16px/share-twitter.svg'
import { ReactComponent as IconShareTwitterCircle } from '@/public/static/icons/40px/share-twitter-circle.svg'

const Twitter = ({
  title,
  link,
  circle,
  tags,
}: {
  title: string
  link: string
  circle?: boolean
  tags?: string[]
}) => (
  <button
    type="button"
    onClick={() => {
      const u = new URL('https://twitter.com/intent/tweet')
      let text = `${title}`
      if (Array.isArray(tags)) {
        // u.searchParams.set('hashtags', tags.map((w) => w.trim()).join(','))
        text += ` ${tags
          .join(' ')
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 8) // at most 8 keywords be used as hashtags
          .map((w) => `#${w.trim()}`)
          .join(' ')}`
      }
      text += ' via @matterslab'
      u.searchParams.set('text', text)

      // u.searchParams.set('via', 'matterslab')
      u.searchParams.set(
        'related',
        'matterslab:MattersNews 中文,Mattersw3b:Matters Lab'
      )

      // only this way (to omit `via`,`hashtags`) can leave url link at the end, then hidden by default
      u.searchParams.set('url', stripNonEnglishUrl(link))

      analytics.trackEvent('share', {
        type: 'twitter',
      })
      return window.open(u.href, 'Share to Twitter')
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
