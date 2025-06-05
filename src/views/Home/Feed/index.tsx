import { useContext, useState } from 'react'

import { Layout, Spacer, useRoute, ViewerContext } from '~/components'

import ChannelFeed from './ChannelFeed'
import MainFeed from './MainFeed'

export type FeedType = 'icymi' | 'newest'

const HomeFeed = () => {
  const { isInPath } = useRoute()
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed
  const isInNewest = isInPath('NEWEST')
  const isInChannel = isInPath('CHANNEL')
  const isInFeatured = isInPath('FEATURED') || (!isAuthed && isInPath('HOME'))

  const [feedType] = useState<FeedType>(isInNewest ? 'newest' : 'icymi')

  return (
    <Layout.Main>
      {!isInChannel && !isInFeatured && <Spacer size="sp20" />}
      {isInChannel ? <ChannelFeed /> : <MainFeed feedType={feedType} />}
    </Layout.Main>
  )
}

export default HomeFeed
