import { useState } from 'react'

import { Dialog, Spacer } from '~/components'

// FEATURE IS SUNSETTING: circle tab is hidden
// import CirclesFeed from '../CirclesFeed'
import FeedType, { FollowingFeedType } from '../FeedType'
import UsersFeed from '../UsersFeed'

const FollowingDialogContent = () => {
  const [feedType, setFeedType] = useState<FollowingFeedType>('user')

  return (
    <Dialog.Content noSpacing>
      <FeedType type={feedType} setFeedType={setFeedType} />
      <Spacer size="sp8" />
      {/* FEATURE IS SUNSETTING: circle tab is hidden */}
      {/* {feedType === 'circle' && <CirclesFeed />} */}
      {feedType === 'user' && <UsersFeed />}
    </Dialog.Content>
  )
}

export default FollowingDialogContent
