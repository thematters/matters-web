import { useState } from 'react'

import { Dialog, Spacer } from '~/components'

import CirclesFeed from '../CirclesFeed'
import FeedType, { FollowingFeedType } from '../FeedType'
import UsersFeed from '../UsersFeed'

const FollowingDialogContent = () => {
  const [feedType, setFeedType] = useState<FollowingFeedType>('user')

  return (
    <Dialog.Content noSpacing>
      <FeedType type={feedType} setFeedType={setFeedType} />
      <Spacer size="sp8" />
      {feedType === 'circle' && <CirclesFeed />}
      {feedType === 'user' && <UsersFeed />}
    </Dialog.Content>
  )
}

export default FollowingDialogContent
