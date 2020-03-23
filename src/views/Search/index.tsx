import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {
  Head,
  Layout,
  SearchAutoComplete,
  SearchBar,
  SearchOverview,
  useResponsive
} from '~/components'

import { getQuery, routerPush, toPath } from '~/common/utils'

import AggregateResults from './AggregateResults'
// import EmptySearch from './EmptySearch'
import SearchArticles from './SearchArticles'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'
import styles from './styles.css'

const Search = () => {
  const router = useRouter()
  const type = getQuery({ router, key: 'type' })
  const q = getQuery({ router, key: 'q' })
  const isSmallUp = useResponsive('sm-up')
  const [typingKey, setTypingKey] = useState('')
  const resetAutoComplete = () => setTypingKey('')
  const onCancel = () => {
    const path = toPath({ page: 'search' })
    routerPush(path.href, path.as)
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
    <Layout.Main>
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
              <Layout.Header.CancelButton
                onClick={onCancel}
                style={{ marginLeft: '1rem' }}
              />
            )}
          </>
        }
        marginBottom={0}
      />

      <Head title={{ id: 'search' }} />

      {isOverview && <SearchOverview inPage />}
      {isAutoComplete && <SearchAutoComplete searchKey={typingKey} inPage />}

      {isTagOnly && <SearchTags />}
      {isUserOnly && <SearchUsers />}
      {isArticleOnly && <SearchArticles />}
      {isAggregate && <AggregateResults />}

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default Search
