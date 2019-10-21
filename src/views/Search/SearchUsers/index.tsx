import gql from 'graphql-tag'

import {
  InfiniteScroll,
  PageHeader,
  Spinner,
  Translate,
  UserDigest
} from '~/components'
import { useQuery } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import EmptySearch from '../EmptySearch'
import ViewAll from '../ViewAll'
import { SeachUsers } from './__generated__/SeachUsers'
import styles from './styles.css'

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
            ...UserDigestFullDescUser
          }
        }
      }
    }
  }
  ${UserDigest.FullDesc.fragments.user}
`

const Header = ({ viewAll, q }: { viewAll?: boolean; q?: string }) => (
  <PageHeader
    is="h2"
    pageTitle={
      <Translate zh_hant={TEXT.zh_hant.user} zh_hans={TEXT.zh_hans.user} />
    }
  >
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
            zh_hant={TEXT.zh_hant.emptySearchResults}
            zh_hans={TEXT.zh_hans.emptySearchResults}
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
  const { data, loading, fetchMore } = useQuery<SeachUsers>(SEARCH_USERS, {
    variables: { key: q, first: isAggregate ? 3 : 10 }
  })

  if (loading) {
    return <Spinner />
  }

  const connectionPath = 'search'
  const { edges, pageInfo } = (data && data.search) || {}

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
        <ul>
          {edges.map(
            ({ node, cursor }, i) =>
              node.__typename === 'User' && (
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

      <style jsx>{styles}</style>
    </section>
  )
}

export default SearchUser
