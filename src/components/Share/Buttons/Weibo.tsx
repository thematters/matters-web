import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconShareWeibo } from '@/public/static/icons/16px/share-weibo.svg'
import { ReactComponent as IconShareWeiboCircle } from '@/public/static/icons/40px/share-weibo-circle.svg'
import { dom } from '~/common/utils'
import { TextIcon, withIcon } from '~/components'

const Weibo = ({
  title,
  link,
  circle,
}: {
  title: string
  link: string
  circle?: boolean
}) => {
  // append utm_source to link
  const utm_source = 'share_weibo'
  const url = new URL(link)
  url.searchParams.append('utm_source', utm_source)
  link = url.toString()

  return (
    <button
      type="button"
      onClick={() => {
        const cover = dom
          .$('meta[property="og:image"]')
          ?.getAttribute('content') as string
        const shareUrl = `http://service.weibo.com/share/share.php?${new URLSearchParams(
          {
            url: link,
            title,
            pic: cover,
          }
        ).toString()}`
        return window.open(shareUrl, '分享到微博')
      }}
    >
      {circle && withIcon(IconShareWeiboCircle)({ size: 'xlM' })}

      {!circle && (
        <TextIcon icon={withIcon(IconShareWeibo)({})} spacing="base">
          <FormattedMessage
            defaultMessage="Weibo"
            id="rBjwQy"
            description="src/components/Share/Buttons/Weibo.tsx"
          />
        </TextIcon>
      )}
    </button>
  )
}

export default Weibo
