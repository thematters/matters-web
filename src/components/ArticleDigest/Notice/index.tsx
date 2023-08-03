import classNames from 'classnames'
import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { LinkWrapper } from '~/components'
import { ArticleDigestNoticeArticleFragment } from '~/gql/graphql'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import styles from './styles.module.css'

export type ArticleDigestNoticeProps = {
  article: ArticleDigestNoticeArticleFragment
  titleTextSize?: ArticleDigestTitleTextSize
  onClick?: () => any
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

  titleTextSize = 'md',
  onClick,

  ...cardProps
}: ArticleDigestNoticeProps) => {
  const { summary } = article

  const containerClasses = classNames({
    [styles.container]: true,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <LinkWrapper {...path}>
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
          />
        </header>

        <section className={styles.content}>{summary}</section>
      </section>
    </LinkWrapper>
  )
}

ArticleDigestNotice.fragments = fragments
