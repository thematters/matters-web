import gql from 'graphql-tag'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { ArticleDigestTitle } from '~/components/ArticleDigest'
import { ArticleState, NoticeArticleTitleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const NoticeArticleTitle = ({
  article,
  isBlock = false,
  disabled = false,
}: {
  article: NoticeArticleTitleFragment | null
  isBlock?: boolean
  disabled?: boolean
}) => {
  if (!article) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    article,
  })

  const isArchived = article.articleState === ArticleState.Archived

  const title = isArchived ? (
    <FormattedMessage
      defaultMessage="Archived Work"
      id="z91BKe"
      description="src/components/Notice/NoticeArticleTitle.tsx"
    />
  ) : (
    article.title
  )

  if (!isBlock) {
    if (disabled) {
      return (
        <span
          className={styles.noticeArticleTitle}
          data-test-id={TEST_ID.NOTICE_ARTICLE_TITLE}
        >
          {title}
        </span>
      )
    }

    return (
      <Link
        {...path}
        className={styles.noticeArticleTitle}
        data-test-id={TEST_ID.NOTICE_ARTICLE_TITLE}
      >
        {title}
      </Link>
    )
  }

  return (
    <ArticleDigestTitle
      article={article}
      textSize={16}
      lineClamp={3}
      disabled={disabled}
    />
  )
}

NoticeArticleTitle.fragments = {
  article: gql`
    fragment NoticeArticleTitle on Article {
      id
      ...ArticleDigestTitleArticle
    }
    ${ArticleDigestTitle.fragments.article}
  `,
}

export default NoticeArticleTitle
