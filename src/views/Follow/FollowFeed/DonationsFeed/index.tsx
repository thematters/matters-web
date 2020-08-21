import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyFolloweeDonatedArticles,
  InfiniteScroll,
  List,
  Spinner,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'
import { QueryError } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { analytics, mergeConnections } from '~/common/utils'

import styles from './styles.css'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import {
  FolloweeDonatedArticlesFeed,
  FolloweeDonatedArticlesFeed_viewer_recommendation_followeeDonatedArticles_edges_node_followee as FolloweeDonatedArticlesFeedFollowee,
} from './__generated__/FolloweeDonatedArticlesFeed'

const FOLLOWEE_DONATED_ARTICLES = gql`
  query FolloweeDonatedArticlesFeed($after: String) {
    viewer {
      id
      recommendation {
        followeeDonatedArticles(input: { first: 10, after: $after }) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              article {
                ...ArticleDigestFeedArticlePublic
                ...ArticleDigestFeedArticlePrivate
              }
              followee {
                id
                ...UserDigestMiniUser
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
  ${UserDigest.Mini.fragments.user}
`

const DonationsArticles = ({ isCompactMode }: { isCompactMode: boolean }) => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    FolloweeDonatedArticlesFeed
  >(FOLLOWEE_DONATED_ARTICLES)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.followeeDonatedArticles'
  const { edges, pageInfo } =
    data?.viewer?.recommendation.followeeDonatedArticles || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyFolloweeDonatedArticles />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'followee-donated-article',
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

  const Followee = ({
    node,
  }: {
    node: FolloweeDonatedArticlesFeedFollowee
  }) => {
    if (!node) {
      return null
    }

    let userDigestProps = {}
    if (isCompactMode) {
      userDigestProps = {
        avatarSize: 'sm',
        textSize: 'sm',
      }
    } else {
      userDigestProps = {
        avatarSize: 'lg',
        textSize: 'md-s',
        textWeight: 'md',
      }
    }

    return (
      <section className="followee">
        <UserDigest.Mini
          user={node}
          avatarSize="lg"
          textSize="md-s"
          textWeight="md"
          hasAvatar
          hasDisplayName
          {...userDigestProps}
        />

        <TextIcon size="sm" color="grey-dark">
          <Translate zh_hant="支持了" zh_hans="支持了" />
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
              article={node.article}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'followee-donated-article',
                  contentType: 'article',
                  styleType: 'no_cover',
                  location: i,
                })
              }
              extraHeader={<Followee node={node.followee} />}
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const DonationsFeed = () => {
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const { viewMode } = data?.clientPreference || { viewMode: 'comfortable' }
  const isCompactMode = viewMode === 'compact'

  return <DonationsArticles isCompactMode={isCompactMode} />
}

export default DonationsFeed
