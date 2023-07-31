import { useState } from 'react'

import { Dialog } from '~/components'

import CirclesFeed from '../CirclesFeed'
import FeedType, { FollowingFeedType } from '../FeedType'
import TagsFeed from '../TagsFeed'
import UsersFeed from '../UsersFeed'

const FollowingDialogContent = () => {
  const [feedType, setFeedType] = useState<FollowingFeedType>('user')

  return (
    <Dialog.Content noSpacing>
      <FeedType type={feedType} setFeedType={setFeedType} />
      {feedType === 'circle' && <CirclesFeed />}
      {feedType === 'tag' && <TagsFeed />}
      {feedType === 'user' && <UsersFeed />}
    </Dialog.Content>
  )
}

export default FollowingDialogContent
