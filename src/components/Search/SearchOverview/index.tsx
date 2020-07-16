import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import { gql } from '@apollo/client'
import Link from 'next/link'
import { Fragment } from 'react'

import { Menu, Translate } from '~/components'
import { Spinner } from '~/components/Spinner'

import { toPath } from '~/common/utils'

import ClearHistoryButton from './ClearHistoryButton'
import styles from './styles.css'

import { SearchOverview as SearchOverviewType } from './__generated__/SearchOverview'

interface SearchOverviewProps {
  inPage?: boolean
}

const SEARCH_AUTOCOMPLETE = gql`
  query SearchOverview {
    frequentSearch(input: { first: 5, key: "" })
    viewer {
      id
      ...RecentSearchesUser
    }
  }
  ${ClearHistoryButton.fragments.user}
`

export const SearchOverview = ({ inPage }: SearchOverviewProps) => {
  const { data, loading } = useQuery<SearchOverviewType>(SEARCH_AUTOCOMPLETE)

  const frequentSearch = data?.frequentSearch || []
  const recentSearches = data?.viewer?.activity.recentSearches.edges || []
  const showFrequentSearch = frequentSearch.length > 0
  const showSearchHistory = recentSearches.length > 0

  const recentSearchesClass = classNames({
    'recent-searches': true,
    inPage,
  })
  const frequentSearchesClass = classNames({
    'frequent-searches': true,
    inPage,
  })

  if (loading) {
    return (
      <Menu width={inPage ? undefined : 'md'}>
        <Spinner />
      </Menu>
    )
  }

  if (!showFrequentSearch && !showSearchHistory) {
    // TODO: Empty Notice
    return null
  }

  return (
    <Menu width={inPage ? undefined : 'md'}>
      {showSearchHistory && (
        <section className={recentSearchesClass}>
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
                >
                  <a className="key">{key}</a>
                </Link>
              </li>
            ))}
          </ul>

          <style jsx>{styles}</style>
        </section>
      )}

      {showFrequentSearch && (
        <section className={frequentSearchesClass}>
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
                <span className="key">{key}</span>
              </Menu.Item>
            </Fragment>
          ))}

          <style jsx>{styles}</style>
        </section>
      )}
    </Menu>
  )
}
