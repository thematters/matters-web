import classNames from 'classnames'
import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card } from '~/components'
import { ArticleDigestNoticeArticleFragment } from '~/gql/graphql'

import {
  ArticleDigestTitle,
  ArticleDigestTitleTextSize,
  isArticleAuthorFrozen,
} from '../Title'
import styles from './styles.module.css'

export type ArticleDigestNoticeProps = {
  article: ArticleDigestNoticeArticleFragment
  titleTextSize?: ArticleDigestTitleTextSize
}

const fragments = {
  article: gql`
    fragment ArticleDigestNoticeArticle on Article {
      id
      summary
      ...ArticleDigestTitleArticle
    }
    ${ArticleDigestTitle.fragments.article}
  `,
}

export const ArticleDigestNotice = ({
  article,
  titleTextSize = 16,
}: ArticleDigestNoticeProps) => {
  const { summary } = article
  const isAuthorFrozen = isArticleAuthorFrozen(article)

  const containerClasses = classNames({
    [styles.container]: true,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card
      href={isAuthorFrozen ? undefined : path.href}
      spacing={[0, 0]}
      bgColor="none"
    >
      <section
        className={containerClasses}
        data-test-id={TEST_ID.DIGEST_ARTICLE_NOTICE}
      >
        <header className={styles.header}>
          <ArticleDigestTitle
            article={article}
            textSize={titleTextSize}
            is="h3"
            lineClamp={1}
            disabled={isAuthorFrozen}
          />
        </header>

        <section className={styles.content}>{summary}</section>
      </section>
    </Card>
  )
}

ArticleDigestNotice.fragments = fragments
