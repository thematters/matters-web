import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from 'react-apollo'

import { Empty, Icon, Menu, Spinner, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'
import ICON_SEARCH from '~/static/icons/search.svg?sprite'

import { SearchAutoComplete } from './__generated__/SearchAutoComplete'
import ClearHistoryButton from './ClearHistoryButton'
import styles from './styles.css'

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
    icon={
      <Icon id={ICON_SEARCH.id} viewBox={ICON_SEARCH.viewBox} size="xlarge" />
    }
    description="暫無搜尋歷史"
    size="small"
  />
)

const AutoComplete = ({
  hideDropdown,
  searchKey = ''
}: {
  hideDropdown: () => void
  searchKey?: string
}) => {
  const { data, loading } = useQuery<SearchAutoComplete>(SEARCH_AUTOCOMPLETE, {
    variables: { searchKey },
    skip: !process.browser
  })

  if (loading) {
    return (
      <section className="container">
        <Spinner />

        <style jsx>{styles}</style>
      </section>
    )
  }

  if (!data || !data.viewer || !data.frequentSearch) {
    return null
  }

  const recentSearches = data.viewer.activity.recentSearches.edges || []
  const frequentSearch = data.frequentSearch
  const hasFrequentSearch = frequentSearch.length > 0
  const hasSearchHistory = !searchKey

  if (!hasFrequentSearch && !hasSearchHistory) {
    return null
  }

  return (
    <section className="container">
      <Menu width="full">
        {hasFrequentSearch && (
          <>
            <Menu.Header
              title={<Translate zh_hant="熱門搜尋" zh_hans="热门搜索" />}
            />

            {frequentSearch.map(key => (
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
                  <a onClick={hideDropdown} className="frequent-item">
                    {key}
                  </a>
                </Link>
              </Menu.Item>
            ))}
          </>
        )}

        {hasSearchHistory && (
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

            {recentSearches.map(({ node }) => {
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
                    <a onClick={hideDropdown} className="history-item">
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

      <style jsx>{styles}</style>
    </section>
  )
}

export default AutoComplete
