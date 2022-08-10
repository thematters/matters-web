import { useState } from 'react'

import { useRoute } from '~/components'

import MainFeed from './MainFeed'
import SortBy, { HomeFeedType } from './SortBy'

const HomeFeed = () => {
  const { getQuery, setQuery } = useRoute()
  const qsType = getQuery('type') as HomeFeedType

  const [feedType, setFeedType] = useState<HomeFeedType>(qsType || 'hottest')

  const changeFeed = (newType: HomeFeedType) => {
    setQuery('type', newType)
    setFeedType(newType)
  }

  return (
    <>
      <SortBy feedType={feedType} setFeedType={changeFeed} />
      <MainFeed feedSortType={feedType} />
    </>
  )
}

export default HomeFeed
