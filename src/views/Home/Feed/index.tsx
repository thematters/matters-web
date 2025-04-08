import { useContext, useState } from 'react'

import { Layout, Spacer, useRoute, ViewerContext } from '~/components'

import MainFeed, { MainFeedType } from './MainFeed'

const HomeFeed = () => {
  const { getQuery, isInPath } = useRoute()
  const qsType = getQuery('type') as MainFeedType
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed

  const [feedType] = useState<MainFeedType>(qsType || 'icymi')

  const isInChannel = isInPath('CHANNEL')
  const isInIcymi =
    getQuery('type') === 'icymi' ||
    (!isAuthed && isInPath('HOME') && !getQuery('type'))

  return (
    <Layout.Main>
      {!isInChannel && !isInIcymi && <Spacer size="sp20" />}
      <MainFeed feedSortType={feedType} />
    </Layout.Main>
  )
}

export default HomeFeed
