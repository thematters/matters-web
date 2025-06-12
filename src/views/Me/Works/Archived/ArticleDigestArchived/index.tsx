import React from 'react'

import { TEST_ID } from '~/common/enums'
import { ArticleDigestTitle, DateTime } from '~/components'
import { ArticleDigestTitleArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type ArticleDigestArchivedProps = {
  article: ArticleDigestTitleArticleFragment & { createdAt: string }
}

export const ArticleDigestArchived = ({
  article,
}: ArticleDigestArchivedProps) => {
  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.DIGEST_ARTICLE_ARCHIVED}
    >
      <header>
        <DateTime date={article.createdAt} color="grey" />
      </header>
      <section className={styles.left}>
        <ArticleDigestTitle
          article={article}
          textWeight="normal"
          lineClamp={1}
        />
      </section>
    </section>
  )
}
