import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  ArticleDigestCard,
  ArticleDigestSidebar,
  PageHeader,
  Slides,
  Translate,
} from '~/components'

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
      relatedArticles(input: { first: 5 }) {
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
  `,
}

const RelatedArticles = ({ article, inSidebar }: RelatedArticlesProps) => {
  const edges = article.relatedArticles.edges

  if (!edges || edges.length <= 0) {
    return null
  }

  const relatedArticlesClasses = classNames({
    relatedArticles: true,
    inSidebar,
  })

  const onClick = (i: number, id: string) => () =>
    analytics.trackEvent('click_feed', {
      type: 'related_article',
      contentType: 'article',
      location: i,
      id,
    })

  const onClickAuthor = (i: number, id: string) => () => {
    analytics.trackEvent('click_feed', {
      type: 'related_article',
      contentType: 'user',
      location: i,
      id,
    })
  }

  const Header = (
    <PageHeader
      title={
        <Translate zh_hant="推薦閱讀" zh_hans="推荐阅读" en="Recommendations" />
      }
      is="h2"
      hasNoBorder
    />
  )

  if (!inSidebar) {
    return (
      <section className={relatedArticlesClasses}>
        <Slides header={Header} bgColor="green-lighter">
          {edges.map(({ node, cursor }, i) => (
            <Slides.Item key={cursor}>
              <ArticleDigestCard
                article={node}
                onClick={onClick(i, node.id)}
                onClickAuthor={onClickAuthor(i, node.author.id)}
              />
            </Slides.Item>
          ))}
        </Slides>
        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className={relatedArticlesClasses}>
      {Header}

      <ul>
        {edges.map(({ node, cursor }, i) => (
          <li key={cursor}>
            <ArticleDigestSidebar
              article={node}
              titleTextSize="sm"
              hasCover
              onClick={onClick(i, node.id)}
              onClickAuthor={onClickAuthor(i, node.author.id)}
              bgActiveColor="grey-lighter"
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
