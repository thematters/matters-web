import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  ArticleDigestCard,
  ArticleDigestSidebar,
  Spinner,
  useResponsive
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import FeedHeader from './FeedHeader'
import styles from './styles.css'
import TopicSidebarArticleDigest from './TopicSidebarArticleDigest'

import {
  IcymiFeed,
  IcymiFeed_viewer_recommendation_articles_edges_node
} from './__generated__/IcymiFeed'
import {
  TopicsFeed,
  TopicsFeed_viewer_recommendation_articles_edges_node
} from './__generated__/TopicsFeed'

type FeedTypes = 'icymi' | 'topics'

type ArticleNode =
  | IcymiFeed_viewer_recommendation_articles_edges_node
  | TopicsFeed_viewer_recommendation_articles_edges_node

const FeedQueries = {
  icymi: gql`
    query IcymiFeed($first: Int, $after: String) {
      viewer {
        id
        recommendation {
          articles: icymi(input: { first: $first, after: $after }) {
            edges {
              cursor
              node {
                ...ArticleDigestSidebarArticle
                ...ArticleDigestCardArticle
                ...TopicSidebarArticleDigestArticle
              }
            }
          }
        }
      }
    }
    ${ArticleDigestSidebar.fragments.article}
    ${ArticleDigestCard.fragments.article}
    ${TopicSidebarArticleDigest.fragments.article}
  `,
  topics: gql`
    query TopicsFeed($first: Int, $after: String) {
      viewer {
        id
        recommendation {
          articles: topics(input: { first: $first, after: $after }) {
            edges {
              cursor
              node {
                ...TopicSidebarArticleDigestArticle
                ...ArticleDigestCardArticle
                ...ArticleDigestSidebarArticle
              }
            }
          }
        }
      }
    }
    ${TopicSidebarArticleDigest.fragments.article}
    ${ArticleDigestCard.fragments.article}
    ${ArticleDigestSidebar.fragments.article}
  `
}

const Feed = ({
  first = 5,
  after,
  type = 'icymi'
}: {
  first?: number
  after?: string
  type?: FeedTypes
}) => {
  const QUERY = FeedQueries[type]
  const isLargeUp = useResponsive('lg-up')

  const feedClass = classNames({
    'horizontal-feed': !isLargeUp,
    'article-feed': true,
    'vertical-card': type === 'icymi'
  })

  const { data, loading } = useQuery<IcymiFeed | TopicsFeed>(QUERY, {
    variables: {
      first,
      after
    }
  })
  const edges = data?.viewer?.recommendation.articles.edges

  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  // analytics
  const trackClick = (i: number) => () =>
    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
      type: { icymi: FEED_TYPE.ICYMI, topics: FEED_TYPE.TOPICS }[type],
      location: i
    })

  // determine element type
  let ArticleDigest: React.FC<{ article: ArticleNode }> = ArticleDigestCard
  if (isLargeUp) {
    ArticleDigest =
      type === 'icymi'
        ? ({ article }: { article: ArticleNode }) => (
            <ArticleDigestSidebar
              article={article}
              titleTextSize="sm"
              hasCover
            />
          )
        : TopicSidebarArticleDigest
  }

  return (
    <section className={feedClass}>
      <FeedHeader type={type} />

      <ul>
        {edges.map(({ node }, i) => (
          <li onClick={trackClick(i)} key={i}>
            <ArticleDigest article={node} />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Feed
