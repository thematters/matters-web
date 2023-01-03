import _uniq from 'lodash/uniq'
import _without from 'lodash/without'
import { useContext, useEffect, useState } from 'react'

import { STORAGE_KEY_SEARCH_HISTORY } from '~/common/enums'
import { storage, toPath } from '~/common/utils'
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

import AggregateResults from './AggregateResults'
import styles from './styles.css'
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
  // TODO: Just test for product team, will be removed when release
  const cancelable = getQuery('cancelable')

  const isLargeUp = useResponsive('lg-up')

  const [typingKey, setTypingKey] = useState('')
  const resetAutoComplete = () => setTypingKey('')
  const onCancel = () => {
    const path = toPath({ page: 'search' })
    router.replace(path.href)
  }

  const isHistory = !q && !typingKey
  const isQuickResult = !q && typingKey
  const isAggregate = !isHistory && !isQuickResult

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

  useEffect(() => {
    router.events.on('routeChangeStart', resetAutoComplete)
    return () => router.events.off('routeChangeStart', resetAutoComplete)
  }, [])

  return (
    <Layout.Main>
      <Layout.Header
        left={isLargeUp && <Layout.Header.BackButton />}
        right={
          isLargeUp ? (
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
        className="layoutHeader"
      />

      <Head title={{ id: 'search' }} />

      <PullToRefresh>
        {isHistory && !isLargeUp && (
          <SearchHistory
            data={searchHistory.slice(0, 10)}
            removeSearchHistoryItem={removeSearchHistory}
          />
        )}
        {isQuickResult && <SearchQuickResult searchKey={typingKey} inPage />}

        {isAggregate && <AggregateResults />}
      </PullToRefresh>
      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default Search
