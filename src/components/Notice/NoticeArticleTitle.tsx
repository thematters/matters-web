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
}: {
  article: NoticeArticleTitleFragment | null
  isBlock?: boolean
}) => {
  if (!article) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    article,
  })

  const isArchived = article.articleState === ArticleState.Archived

  if (!isBlock) {
    return (
      <Link {...path}>
        <a
          className={styles.noticeArticleTitle}
          data-test-id={TEST_ID.NOTICE_ARTICLE_TITLE}
        >
          {isArchived ? (
            <FormattedMessage
              defaultMessage="Archived Work"
              id="z91BKe"
              description="src/components/Notice/NoticeArticleTitle.tsx"
            />
          ) : (
            article.title
          )}
        </a>
      </Link>
    )
  }

  return <ArticleDigestTitle article={article} textSize={16} lineClamp={3} />
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
