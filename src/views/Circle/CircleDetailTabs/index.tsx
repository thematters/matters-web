import { Tabs, Translate, useRoute } from '~/components'

import { toPath } from '~/common/utils'

const CircleDetailTabs = () => {
  const { isInPath, getQuery } = useRoute()
  const name = getQuery('name')

  const circleDetailPath = toPath({
    page: 'circleDetail',
    circle: { name },
  })

  return (
    <Tabs sticky>
      <Tabs.Tab {...circleDetailPath} selected={isInPath('CIRCLE_DETAIL')}>
        <Translate id="article" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default CircleDetailTabs
