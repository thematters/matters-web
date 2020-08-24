import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyArticle,
  InfiniteScroll,
  List,
  Spinner,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'
import { QueryError } from '~/components/GQL'
import { UserDigestMiniProps } from '~/components/UserDigest/Mini'

import { analytics, mergeConnections } from '~/common/utils'

import styles from './styles.css'

import {
  FollowArticlesFeed,
  FollowArticlesFeed_viewer_recommendation_followeeArticles_edges_node_author as FollowArticlesFeedAuthor,
} from './__generated__/FollowArticlesFeed'

const FOLLOW_ARTICLES = gql`
  query FollowArticlesFeed($after: String) {
    viewer {
      id
      recommendation {
        followeeArticles(input: { first: 10, after: $after }) {
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
                ...ArticleDigestFeedArticlePublic
                ...ArticleDigestFeedArticlePrivate
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

const ArticlesFeed = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    FollowArticlesFeed
  >(FOLLOW_ARTICLES)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.followeeArticles'
  const { edges, pageInfo } =
    data?.viewer?.recommendation.followeeArticles || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
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

  const actor = ({ node }: { node: FollowArticlesFeedAuthor }) => (
    props: Partial<UserDigestMiniProps>
  ) => {
    if (!node) {
      return null
    }

    return (
      <section className="author">
        <UserDigest.Mini
          user={node}
          avatarSize="lg"
          textSize="md-s"
          textWeight="md"
          hasAvatar
          hasDisplayName
          {...props}
        />

        <TextIcon size="sm" color="grey-dark">
          <Translate zh_hant="發佈了" zh_hans="发布了" />
        </TextIcon>
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
              actor={actor({ node: node.author })}
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default ArticlesFeed
