import { useState } from 'react'

import { Layout, Spacer, useRoute } from '~/components'

import MainFeed from './MainFeed'
import { HomeFeedType } from './SortBy'

const HomeFeed = () => {
  const { getQuery } = useRoute()
  const qsType = getQuery('type') as HomeFeedType

  const [feedType] = useState<HomeFeedType>(qsType || 'icymi')

  // const changeFeed = (newType: HomeFeedType) => {
  //   setQuery('type', newType === 'hottest' ? '' : newType)
  //   setFeedType(newType)
  // }

  return (
    <>
      {/* <SortBy feedType={feedType} setFeedType={changeFeed} /> */}

      <Layout.Main>
        <Spacer size="sp20" />
        <MainFeed feedSortType={feedType} />
      </Layout.Main>
    </>
  )
}

export default HomeFeed
