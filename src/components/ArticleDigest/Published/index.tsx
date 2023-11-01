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
    <section className={styles.wrapper}>
      <header>
        <DateTime date={article.createdAt} color="grey" />
      </header>
      <section className={styles.content}>
        <ArticleDigestTitle article={article} textSize="md" lineClamp={1} />
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
