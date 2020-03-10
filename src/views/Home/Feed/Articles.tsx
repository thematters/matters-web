import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  ArticleDigestCard,
  ArticleDigestSidebar,
  List,
  Spinner,
  useResponsive
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import FeedHeader from './FeedHeader'
import styles from './styles.css'

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
              }
            }
          }
        }
      }
    }
    ${ArticleDigestSidebar.fragments.article}
    ${ArticleDigestCard.fragments.article}
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
                ...ArticleDigestSidebarArticle
                ...ArticleDigestCardArticle
              }
            }
          }
        }
      }
    }
    ${ArticleDigestSidebar.fragments.article}
    ${ArticleDigestCard.fragments.article}
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
      {isMediumUp ? (
        <List spacing={['loose', 0]}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <ArticleDigestSidebar
                article={node}
                titleTextSize="sm"
                hasCover
                onClick={tranckClick(i)}
              />
            </List.Item>
          ))}
        </List>
      ) : (
        <ul>
          {edges.map(({ node, cursor }, i) => (
            <li key={cursor}>
              {<ArticleDigestCard article={node} onClick={tranckClick(i)} />}
            </li>
          ))}
        </ul>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

export default Feed
