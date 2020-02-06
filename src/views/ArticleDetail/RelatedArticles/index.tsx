import gql from 'graphql-tag'

import { CardDigest, Title, Translate } from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import styles from './styles.css'

import { RelatedArticles as RelatedArticlesType } from './__generated__/RelatedArticles'

const fragments = {
  article: gql`
    fragment RelatedArticles on Article {
      id
      relatedArticles(input: { first: 3 }) {
        edges {
          cursor
          node {
            ...CardDigestArticle
          }
        }
      }
    }
    ${CardDigest.fragments.article}
  `
}

const RelatedArticles = ({ article }: { article: RelatedArticlesType }) => {
  const edges = article.relatedArticles.edges

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section className="related-articles">
      <Title type="nav" is="h2">
        <Translate zh_hant="推薦閱讀" zh_hans="推荐阅读" />
      </Title>

      <ul>
        {edges.map(({ node, cursor }, i) => (
          <li key={cursor}>
            <CardDigest
              article={node}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.RELATED_ARTICLE,
                  location: i,
                  entrance: article.id
                })
              }
            />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

RelatedArticles.fragments = fragments

export default RelatedArticles
