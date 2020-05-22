import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ArticleDigestCard, Slides, Spinner } from '~/components'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'

import { IcymiFeed } from './__generated__/IcymiFeed'
import { TopicsFeed } from './__generated__/TopicsFeed'

interface FeedArticlesProps {
  type?: 'icymi' | 'topics'
}

const FEED_ARTICLES = {
  icymi: gql`
    query IcymiFeed {
      viewer {
        id
        recommendation {
          articles: icymi(input: { first: 5 }) {
            edges {
              cursor
              node {
                ...ArticleDigestCardArticle
              }
            }
          }
        }
      }
    }
    ${ArticleDigestCard.fragments.article}
  `,
  topics: gql`
    query TopicsFeed {
      viewer {
        id
        recommendation {
          articles: topics(input: { first: 5 }) {
            edges {
              cursor
              node {
                ...ArticleDigestCardArticle
              }
            }
          }
        }
      }
    }
    ${ArticleDigestCard.fragments.article}
  `,
}

const FeedArticles = ({ type = 'icymi' }: FeedArticlesProps) => {
  const { data, loading } = useQuery<IcymiFeed | TopicsFeed>(
    FEED_ARTICLES[type]
  )
  const edges = data?.viewer?.recommendation.articles.edges

  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <Slides bgColor="green-lighter" header={<SectionHeader type={type} />}>
      {edges.map(({ node }, i) => (
        <Slides.Item key={i}>
          <ArticleDigestCard
            article={node}
            onClick={() =>
              analytics.trackEvent('click_feed', {
                type,
                contentType: 'article',
                styleType: 'card',
                location: i,
              })
            }
          />
        </Slides.Item>
      ))}
    </Slides>
  )
}

export default FeedArticles
