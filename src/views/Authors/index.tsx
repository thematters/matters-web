import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  EmptyWarning,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
  Translate,
  UserDigest,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections } from '~/common/utils'

import { AllAuthors } from './__generated__/AllAuthors'

const ALL_AUTHORSS = gql`
  query AllAuthors($after: String) {
    viewer {
      id
      recommendation {
        authors(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...UserDigestRichUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

const Authors = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<AllAuthors>(
    ALL_AUTHORSS
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.authors'
  const { edges, pageInfo } = data?.viewer?.recommendation.authors || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={<Translate zh_hant="還沒有作者" zh_hans="还没有作者" />}
      />
    )
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'all_authors',
      location: edges.length,
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List hasBorder={false}>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <UserDigest.Rich
              user={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'all_authors',
                  styleType: 'card',
                  contentType: 'user',
                  location: i,
                })
              }
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="allAuthors" />}
    />

    <Head title={{ id: 'allAuthors' }} />

    <Authors />
  </Layout.Main>
)
