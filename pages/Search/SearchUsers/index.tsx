import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { Error } from '~/components/Error'
import { InfiniteScroll } from '~/components/Interaction'
import { Translate } from '~/components/Language'
import { PageHeader } from '~/components/PageHeader'
import { Spinner } from '~/components/Spinner'
import { UserDigest } from '~/components/UserDigest'

import { mergeConnections } from '~/common/utils'

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

          if (error) {
            return <Error error={error} />
          }

          const connectionPath = 'search'
          const { edges, pageInfo } = _get(data, connectionPath, {})
          const loadMore = () =>
            fetchMore({
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
                  {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                    <li key={cursor}>
                      <UserDigest.FullDesc user={node} />
                    </li>
                  ))}
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
