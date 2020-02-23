import Link from 'next/link'

import { Icon, TextIcon, Translate } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'

const ViewAll = ({
  q,
  type
}: {
  q: string
  type: 'article' | 'tag' | 'user'
}) => {
  const viewAllPath = toPath({
    page: 'search',
    type,
    q
  })

  return (
    <Link {...viewAllPath}>
      <a
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.DISPLAY_ALL, {
            type: `${type}-search`
          })
        }}
      >
        <TextIcon
          icon={<Icon.Right size="xs" />}
          textPlacement="left"
          color="green"
        >
          <Translate id="viewAll" />
        </TextIcon>
      </a>
    </Link>
  )
}

export default ViewAll
