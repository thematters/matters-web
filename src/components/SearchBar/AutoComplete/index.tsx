import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'
import { QueryResult } from 'react-apollo'

import { Empty, Icon, Menu, Spinner, Translate } from '~/components'
import { Query } from '~/components/GQL'

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
}) => (
  <section className="container">
    <Query
      query={SEARCH_AUTOCOMPLETE}
      skip={!process.browser}
      variables={{ searchKey }}
    >
      {({
        data,
        loading,
        error
      }: QueryResult & { data: SearchAutoComplete }) => {
        if (loading) {
          return <Spinner />
        }

        const recentSearches = data.viewer.activity.recentSearches.edges

        return (
          (!searchKey || data.frequentSearch.length > 0) && (
            <Menu width="full">
              {data.frequentSearch.length > 0 && (
                <>
                  <Menu.Header
                    title={<Translate zh_hant="熱門搜尋" zh_hans="热门搜索" />}
                  />
                  {data.frequentSearch.map((key: any) => {
                    const path = toPath({
                      page: 'search',
                      q: key
                    })
                    return (
                      <Menu.Item
                        spacing={['xtight', 'tight']}
                        hoverBgColor="green"
                        key={key}
                      >
                        <Link {...path}>
                          <a onClick={hideDropdown} className="frequent-item">
                            {key}
                          </a>
                        </Link>
                      </Menu.Item>
                    )
                  })}
                </>
              )}

              {!searchKey && (
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
                  {recentSearches.map(({ node }: { node: any }) => {
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
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </section>
)

export default AutoComplete
