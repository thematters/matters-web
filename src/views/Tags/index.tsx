import gql from 'graphql-tag'

import {
  EmptyTag,
  Head,
  InfiniteScroll,
  Layout,
  QueryError,
  Spinner,
  TagDigest,
  usePublicQuery,
} from '~/components'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import { TagsButtons } from './Buttons'
import styles from './styles.css'

import { AllTagsPublic } from './__generated__/AllTagsPublic'

const ALL_TAGS = gql`
  query AllTagsPublic($after: String) {
    viewer @connection(key: "viewerTags") {
      id
      recommendation {
        tags(input: { first: 1 }) {
          edges {
            node {
              id
              recommended(input: { first: 20, after: $after }) {
                pageInfo {
                  startCursor
                  endCursor
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    id
                    ...TagDigestFeedTag
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${TagDigest.Feed.fragments.tag}
`

const BaseTags = () => {
  const { data, loading, error, fetchMore, refetch } =
    usePublicQuery<AllTagsPublic>(ALL_TAGS)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  // TODO: revise query
  const connectionPath = 'viewer.recommendation.tags.edges.0.node.recommended'
  const tag =
    data?.viewer?.recommendation.tags.edges &&
    data?.viewer?.recommendation.tags.edges[0]
  const { edges, pageInfo } = tag?.node.recommended || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTag />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'all_tags',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
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
      <ul>
        {edges.map(({ node }, i) => (
          <li key={node.id}>
            <TagDigest.Feed
              tag={node}
              spacing={['xtight', 'xtight']}
              {...toPath({
                page: 'tagDetail',
                id: node.id,
              })}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'all_tags',
                  contentType: 'tag',
                  location: i,
                  id: node.id,
                })
              }
            />
          </li>
        ))}

        <style jsx>{styles}</style>
      </ul>
    </InfiniteScroll>
  )
}

const Tags = () => (
  <Layout.Main>
    <Head title={{ id: 'allTags' }} />

    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={
        <>
          <Layout.Header.Title id="allTags" />
          <TagsButtons.CreateButton />
        </>
      }
    />

    <BaseTags />
  </Layout.Main>
)

export default Tags
