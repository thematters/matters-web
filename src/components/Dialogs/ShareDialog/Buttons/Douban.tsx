import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconShareDouban } from '@/public/static/icons/16px/share-douban.svg'
import { ReactComponent as IconShareDoubanCircle } from '@/public/static/icons/40px/share-douban-circle.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics, dom } from '~/common/utils'
import { TextIcon, ViewerContext, withIcon } from '~/components'

const Douban = ({
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
  const utm_source = 'share_douban'
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
            id="NONfAh"
            description="src/components/Share/Buttons/Douban.tsx"
          />
        </TextIcon>
      )}
    </button>
  )
}

export default Douban
