import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconShareDouban } from '@/public/static/icons/16px/share-douban.svg'
import { ReactComponent as IconShareDoubanCircle } from '@/public/static/icons/40px/share-douban-circle.svg'
import { analytics, dom } from '~/common/utils'
import { TextIcon, withIcon } from '~/components'

const Douban = ({
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
      const description = dom
        .$('meta[name="description"]')
        ?.getAttribute('content') as string
      const shareUrl = `http://www.douban.com/share/service?${new URLSearchParams(
        {
          href: link,
          name: title,
          text: description,
        }
      ).toString()}`
      analytics.trackEvent('share', {
        type: 'douban',
      })
      return window.open(shareUrl)
    }}
  >
    {circle && withIcon(IconShareDoubanCircle)({ size: 'xlM' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareDouban)({})} spacing="base">
        <FormattedMessage
          defaultMessage="Douban"
          description="src/components/Share/Buttons/Douban.tsx"
        />
      </TextIcon>
    )}
  </button>
)

export default Douban
