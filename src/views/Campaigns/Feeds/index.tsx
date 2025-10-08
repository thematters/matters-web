import { useState } from 'react'

import { useRoute } from '~/components'

import Feed from './Feed'
import Tabs, { CAMPAIGNS_FEED_TYPE_IN_PROGRESS } from './Tabs'

const Feeds = () => {
  const { getQuery, setQuery } = useRoute()
  const qsType = getQuery('type')

  const [feedType, setFeedType] = useState<string>(
    qsType || CAMPAIGNS_FEED_TYPE_IN_PROGRESS
  )

  const changeFeed = (type: string) => {
    setQuery('type', type === CAMPAIGNS_FEED_TYPE_IN_PROGRESS ? '' : type)
    setFeedType(type)
  }

  return (
    <section>
      <Tabs feedType={feedType} setFeedType={changeFeed} />
      <Feed feedType={feedType} />
    </section>
  )
}

export default Feeds
