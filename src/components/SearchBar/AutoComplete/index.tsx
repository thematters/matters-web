import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useEffect } from 'react'

import { Empty, Icon, Menu, Translate } from '~/components'
import { Spinner } from '~/components/Spinner'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'

import ClearHistoryButton from './ClearHistoryButton'
import styles from './styles.css'

import { SearchAutoComplete } from './__generated__/SearchAutoComplete'

interface Props {
  hideDropdown: () => void
  isShown: boolean
  searchKey?: string
}

const SEARCH_AUTOCOMPLETE = gql`
  query SearchAutoComplete($searchKey: String) {
    frequentSearch(input: { first: 5, key: $searchKey })
    viewer {
      id
      ...RecentSearchesUser
    }
  }
  ${ClearHistoryButton.fragments.user}
`

const EmptyAutoComplete = () => (
  <Empty
    icon={<Icon.Search color="grey" size="xl" />}
    description={<Translate zh_hant="暫無搜尋歷史" zh_hans="暂无搜索历史" />}
    size="sm"
  />
)

const AutoComplete = ({ hideDropdown, searchKey = '', isShown }: Props) => {
  const [getAutoComplete, { data, loading }] = useLazyQuery<SearchAutoComplete>(
    SEARCH_AUTOCOMPLETE,
    {
      variables: { searchKey }
    }
  )

  useEffect(() => {
    if (isShown) {
      getAutoComplete()
    }
  }, [searchKey, isShown])

  const frequentSearch = data?.frequentSearch || []
  const recentSearches = data?.viewer?.activity.recentSearches.edges || []
  const showFrequentSearch = frequentSearch.length > 0
  const showSearchHistory = !searchKey

  if (loading) {
    return <Spinner />
  }

  if (!showFrequentSearch && !showSearchHistory) {
    return null
  }

  return (
    <Menu width="full">
      {showFrequentSearch && (
        <>
          <Menu.Header
            title={<Translate zh_hant="熱門搜尋" zh_hans="热门搜索" />}
          />

          {frequentSearch.map((key, i) => (
            <Menu.Item
              spacing={['xtight', 'tight']}
              hoverBgColor="green"
              key={key}
            >
              <Link
                {...toPath({
                  page: 'search',
                  q: key
                })}
              >
                <a
                  onClick={() => {
                    analytics.trackEvent(
                      ANALYTICS_EVENTS.CLICK_FREQUENT_SEARCH,
                      {
                        location: i,
                        entrance: key
                      }
                    )
                    hideDropdown()
                  }}
                  className="u-link-green"
                >
                  {key}
                </a>
              </Link>
            </Menu.Item>
          ))}
        </>
      )}

      {showSearchHistory && (
        <>
          <Menu.Divider />

          <Menu.Header
            title={
              <Translate
                zh_hant={TEXT.zh_hant.searchHistory}
                zh_hans={TEXT.zh_hans.searchHistory}
              />
            }
          >
            {recentSearches.length > 0 && <ClearHistoryButton />}
          </Menu.Header>

          {recentSearches.map(({ node }, i) => {
            const path = toPath({
              page: 'search',
              q: node
            })
            return (
              <Menu.Item
                spacing={['xtight', 'tight']}
                hoverBgColor="green"
                key={node}
              >
                <Link {...path}>
                  <a
                    onClick={() => {
                      analytics.trackEvent(
                        ANALYTICS_EVENTS.CLICK_SEARCH_HISTORY,
                        {
                          location: i,
                          entrance: node
                        }
                      )
                      hideDropdown()
                    }}
                    className="history-item"
                  >
                    {node}
                  </a>
                </Link>
              </Menu.Item>
            )
          })}

          {recentSearches.length <= 0 && <EmptyAutoComplete />}
        </>
      )}
    </Menu>
  )
}

export default (props: Props) => (
  <section className="container">
    <AutoComplete {...props} />

    <style jsx>{styles}</style>
  </section>
)
