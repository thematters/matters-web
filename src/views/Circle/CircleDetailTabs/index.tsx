import { Tabs, Translate, useRoute } from '~/components'

import { toPath } from '~/common/utils'

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
        <Translate id="article" />
      </Tabs.Tab>

      <Tabs.Tab
        {...circleDiscussionPath}
        selected={isInPath('CIRCLE_DISCUSSION')}
      >
        <Translate id="circleDiscussion" />
      </Tabs.Tab>

      <Tabs.Tab
        {...circleBroadcastPath}
        selected={isInPath('CIRCLE_BROADCAST')}
      >
        <Translate id="circleBroadcast" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default CircleDetailTabs
