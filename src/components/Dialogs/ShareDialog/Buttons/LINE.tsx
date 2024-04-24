import { useContext } from 'react'

import { ReactComponent as IconShareLINE } from '@/public/static/icons/16px/share-line.svg'
import { ReactComponent as IconShareLINECircle } from '@/public/static/icons/24px/share-line-circle.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { TextIcon, ViewerContext, withIcon } from '~/components'

const LINE = ({
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
          {
            url: link,
            text: title,
          }
        ).toString()}`

        analytics.trackEvent('share', {
          type: 'line',
        })
        return window.open(shareUrl, 'Share to Line')
      }}
    >
      {circle && (
        <TextIcon
          icon={withIcon(IconShareLINECircle)({ size: 'md' })}
          spacing="base"
          size="md"
          color="black"
        >
          LINE
        </TextIcon>
      )}

      {!circle && (
        <TextIcon icon={withIcon(IconShareLINE)({})} spacing="base">
          LINE
        </TextIcon>
      )}
    </button>
  )
}

export default LINE
