import classNames from 'classnames'
import gql from 'graphql-tag'

import { analytics } from '~/common/utils'
import {
  ArticleDigestCard,
  ArticleDigestSidebar,
  PageHeader,
  Slides,
  Translate,
} from '~/components'
import { RelatedArticlesFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface RelatedArticlesProps {
  article: RelatedArticlesFragment
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
    [styles.relatedArticles]: true,
    [styles.inSidebar]: inSidebar,
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
      hasBorder={false}
    />
  )

  if (!inSidebar) {
    return (
      <section className={relatedArticlesClasses}>
        <Slides header={Header}>
          {edges.map(({ node, cursor }, i) => (
            <Slides.Item key={node.id}>
              <ArticleDigestCard
                article={node}
                onClick={onClick(i, node.id)}
                onClickAuthor={onClickAuthor(i, node.author.id)}
              />
            </Slides.Item>
          ))}
        </Slides>
      </section>
    )
  }

  return (
    <section className={relatedArticlesClasses}>
      {Header}

      <ul>
        {edges.map(({ node, cursor }, i) => (
          <li key={node.id}>
            <ArticleDigestSidebar
              article={node}
              titleTextSize="sm"
              onClick={onClick(i, node.id)}
              onClickAuthor={onClickAuthor(i, node.author.id)}
              bgActiveColor="greyLighter"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

RelatedArticles.fragments = fragments

export default RelatedArticles
