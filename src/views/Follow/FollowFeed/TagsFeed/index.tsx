import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _find from 'lodash/find'
import _intersection from 'lodash/intersection'
import _reverse from 'lodash/reverse'
import _sortBy from 'lodash/sortBy'

import {
  ArticleDigestFeed,
  EmptyFollowingTag,
  InfiniteScroll,
  List,
  Spinner,
  Tag,
  Translate,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections } from '~/common/utils'

import styles from './styles.css'

import {
  FollowingTagsArticlesFeed,
  FollowingTagsArticlesFeed_viewer_recommendation_followingTagsArticles_edges_node as FollowingTagsArticlesFeedNode,
} from './__generated__/FollowingTagsArticlesFeed'
import { FollowingTagsFeed } from './__generated__/FollowingTagsFeed'

const FOLLOWING_TAGS = gql`
  query FollowingTagsFeed {
    viewer {
      id
      recommendation {
        followingTags(input: { first: null }) {
          edges {
            node {
              ... on Tag {
                id
              }
            }
          }
        }
      }
    }
  }
`

const FOLLOWING_TAGS_ARTICLES = gql`
  query FollowingTagsArticlesFeed($after: String) {
    viewer {
      id
      recommendation {
        followingTagsArticles(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              __typename
              ... on Article {
                tags {
                  ...DigestTag
                  createdAt
                }
                ...ArticleDigestFeedArticle
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article}
  ${Tag.fragments.tag}
`

const TagsArticles = ({ tagIds }: { tagIds: string[] }) => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    FollowingTagsArticlesFeed
  >(FOLLOWING_TAGS_ARTICLES)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.followingTagsArticles'
  const { edges, pageInfo } =
    data?.viewer?.recommendation.followingTagsArticles || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyFollowingTag />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'follow',
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
        }),
    })
  }

  const TagComponent = ({ node }: { node: FollowingTagsArticlesFeedNode }) => {
    if (!node || !node.tags || node.tags.length <= 0) {
      return null
    }

    const tags = _sortBy(node?.tags || [], ['createdAt'])
    const matches = _intersection(
      tags.map(({ id }) => id),
      tagIds
    )
    if (!matches || matches.length <= 0) {
      return null
    }
    const tag = _find(tags, { id: matches[0] })
    if (!tag) {
      return null
    }
    return (
      <section className="tag">
        <Tag tag={tag} type="inline" active={true} />
        <span>
          <Translate zh_hant="新增了" zh_hans="新增了" />
        </span>
        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <TagComponent node={node} />
            <ArticleDigestFeed
              article={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'follow-article',
                  contentType: 'article',
                  styleType: 'no_cover',
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

const TagsFeed = () => {
  const { data, loading, error } = useQuery<FollowingTagsFeed>(FOLLOWING_TAGS)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const { edges } = data?.viewer?.recommendation.followingTags || {}

  if (!edges || edges.length <= 0) {
    return <EmptyFollowingTag />
  }

  const tagIds = edges.map(({ node }) => node.id)

  return <TagsArticles tagIds={tagIds} />
}

export default TagsFeed
