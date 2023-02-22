import _uniq from 'lodash/uniq'
import _without from 'lodash/without'
import { useContext, useEffect, useState } from 'react'

import {
  SEARCH_HISTORY_DISPLAY_LENGTH,
  SEARCH_HISTORY_LENGTH,
  STORAGE_KEY_SEARCH_HISTORY,
} from '~/common/enums'
import { storage, toPath } from '~/common/utils'
import {
  Head,
  Layout,
  Media,
  SearchBar,
  SearchHistory,
  useRoute,
  ViewerContext,
} from '~/components'

import AggregateResults from './AggregateResults'
// import EmptySearch from './EmptySearch'

const Search = () => {
  const viewer = useContext(ViewerContext)
  const storageKey = STORAGE_KEY_SEARCH_HISTORY + '_' + viewer.id

  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const updateSearchHistory = (value: string[]) => {
    storage.set(storageKey, value)
    setSearchHistory(value)
  }

  const addSearchHistory = (searchKey: string) => {
    const nsh = _uniq([searchKey, ...(storage.get(storageKey) || [])]).slice(
      0,
      SEARCH_HISTORY_LENGTH
    )
    updateSearchHistory(nsh)
  }

  const removeSearchHistory = (searchKey: string) => {
    const nsh = _without(searchHistory, searchKey)
    updateSearchHistory(nsh)
  }

  const { getQuery, router } = useRoute()
  const q = getQuery('q')
  // TODO: Just test for product team, will be removed when release
  const cancelable = getQuery('cancelable')

  const onCancel = () => {
    const path = toPath({ page: 'search' })
    router.replace(path.href)
  }

  const isHistory = !q
  const isAggregate = !isHistory

  // const showBackButton = isSmallUp && isOverview
  // const showMeButton = !isSmallUp && isOverview

  const showCancelButton = !isHistory && cancelable

  useEffect(() => {
    if (!isHistory) return

    setSearchHistory(storage.get(storageKey))
  }, [storageKey])

  useEffect(() => {
    if (!isAggregate) return

    addSearchHistory(q)
  }, [isAggregate, q, storageKey])

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Media at="xl">
            <Layout.Header.BackButton />
          </Media>
        }
        right={
          <>
            <Media at="xl">
              <Layout.Header.Title id="search" />
            </Media>
            <Media lessThan="xl">
              <SearchBar hasDropdown={false} />
              {showCancelButton && (
                <span style={{ marginLeft: '1rem' }}>
                  <Layout.Header.CancelButton onClick={onCancel} />
                </span>
              )}
            </Media>
          </>
        }
        className="layoutHeader"
      />

      <Head title={{ id: 'search' }} />

      {isHistory && (
        <Media lessThan="xl">
          <SearchHistory
            data={searchHistory?.slice(0, SEARCH_HISTORY_DISPLAY_LENGTH)}
            removeSearchHistoryItem={removeSearchHistory}
          />
        </Media>
      )}
      {isAggregate && <AggregateResults />}
    </Layout.Main>
  )
}

export default Search
