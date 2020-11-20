import gql from 'graphql-tag'

import {
  Card,
  EmptyTag,
  Head,
  InfiniteScroll,
  Layout,
  Spinner,
  usePublicQuery,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import { TagsButtons } from './Buttons'
import CardTag from './Card'
import styles from './styles.css'

import { AllTagsPublic } from './__generated__/AllTagsPublic'

const ALL_TAGS = gql`
  query AllTagsPublic($after: String) {
    viewer @connection(key: "viewerTags") {
      id
      recommendation {
        tags(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              ...CardTag
            }
          }
        }
      }
    }
  }
  ${CardTag.fragments.tag}
`

const Tags = () => {
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch,
  } = usePublicQuery<AllTagsPublic>(ALL_TAGS)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.tags'
  const { edges, pageInfo } = data?.viewer?.recommendation.tags || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTag />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'all_tags',
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
      <ul>
        {edges.map(({ node }, i) => (
          <li key={node.id}>
            <Card
              spacing={[0, 0]}
              {...toPath({
                page: 'tagDetail',
                id: node.id,
              })}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'all_tags',
                  contentType: 'tag',
                  styleType: 'title',
                  location: i,
                })
              }
            >
              <CardTag tag={node} />
            </Card>
          </li>
        ))}

        {/* for maintain grid alignment */}
        <li />
        <li />
        <li />

        <style jsx>{styles}</style>
      </ul>
    </InfiniteScroll>
  )
}

export default () => (
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

    <Tags />
  </Layout.Main>
)
