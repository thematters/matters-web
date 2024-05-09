import gql from 'graphql-tag'

import {
  ArticleDigestAuthorSidebar,
  ArticleDigestSidebar,
  List,
} from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

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
            ...ArticleDigestSidebarArticle
          }
        }
      }
    }
    ${ArticleDigestSidebar.fragments.article}
  `,
}

export const RelatedArticles = ({ article }: RelatedArticlesProps) => {
  const edges = article.relatedArticles.edges

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
            />
          </List.Item>
        ))}
      </List>
    </section>
  )
}

RelatedArticles.fragments = fragments
