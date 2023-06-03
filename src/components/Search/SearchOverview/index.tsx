import classNames from 'classnames'
import Link from 'next/link'
import { Fragment, useContext, useEffect } from 'react'

import { toPath } from '~/common/utils'
import { Menu, Translate, usePublicQuery, ViewerContext } from '~/components'
import { Spinner } from '~/components/Spinner'
import { SearchOverviewPublicQuery } from '~/gql/graphql'

import ClearHistoryButton from './ClearHistoryButton'
import { SEARCH_AUTOCOMPLETE_PRIVATE, SEARCH_AUTOCOMPLETE_PUBLIC } from './gql'
import styles from './styles.module.css'

interface SearchOverviewProps {
  inPage?: boolean
}

export const SearchOverview = ({ inPage }: SearchOverviewProps) => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, client } = usePublicQuery<SearchOverviewPublicQuery>(
    SEARCH_AUTOCOMPLETE_PUBLIC
  )

  const frequentSearch = data?.frequentSearch || []
  const recentSearches = data?.viewer?.activity.recentSearches.edges || []
  const showFrequentSearch = frequentSearch.length > 0
  const showSearchHistory = recentSearches.length > 0

  const recentSearchesClasses = classNames({
    [styles['recent-searches']]: true,
    [styles.inPage]: inPage,
  })
  const frequentSearchesClasses = classNames({
    [styles['frequent-searches']]: true,
    [styles.inPage]: inPage,
  })

  // private data
  const loadPrivate = () => {
    if (!viewer.isAuthed) {
      return
    }

    client.query({
      query: SEARCH_AUTOCOMPLETE_PRIVATE,
      fetchPolicy: 'network-only',
    })
  }

  useEffect(() => {
    loadPrivate()
  }, [viewer.id])

  /**
   * Render
   */
  if (loading) {
    return (
      <Menu width={inPage ? undefined : 'md'}>
        <Spinner />
      </Menu>
    )
  }

  if (!showFrequentSearch && !showSearchHistory) {
    return null
  }

  return (
    <Menu width={inPage ? undefined : 'md'}>
      {showSearchHistory && (
        <section className={recentSearchesClasses}>
          <Menu.Header
            title={<Translate id="searchHistory" />}
            size={inPage ? 'lg' : 'md-s'}
          >
            <ClearHistoryButton />
          </Menu.Header>

          <ul>
            {recentSearches.map(({ node: key }, i) => (
              <li key={key}>
                <Link
                  {...toPath({
                    page: 'search',
                    q: key,
                  })}
                  legacyBehavior
                >
                  <a className={styles['key']}>{key}</a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showFrequentSearch && (
        <section className={frequentSearchesClasses}>
          <Menu.Header
            title={<Translate id="frequentSearch" />}
            size={inPage ? 'lg' : 'md-s'}
          />

          {frequentSearch.map((key, i) => (
            <Fragment key={key}>
              <Menu.Divider />
              <Menu.Item
                {...toPath({
                  page: 'search',
                  q: key,
                })}
                key={key}
              >
                <span className={styles['key']}>{key}</span>
              </Menu.Item>
            </Fragment>
          ))}
        </section>
      )}
    </Menu>
  )
}
