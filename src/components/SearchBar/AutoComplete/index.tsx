import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'

import { Button, Menu, TextIcon, Translate } from '~/components'
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
  const showSearchHistory = !searchKey && recentSearches.length > 0

  if (loading) {
    return <Spinner />
  }

  if (!showFrequentSearch && !showSearchHistory) {
    hideDropdown()
    return null
  }

  return (
    <Menu width="md">
      {showSearchHistory && (
        <>
          <Menu.Header
            title={
              <Translate
                zh_hant={TEXT.zh_hant.searchHistory}
                zh_hans={TEXT.zh_hans.searchHistory}
              />
            }
          >
            <ClearHistoryButton />
          </Menu.Header>

          <section className="recent-searches">
            {recentSearches.map(({ node }, i) => (
              <Button
                spacing={['xxtight', 'xtight']}
                bgColor="grey-lighter"
                {...toPath({
                  page: 'search',
                  q: node
                })}
                onClick={() => {
                  analytics.trackEvent(ANALYTICS_EVENTS.CLICK_SEARCH_HISTORY, {
                    location: i,
                    entrance: node
                  })
                  hideDropdown()
                }}
                key={node}
              >
                <TextIcon color="grey-darker">{node}</TextIcon>
              </Button>
            ))}

            <style jsx>{styles}</style>
          </section>
        </>
      )}

      {showFrequentSearch && (
        <>
          <Menu.Header
            title={<Translate zh_hant="熱門搜尋" zh_hans="热门搜索" />}
          />

          {frequentSearch.map((key, i) => (
            <>
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
                  hideDropdown()
                }}
                key={key}
              >
                <TextIcon color="green">{key}</TextIcon>
              </Menu.Item>
            </>
          ))}
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
