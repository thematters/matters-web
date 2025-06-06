import { TEST_ID } from '~/common/enums'
import { ArticleDigestTitle } from '~/components'
import { DateTime } from '~/components/DateTime'
import {
  ArticleDigestPublishedArticlePrivateFragment,
  ArticleDigestPublishedArticlePublicFragment,
} from '~/gql/graphql'

import FooterActions, { FooterActionsProps } from './FooterActions'
import { fragments } from './gql'
import styles from './styles.module.css'

export type ArticleDigestPublishedProps = {
  article: ArticleDigestPublishedArticlePublicFragment &
    Partial<ArticleDigestPublishedArticlePrivateFragment>
} & FooterActionsProps

export const ArticleDigestPublished = ({
  article,
}: ArticleDigestPublishedProps) => {
  return (
    <section
      className={styles.wrapper}
      data-test-id={TEST_ID.DIGEST_ARTICLE_PUBLISHED}
    >
      <header>
        <DateTime date={article.createdAt} color="grey" />
      </header>
      <section className={styles.content}>
        <ArticleDigestTitle
          article={article}
          textSize={16}
          lineClamp={1}
          textWeight="normal"
        />
      </section>
      <FooterActions
        article={article}
        hasEdit
        hasAddCollection
        hasBookmark
        hasArchive
      />
    </section>
  )
}

ArticleDigestPublished.fragments = fragments
