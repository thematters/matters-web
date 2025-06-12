import gql from 'graphql-tag'

import { analytics } from '~/common/utils'
import { List, usePublicQuery } from '~/components'
import {
  ArticleDetailPublicQuery,
  AuthorSidebarRelatedArticlesQuery,
} from '~/gql/graphql'

import { ArticleDigestAuthorSidebar } from '../ArticleDigestAuthorSidebar'
import { FeedPlaceholder } from '../Placeholder'

type RelatedArticlesProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

const fragments = {
  article: gql`
    fragment AuthorSidebarRelatedArticles on Article {
      id
      relatedArticles(input: { first: 3 }) {
        totalCount
        edges {
          cursor
          node {
            ...ArticleDigestAuthorSidebarArticle
          }
        }
      }
    }
    ${ArticleDigestAuthorSidebar.fragments.article}
  `,
}

const RELATED_ARTICLES = gql`
  query AuthorSidebarRelatedArticles($shortHash: String) {
    article(input: { shortHash: $shortHash }) {
      id
      ...AuthorSidebarRelatedArticles
    }
  }
  ${fragments.article}
`

export const RelatedArticles = ({ article }: RelatedArticlesProps) => {
  const { data, loading } = usePublicQuery<AuthorSidebarRelatedArticlesQuery>(
    RELATED_ARTICLES,
    {
      variables: { shortHash: article.shortHash },
    }
  )

  const edges = data?.article?.relatedArticles.edges

  if (loading) {
    return <FeedPlaceholder />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section>
      <List borderPosition="bottom" hasLastBorder={false}>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <ArticleDigestAuthorSidebar
              article={node}
              titleColor="black"
              titleTextSize={14}
              imageSize="md"
              showAuthorInfo
              clickEvent={() => {
                analytics.trackEvent('click_feed', {
                  type: 'article_detail_author_sidebar_recommendation',
                  contentType: 'article',
                  location: i,
                  id: node.id,
                })
              }}
            />
          </List.Item>
        ))}
      </List>
    </section>
  )
}

RelatedArticles.fragments = fragments
