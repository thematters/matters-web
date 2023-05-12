import classNames from 'classnames'
import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { LinkWrapper } from '~/components'
import { ArticleDigestNoticeArticleFragment } from '~/gql/graphql'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import styles from './styles.css'

export type ArticleDigestNoticeProps = {
  article: ArticleDigestNoticeArticleFragment
  titleTextSize?: ArticleDigestTitleTextSize
  onClick?: () => any
}

const fragments = {
  article: gql`
    fragment ArticleDigestNoticeArticle on Article {
      id
      title
      slug
      mediaHash
      summary
      content
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
  const { summary, content } = article
  const hasSummary = summary !== ''

  const containerClasses = classNames({
    container: true,
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
        <header>
          <ArticleDigestTitle
            article={article}
            textSize={titleTextSize}
            is="h3"
            lineClamp={1}
          />
        </header>
        <section className="content">
          {hasSummary && summary}
          {!hasSummary && content}
        </section>

        <style jsx>{styles}</style>
      </section>
    </LinkWrapper>
  )
}

ArticleDigestNotice.fragments = fragments
