import { Router } from 'next/router'
import { useEffect, useState } from 'react'

import {
  Head,
  Layout,
  PullToRefresh,
  SearchAutoComplete,
  SearchBar,
  SearchOverview,
  useResponsive,
  useRoute,
} from '~/components'

import { toPath } from '~/common/utils'

import AggregateResults from './AggregateResults'
// import EmptySearch from './EmptySearch'
import SearchArticles from './SearchArticles'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'

const Search = () => {
  const { getQuery, router } = useRoute()
  const type = getQuery('type')
  const q = getQuery('q')
  const isSmallUp = useResponsive('sm-up')
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
  const showBackButton = isSmallUp && isOverview
  const showMeButton = !isSmallUp && isOverview
  const showCancelButton = !isOverview

  useEffect(() => {
    Router.events.on('routeChangeStart', resetAutoComplete)
    return () => Router.events.off('routeChangeStart', resetAutoComplete)
  }, [])

  return (
    <Layout.Main bgColor={isAggregate ? 'grey-lighter' : undefined}>
      <Layout.Header
        left={
          showBackButton ? (
            <Layout.Header.BackButton />
          ) : showMeButton ? (
            <Layout.Header.MeButton />
          ) : null
        }
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
        {isOverview && <SearchOverview inPage />}
        {isAutoComplete && <SearchAutoComplete searchKey={typingKey} inPage />}

        {isTagOnly && <SearchTags />}
        {isUserOnly && <SearchUsers />}
        {isArticleOnly && <SearchArticles />}
        {isAggregate && <AggregateResults />}
      </PullToRefresh>
    </Layout.Main>
  )
}

export default Search
