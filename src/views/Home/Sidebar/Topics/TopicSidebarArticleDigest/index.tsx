import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Card, TitleDigest } from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import styles from './styles.css'

import { TopicSidebarArticleDigestArticle } from './__generated__/TopicSidebarArticleDigestArticle'

const fragments = {
  article: gql`
    fragment TopicSidebarArticleDigestArticle on Article {
      id
      topicScore
      ...TitleDigestArticle
    }

    ${TitleDigest.fragments.article}
  `
}
const TopicSidebarArticleDigest = ({
  article
}: {
  article: TopicSidebarArticleDigestArticle
}) => {
  const path = toPath({ page: 'articleDetail', article })

  return (
    <Card {...path} spacing={['xtight', 0]}>
      <section className="container">
        <TitleDigest article={article} textSize="sm" is="h3" />

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
