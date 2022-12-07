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
import SearchArticles from './SearchArticles'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'

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
  const type = getQuery('type')
  const q = getQuery('q')
  const isSmallUp = useResponsive('sm-up')
  console.log({ isSmallUp })
  const [typingKey, setTypingKey] = useState('')
  const resetAutoComplete = () => setTypingKey('')
  const onCancel = () => {
    const path = toPath({ page: 'search' })
    router.push(path.href)
  }

  const isOverview = !q && !typingKey
  const isAutoComplete = typingKey
  const isTagOnly = !isAutoComplete && type === 'tag'
  const isUserOnly = !isAutoComplete && type === 'user'
  const isArticleOnly = !isAutoComplete && type === 'article'
  const isAggregate =
    !isOverview &&
    !isAutoComplete &&
    !isTagOnly &&
    !isUserOnly &&
    !isArticleOnly
  // const showBackButton = isSmallUp && isOverview
  // const showMeButton = !isSmallUp && isOverview
  const showCancelButton = !isOverview

  useEffect(() => {
    if (!isOverview) return

    setSearchHistory(storage.get(storageKey))
  }, [])

  useEffect(() => {
    if (!isAggregate) return

    addSearchHistory(q)
  }, [isAggregate, q, viewer])

  useEffect(() => {
    router.events.on('routeChangeStart', resetAutoComplete)
    return () => router.events.off('routeChangeStart', resetAutoComplete)
  }, [])

  console.log({ searchHistory })

  return (
    <Layout.Main bgColor={isAggregate ? 'grey-lighter' : undefined}>
      <Layout.Header
        // left={
        //   showBackButton ? (
        //     <Layout.Header.BackButton />
        //   ) : showMeButton ? (
        //     <Layout.Header.MeButton />
        //   ) : null
        // }
        right={
          <>
            <SearchBar hasDropdown={false} onChange={setTypingKey} />

            {showCancelButton && (
              <span style={{ marginLeft: '1rem' }}>
                <Layout.Header.CancelButton onClick={onCancel} />
              </span>
            )}
          </>
        }
      />

      <Head title={{ id: 'search' }} />

      <PullToRefresh>
        {isOverview && (
          <SearchHistory
            data={searchHistory.slice(0, 10)}
            removeSearchHistoryItem={removeSearchHistory}
          />
        )}
        {isAutoComplete && <SearchQuickResult searchKey={typingKey} inPage />}

        {isTagOnly && <SearchTags />}
        {isUserOnly && <SearchUsers />}
        {isArticleOnly && <SearchArticles />}
        {isAggregate && <AggregateResults />}
      </PullToRefresh>
    </Layout.Main>
  )
}

export default Search
