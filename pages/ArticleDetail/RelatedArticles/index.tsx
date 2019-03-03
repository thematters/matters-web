import gql from 'graphql-tag'
import _get from 'lodash/get'

import { ArticleDigest } from '~/components/ArticleDigest'
import { Translate } from '~/components/Language'
import { Title } from '~/components/Title'

import { RelatedArticles as RelatedArticlesType } from './__generated__/RelatedArticles'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment RelatedArticles on Article {
      relatedArticles(input: { first: 3 }) {
        edges {
          cursor
          node {
            ...RelatedDigestArticle
          }
        }
      }
    }
    ${ArticleDigest.Related.fragments.article}
  `
}

const RelatedArticles = ({ article }: { article: RelatedArticlesType }) => {
  const edges = _get(article, 'relatedArticles.edges')
  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section className="related-articles">
      <Title type="page" is="h2">
        <Translate zh_hant="推薦閱讀" zh_hans="推荐阅读" />
      </Title>
      <ul>
        {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
          <li key={cursor}>
            <ArticleDigest.Related article={node} />
          </li>
        ))}
      </ul>
      <style jsx>{styles}</style>
    </section>
  )
}

RelatedArticles.fragments = fragments

export default RelatedArticles
