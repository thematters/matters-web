import gql from 'graphql-tag'
import Link from 'next/link'
import { useEffect } from 'react'
import { useLazyQuery } from 'react-apollo'

import { Empty, Icon, Menu, Translate } from '~/components'
import { Spinner } from '~/components/Spinner'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'
import ICON_SEARCH from '~/static/icons/search.svg?sprite'

import { SearchAutoComplete } from './__generated__/SearchAutoComplete'
import ClearHistoryButton from './ClearHistoryButton'
import styles from './styles.css'

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
    icon={
      <Icon id={ICON_SEARCH.id} viewBox={ICON_SEARCH.viewBox} size="xlarge" />
    }
    description={<Translate zh_hant="暫無搜尋歷史" zh_hans="暂无搜索历史" />}
    size="small"
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

  const frequentSearch = (data && data.frequentSearch) || []
  const recentSearches =
    (data && data.viewer && data.viewer.activity.recentSearches.edges) || []
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
  )
}

export default (props: Props) => (
  <section className="container">
    <AutoComplete {...props} />

    <style jsx>{styles}</style>
  </section>
)
