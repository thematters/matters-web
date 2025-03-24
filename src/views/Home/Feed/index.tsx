import { useContext, useState } from 'react'

import { Layout, Spacer, useRoute, ViewerContext } from '~/components'

import MainFeed from './MainFeed'
import { HomeFeedType } from './SortBy'

const HomeFeed = () => {
  const { getQuery, isInPath } = useRoute()
  const qsType = getQuery('type') as HomeFeedType
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed

  const [feedType] = useState<HomeFeedType>(qsType || 'icymi')

  const isInChannel = isInPath('CHANNEL')
  const isInIcymi =
    getQuery('type') === 'icymi' ||
    (!isAuthed && isInPath('HOME') && !getQuery('type'))

  // const changeFeed = (newType: HomeFeedType) => {
  //   setQuery('type', newType === 'hottest' ? '' : newType)
  //   setFeedType(newType)
  // }

  return (
    <>
      {/* <SortBy feedType={feedType} setFeedType={changeFeed} /> */}

      <Layout.Main>
        {!isInChannel && !isInIcymi && <Spacer size="sp20" />}
        <MainFeed feedSortType={feedType} />
      </Layout.Main>
    </>
  )
}

export default HomeFeed
