import { useEffect, useState } from 'react'

import { useRoute } from '~/components'

import MainFeed from './MainFeed'
import SortBy, { SortByType } from './SortBy'

const HomeFeed = () => {
  const { getQuery, setQuery } = useRoute()
  const qsType = getQuery('type') as SortByType

  const [type, setType] = useState<SortByType>('hottest')

  const setSortBy = (newType: SortByType) => {
    setQuery('type', newType)
    setType(newType)
  }

  // read from query
  useEffect(() => {
    const validTypes: SortByType[] = ['hottest', 'newest', 'icymi']
    const newType = validTypes.indexOf(qsType) >= 0 ? qsType : ''

    if (newType) {
      setType(newType)
    }
  }, [qsType])

  return (
    <>
      <SortBy sortBy={type} setSortBy={setSortBy} />
      <MainFeed feedSortType={type} />
    </>
  )
}

export default HomeFeed
