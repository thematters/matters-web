import { ReactComponent as IconShareLINE } from '@/public/static/icons/16px/share-line.svg'
import { ReactComponent as IconShareLINECircle } from '@/public/static/icons/40px/share-line-circle.svg'
import { analytics } from '~/common/utils'
import { TextIcon, withIcon } from '~/components'

const LINE = ({
  title,
  link,
  circle,
}: {
  title: string
  link: string
  circle?: boolean
}) => {
  // append utm_source to link
  const utm_source = 'share_line'
  const url = new URL(link)
  url.searchParams.append('utm_source', utm_source)
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
      {circle && withIcon(IconShareLINECircle)({ size: 'xlM' })}

      {!circle && (
        <TextIcon icon={withIcon(IconShareLINE)({})} spacing="base">
          LINE
        </TextIcon>
      )}
    </button>
  )
}

export default LINE
