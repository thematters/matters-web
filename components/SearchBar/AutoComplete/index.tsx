import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'
import { Query, QueryResult } from 'react-apollo'

import { Empty, Icon, Menu, Spinner, Translate } from '~/components'

import { toPath } from '~/common/utils'
import ICON_SEARCH from '~/static/icons/search.svg?sprite'
import { SearchAutoComplete } from './__generated__/SearchAutoComplete'
import styles from './styles.css'

const SEARCH_AUTOCOMPLETE = gql`
  query SearchAutoComplete {
    frequentSearch(input: { first: 5 })
    viewer {
      id
      activity {
        recentSearches(input: { first: 3 }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node
          }
        }
      }
    }
  }
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

const AutoComplete = ({ hideDropdown }: { hideDropdown: () => void }) => (
  <section className="container">
    <Query query={SEARCH_AUTOCOMPLETE}>
      {({
        data,
        loading,
        error
      }: QueryResult & { data: SearchAutoComplete }) => {
        if (loading) {
          return <Spinner />
        }

        if (error) {
          return <span>{JSON.stringify(error)}</span> // TODO
        }

        const recentSearches = data.viewer.activity.recentSearches.edges

        return (
          <Menu width="100%">
            <Menu.Header
              title={
                <Translate
                  translations={{ zh_hant: '熱門搜尋', zh_hans: '热门搜索' }}
                />
              }
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
            {data.frequentSearch.length <= 0 && <EmptyAutoComplete />}

            <Menu.Divider />

            <Menu.Header
              title={
                <Translate
                  translations={{ zh_hant: '搜尋歷史', zh_hans: '搜索历史' }}
                />
              }
            >
              {recentSearches.length > 0 && (
                <button type="button" className="clear-history-btn">
                  <Translate
                    translations={{ zh_hant: '清空', zh_hans: '清空' }}
                  />
                </button>
              )}
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
          </Menu>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </section>
)

export default AutoComplete
