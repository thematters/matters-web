import { useState } from 'react'

import { useRoute } from '~/components'

import MainFeed from './MainFeed'
import SortBy, { SortByType } from './SortBy'

const HomeFeed = () => {
  const { getQuery, setQuery } = useRoute()
  const qsType = getQuery('type') as SortByType

  const [type, setType] = useState<SortByType>(qsType || 'hottest')

  const setSortBy = (newType: SortByType) => {
    setQuery('type', newType)
    setType(newType)
  }

  return (
    <>
      <SortBy sortBy={type} setSortBy={setSortBy} />
      <MainFeed feedSortType={type} />
    </>
  )
}

export default HomeFeed
