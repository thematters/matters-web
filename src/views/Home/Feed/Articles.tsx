import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  ArticleDigestCard,
  ArticleDigestSidebar,
  // List,
  Spinner,
  useResponsive
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import FeedHeader from './FeedHeader'
import styles from './styles.css'
import TopicSidebarArticleDigest from './TopicSidebarArticleDigest'

import { IcymiFeed } from './__generated__/IcymiFeed'
import { TopicsFeed } from './__generated__/TopicsFeed'

type FeedTypes = 'icymi' | 'topics'

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
  const isMediumUp = useResponsive('md-up')

  const feedClass = classNames({
    'horizontal-feed': !isMediumUp,
    'article-feed': true
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

  const tranckClick = (i: number) => () =>
    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
      type: FEED_TYPE.ICYMI,
      location: i
    })

  return (
    <section className={feedClass}>
      <FeedHeader type={type} />
      {
        <ul>
          {edges.map(({ node, cursor }, i) =>
            isMediumUp ? (
              type === 'icymi' ? (
                <li
                  key={cursor}
                  onClick={tranckClick(i)}
                  style={{ marginTop: 16, marginBottom: 24 }}
                >
                  <ArticleDigestSidebar
                    article={node}
                    titleTextSize="sm"
                    hasCover
                  />
                </li>
              ) : (
                <li key={cursor} onClick={tranckClick(i)}>
                  <TopicSidebarArticleDigest article={node} />
                </li>
              )
            ) : (
              <li key={cursor} onClick={tranckClick(i)}>
                {<ArticleDigestCard article={node} />}
              </li>
            )
          )}
        </ul>
      }
      <style jsx>{styles}</style>
    </section>
  )
}

export default Feed
