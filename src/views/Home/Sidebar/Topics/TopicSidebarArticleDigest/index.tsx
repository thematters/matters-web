import gql from 'graphql-tag'

import { ArticleDigestTitle, Card } from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import styles from './styles.css'

import { TopicSidebarArticleDigestArticle } from './__generated__/TopicSidebarArticleDigestArticle'

const fragments = {
  article: gql`
    fragment TopicSidebarArticleDigestArticle on Article {
      id
      topicScore
      ...ArticleDigestTitleArticle
    }

    ${ArticleDigestTitle.fragments.article}
  `
}
const TopicSidebarArticleDigest = ({
  article
}: {
  article: TopicSidebarArticleDigestArticle
}) => {
  const path = toPath({ page: 'articleDetail', article })

  return (
    <Card {...path} spacing={['xtight', 0]} bgColor="none">
      <section className="container">
        <ArticleDigestTitle
          article={article}
          textSize="sm"
          is="h3"
          textWeight="md"
        />

        {article.topicScore && (
          <span className="score">{numAbbr(article.topicScore)}</span>
        )}
      </section>

      <style jsx>{styles}</style>
    </Card>
  )
}

TopicSidebarArticleDigest.fragments = fragments

export default TopicSidebarArticleDigest
