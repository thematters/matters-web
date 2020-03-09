import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  ArticleDigestCard,
  ArticleDigestSidebar,
  Title,
  Translate
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import styles from './styles.css'

import { RelatedArticles as RelatedArticlesType } from './__generated__/RelatedArticles'

interface RelatedArticlesProps {
  article: RelatedArticlesType
  inSidebar?: boolean
}

const fragments = {
  article: gql`
    fragment RelatedArticles on Article {
      id
      relatedArticles(input: { first: 3 }) {
        edges {
          cursor
          node {
            ...ArticleDigestSidebarArticle
            ...ArticleDigestCardArticle
          }
        }
      }
    }
    ${ArticleDigestSidebar.fragments.article}
    ${ArticleDigestCard.fragments.article}
  `
}

const RelatedArticles = ({ article, inSidebar }: RelatedArticlesProps) => {
  const edges = article.relatedArticles.edges

  if (!edges || edges.length <= 0) {
    return null
  }

  const relatedArticlesClass = classNames({
    'related-articles': true,
    inSidebar
  })

  return (
    <section className={relatedArticlesClass}>
      <Title type="nav" is="h2">
        <Translate zh_hant="推薦閱讀" zh_hans="推荐阅读" />
      </Title>

      <ul>
        {edges.map(({ node, cursor }, i) => {
          const onClick = () =>
            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
              type: FEED_TYPE.RELATED_ARTICLE,
              location: i,
              entrance: article.id
            })

          return (
            <li key={cursor}>
              {inSidebar ? (
                <ArticleDigestSidebar
                  article={node}
                  titleTextSize="sm"
                  hasCover
                  onClick={onClick}
                />
              ) : (
                <ArticleDigestCard article={node} onClick={onClick} />
              )}
            </li>
          )
        })}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

RelatedArticles.fragments = fragments

export default RelatedArticles
