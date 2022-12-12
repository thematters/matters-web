import _uniq from 'lodash/uniq'
import _without from 'lodash/without'
import { useContext, useEffect, useState } from 'react'

import {
  Head,
  Layout,
  PullToRefresh,
  // SearchAutoComplete,
  SearchBar,
  SearchHistory,
  // SearchOverview,
  SearchQuickResult,
  useResponsive,
  useRoute,
  ViewerContext,
} from '~/components'

import { STORAGE_KEY_SEARCH_HISTORY } from '~/common/enums'
import { storage, toPath } from '~/common/utils'

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
      20
    )
    updateSearchHistory(nsh)
  }

  const removeSearchHistory = (searchKey: string) => {
    const nsh = _without(searchHistory, searchKey)
    updateSearchHistory(nsh)
  }

  const { getQuery, router } = useRoute()
  const q = getQuery('q')
  const isSmallUp = useResponsive('sm-up')

  const [typingKey, setTypingKey] = useState('')
  const resetAutoComplete = () => setTypingKey('')
  const onCancel = () => {
    const path = toPath({ page: 'search' })
    router.push(path.href)
  }

  const isHistory = !q && !typingKey
  const isQuickResult = !q && typingKey
  const isAggregate = !isHistory && !isQuickResult

  // const showBackButton = isSmallUp && isOverview
  // const showMeButton = !isSmallUp && isOverview

  const showCancelButton = !isHistory

  useEffect(() => {
    if (!isHistory) return

    setSearchHistory(storage.get(storageKey))
  }, [storageKey])

  useEffect(() => {
    if (!isAggregate) return

    addSearchHistory(q)
  }, [isAggregate, q, storageKey])

  useEffect(() => {
    router.events.on('routeChangeStart', resetAutoComplete)
    return () => router.events.off('routeChangeStart', resetAutoComplete)
  }, [])

  return (
    <Layout.Main>
      <Layout.Header
        left={isSmallUp && <Layout.Header.BackButton />}
        right={
          isSmallUp ? (
            <Layout.Header.Title id="search" />
          ) : (
            <>
              <SearchBar hasDropdown={false} onChange={setTypingKey} />

              {showCancelButton && (
                <span style={{ marginLeft: '1rem' }}>
                  <Layout.Header.CancelButton onClick={onCancel} />
                </span>
              )}
            </>
          )
        }
      />

      <Head title={{ id: 'search' }} />

      <PullToRefresh>
        {isHistory && !isSmallUp && (
          <SearchHistory
            data={searchHistory.slice(0, 10)}
            removeSearchHistoryItem={removeSearchHistory}
          />
        )}
        {isQuickResult && <SearchQuickResult searchKey={typingKey} inPage />}

        {isAggregate && <AggregateResults />}
      </PullToRefresh>
    </Layout.Main>
  )
}

export default Search
