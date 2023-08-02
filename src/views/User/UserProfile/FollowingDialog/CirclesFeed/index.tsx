import { useState } from 'react'

import CirclesTabs, { CirclesFeedType } from './CirclesTabs'
import FollowingFeed from './FollowingFeed'
import SubscribedFeed from './SubscribedFeed'

const CirclesFeed = () => {
  const [feedType, setFeedType] = useState<CirclesFeedType>('following')

  return (
    <>
      <CirclesTabs type={feedType} setFeedType={setFeedType} />
      {feedType === 'following' && <FollowingFeed />}
      {feedType === 'subscribed' && <SubscribedFeed />}
    </>
  )
}

export default CirclesFeed
