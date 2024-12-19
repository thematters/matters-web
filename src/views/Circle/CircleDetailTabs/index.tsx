import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Button, SquareTabs, useRoute } from '~/components'

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
    <SquareTabs sticky spacing="sm">
      <SquareTabs.Tab
        selected={isInPath('CIRCLE_DETAIL')}
        title={
          <Button {...circleDetailPath}>
            <FormattedMessage defaultMessage="Articles" id="3KNMbJ" />
          </Button>
        }
      />

      <SquareTabs.Tab
        {...circleDiscussionPath}
        selected={isInPath('CIRCLE_DISCUSSION')}
        title={
          <Button {...circleDiscussionPath}>
            <FormattedMessage defaultMessage="Discussion" id="20bImY" />
          </Button>
        }
      />

      <SquareTabs.Tab
        selected={isInPath('CIRCLE_BROADCAST')}
        title={
          <Button {...circleBroadcastPath}>
            <FormattedMessage defaultMessage="Broadcast" id="beLe/F" />
          </Button>
        }
      />
    </SquareTabs>
  )
}

export default CircleDetailTabs
