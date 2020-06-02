import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { ArticleDigestTitle, Card, List, Spinner } from '~/components'

import { analytics, getQuery, toPath } from '~/common/utils'

import styles from './styles.css'
import ViewMoreButton from './ViewMoreButton'

import { SeachAggregateArticles } from './__generated__/SeachAggregateArticles'

const SEARCH_AGGREGATE_ARTICLES = gql`
  query SeachAggregateArticles($key: String!) {
    search(input: { key: $key, type: Article, first: 4 }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Article {
            ...ArticleDigestTitleArticle
          }
        }
      }
    }
  }
  ${ArticleDigestTitle.fragments.article}
`

const AggregateArticleResults = () => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  const { data, loading } = useQuery<SeachAggregateArticles>(
    SEARCH_AGGREGATE_ARTICLES,
    { variables: { key: q } }
  )

  if (loading) {
    return <Spinner />
  }

  const { edges, pageInfo } = data?.search || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  return (
    <section className="aggregate-section">
      <List>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'Article' && (
              <List.Item key={cursor}>
                <Card
                  spacing={['base', 'base']}
                  {...toPath({
                    page: 'articleDetail',
                    article: node,
                  })}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search',
                      contentType: 'article',
                      styleType: 'title',
                      location: i,
                    })
                  }
                >
                  <ArticleDigestTitle
                    article={node}
                    is="h3"
                    textWeight="normal"
                    textSize="md"
                  />
                </Card>
              </List.Item>
            )
        )}
      </List>

      <ViewMoreButton q={q} type="article" />

      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateArticleResults
