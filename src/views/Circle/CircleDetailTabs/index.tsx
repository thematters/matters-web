import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Tabs, useRoute } from '~/components'

const CircleDetailTabs = () => {
  const { isInPath, getQuery } = useRoute()
  const name = getQuery('name')

  const circleDetailPath = toPath({
    page: 'circleDetail',
    circle: { name },
  })
  const circleDiscussionPath = toPath({
    page: 'circleDiscussion',
    circle: { name },
  })
  const circleBroadcastPath = toPath({
    page: 'circleBroadcast',
    circle: { name },
  })

  return (
    <Tabs sticky>
      <Tabs.Tab {...circleDetailPath} selected={isInPath('CIRCLE_DETAIL')}>
        <FormattedMessage defaultMessage="Articles" description="" />
      </Tabs.Tab>

      <Tabs.Tab
        {...circleDiscussionPath}
        selected={isInPath('CIRCLE_DISCUSSION')}
      >
        <FormattedMessage defaultMessage="Discussion" description="" />
      </Tabs.Tab>

      <Tabs.Tab
        {...circleBroadcastPath}
        selected={isInPath('CIRCLE_BROADCAST')}
      >
        <FormattedMessage defaultMessage="Broadcast" description="" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default CircleDetailTabs
