import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  InfiniteScroll,
  List,
  PageHeader,
  Spinner,
  Translate,
  UserDigest,
  ViewAllButton
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections, toPath } from '~/common/utils'

import EmptySearch from '../EmptySearch'

import { SeachUsers } from './__generated__/SeachUsers'

const SEARCH_USERS = gql`
  query SeachUsers($first: Int!, $key: String!, $after: String) {
    search(input: { key: $key, type: User, first: $first, after: $after }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestRichUser
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

const Header = ({ viewAll, q }: { viewAll?: boolean; q?: string }) => (
  <PageHeader is="h2" title={<Translate id="user" />}>
    {viewAll && q && (
      <ViewAllButton
        {...toPath({
          page: 'search',
          type: 'user',
          q
        })}
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.DISPLAY_ALL, {
            type: 'user-search'
          })
        }}
      />
    )}
  </PageHeader>
)

const EmptySearchResult = () => {
  return (
    <section>
      <Header />
      <EmptySearch description={<Translate id="emptySearchResults" />} />
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
  const { data, loading, fetchMore } = useQuery<SeachUsers>(SEARCH_USERS, {
    variables: { key: q, first: isAggregate ? 3 : 10 }
  })

  if (loading) {
    return <Spinner />
  }

  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return isAggregate ? null : <EmptySearchResult />
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.SEARCH_USER,
      location: edges.length,
      entrance: q
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })
  }

  return (
    <section>
      <InfiniteScroll
        hasNextPage={!isAggregate && pageInfo.hasNextPage}
        loadMore={loadMore}
      >
        <Header q={q} viewAll={isAggregate && pageInfo.hasNextPage} />
        <List>
          {edges.map(
            ({ node, cursor }, i) =>
              node.__typename === 'User' && (
                <List.Item key={cursor}>
                  <UserDigest.Rich
                    user={node}
                    hasFollow
                    onClick={() =>
                      analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                        type: FEED_TYPE.SEARCH_USER,
                        location: i,
                        entrance: q
                      })
                    }
                  />
                </List.Item>
              )
          )}
        </List>
      </InfiniteScroll>
    </section>
  )
}

export default SearchUser
