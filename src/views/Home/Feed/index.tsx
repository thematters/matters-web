import { useContext, useState } from 'react'

import { Layout, Spacer, useRoute, ViewerContext } from '~/components'

import ChannelFeed from './ChannelFeed'
import MainFeed from './MainFeed'

export type FeedType = 'icymi' | 'newest' | 'hottest' | 'channel'

const HomeFeed = () => {
  const { getQuery, isInPath } = useRoute()
  const qsType = getQuery('type') as FeedType
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed

  const [feedType] = useState<FeedType>(qsType || 'icymi')

  const isInChannel = isInPath('CHANNEL')
  const isInIcymi =
    getQuery('type') === 'icymi' ||
    (!isAuthed && isInPath('HOME') && !getQuery('type'))

  return (
    <Layout.Main>
      {!isInChannel && !isInIcymi && <Spacer size="sp20" />}
      {isInChannel ? <ChannelFeed /> : <MainFeed feedType={feedType} />}
    </Layout.Main>
  )
}

export default HomeFeed
