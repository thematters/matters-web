import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { SegmentedTabs, useRoute } from '~/components'

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
    <SegmentedTabs sticky>
      <SegmentedTabs.Tab
        {...circleDetailPath}
        selected={isInPath('CIRCLE_DETAIL')}
      >
        <FormattedMessage defaultMessage="Articles" id="3KNMbJ" />
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab
        {...circleDiscussionPath}
        selected={isInPath('CIRCLE_DISCUSSION')}
      >
        <FormattedMessage defaultMessage="Discussion" id="20bImY" />
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab
        {...circleBroadcastPath}
        selected={isInPath('CIRCLE_BROADCAST')}
      >
        <FormattedMessage defaultMessage="Broadcast" id="beLe/F" />
      </SegmentedTabs.Tab>
    </SegmentedTabs>
  )
}

export default CircleDetailTabs
