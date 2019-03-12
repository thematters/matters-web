import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import {
  InfiniteScroll,
  PageHeader,
  Spinner,
  Translate,
  UserDigest
} from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import EmptySearch from '../EmptySearch'
import ViewAll from '../ViewAll'
import { SeachUsers } from './__generated__/SeachUsers'
import styles from './styles.css'

const SEARCH_USERS = gql`
  query SeachUsers($first: Int!, $key: String!, $cursor: String) {
    search(input: { key: $key, type: User, first: $first, after: $cursor }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestFullDescUser
          }
        }
      }
    }
  }
  ${UserDigest.FullDesc.fragments.user}
`

const Header = ({ viewAll, q }: { viewAll?: boolean; q?: string }) => (
  <PageHeader is="h2" pageTitle={<Translate zh_hant="用戶" zh_hans="用户" />}>
    {viewAll && q && <ViewAll q={q} type="user" />}
  </PageHeader>
)

const EmptySearchResult = () => {
  return (
    <section>
      <Header />
      <EmptySearch
        description={
          <Translate
            zh_hant="沒有找到你搜尋的內容。"
            zh_hans="没有找到你搜索的内容。"
          />
        }
      />
    </section>
  )
}

const SearchUser = ({
  q,
  isAggregate
}: {
  q: string
  isAggregate: boolean
}) => {
  return (
    <>
      <Query
        query={SEARCH_USERS}
        variables={{ key: q, first: isAggregate ? 3 : 10 }}
      >
        {({
          data,
          loading,
          error,
          fetchMore
        }: QueryResult & { data: SeachUsers }) => {
          if (loading) {
            return <Spinner />
          }

          const connectionPath = 'search'
          const { edges, pageInfo } = _get(data, connectionPath, {})
          const loadMore = () => {
            analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
              type: FEED_TYPE.SEARCH_USER,
              location: edges.length,
              entrance: q
            })
            return fetchMore({
              variables: {
                cursor: pageInfo.endCursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) =>
                mergeConnections({
                  oldData: previousResult,
                  newData: fetchMoreResult,
                  path: connectionPath
                })
            })
          }

          if (!edges || edges.length <= 0) {
            return isAggregate ? null : <EmptySearchResult />
          }

          return (
            <section>
              <InfiniteScroll
                hasNextPage={!isAggregate && pageInfo.hasNextPage}
                loadMore={loadMore}
              >
                <Header q={q} viewAll={isAggregate && pageInfo.hasNextPage} />
                <ul>
                  {edges.map(
                    (
                      { node, cursor }: { node: any; cursor: any },
                      i: number
                    ) => (
                      <li
                        key={cursor}
                        onClick={() =>
                          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                            type: FEED_TYPE.SEARCH_USER,
                            location: i,
                            entrance: q
                          })
                        }
                      >
                        <UserDigest.FullDesc user={node} />
                      </li>
                    )
                  )}
                </ul>
              </InfiniteScroll>
            </section>
          )
        }}
      </Query>
      <style jsx>{styles}</style>
    </>
  )
}

export default SearchUser
