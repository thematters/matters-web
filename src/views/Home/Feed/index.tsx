import { useContext, useState } from 'react'

import { FEATUED_CHANNEL_SHORT_HASH } from '~/common/enums'
import { Layout, Spacer, useRoute, ViewerContext } from '~/components'

import ChannelFeed from './ChannelFeed'
import MainFeed from './MainFeed'

export type FeedType = 'icymi' | 'newest'

const HomeFeed = () => {
  const { isInPath, getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed
  const isInNewest = isInPath('NEWEST')
  const isInChannel = isInPath('CHANNEL')
  const isInFeatured = isInPath('FEATURED') || (!isAuthed && isInPath('HOME'))
  const featuredShortHash =
    process.env.NODE_ENV === 'production'
      ? FEATUED_CHANNEL_SHORT_HASH.production
      : FEATUED_CHANNEL_SHORT_HASH.development
  const isInMockFeatured =
    isInPath('FEATURED') || getQuery('shortHash') === featuredShortHash

  const [feedType] = useState<FeedType>(isInNewest ? 'newest' : 'icymi')

  return (
    <Layout.Main>
      {!isInChannel && !isInFeatured && <Spacer size="sp20" />}
      {isInChannel || isInMockFeatured ? (
        <ChannelFeed shortHash={isInMockFeatured ? featuredShortHash : ''} />
      ) : (
        <MainFeed feedType={feedType} />
      )}
    </Layout.Main>
  )
}

export default HomeFeed
