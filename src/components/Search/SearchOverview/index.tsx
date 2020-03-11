import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { Fragment } from 'react'

import { LinkWrapper, Menu, Translate } from '~/components'
import { Spinner } from '~/components/Spinner'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'

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
    inPage
  })
  const frequentSearchesClass = classNames({
    'frequent-searches': true,
    inPage
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
            {recentSearches.map(({ node }, i) => (
              <li key={node}>
                <LinkWrapper
                  {...toPath({
                    page: 'search',
                    q: node
                  })}
                  onClick={() => {
                    analytics.trackEvent(
                      ANALYTICS_EVENTS.CLICK_SEARCH_HISTORY,
                      {
                        location: i,
                        entrance: node
                      }
                    )
                  }}
                >
                  {node}
                </LinkWrapper>
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
                  q: key
                })}
                onClick={() => {
                  analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FREQUENT_SEARCH, {
                    location: i,
                    entrance: key
                  })
                }}
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
