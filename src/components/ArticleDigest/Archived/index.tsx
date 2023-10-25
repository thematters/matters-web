import React from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath, UtmParams } from '~/common/utils'
import { Card } from '~/components'
import { ArticleDigestTitleArticleFragment } from '~/gql/graphql'

import { ArticleDigestTitle } from '../Title'
import styles from './styles.module.css'

export type ArticleDigestArchivedProps = {
  article: ArticleDigestTitleArticleFragment
} & UtmParams

export const ArticleDigestArchived = ({
  article,
  utm_source,
  utm_medium,
}: ArticleDigestArchivedProps) => {
  const path = toPath({
    page: 'articleDetail',
    article,
    utm_source,
    utm_medium,
  })

  return (
    <Card {...path} spacing={['base', 0]} bgActiveColor="none">
      <section className={styles.container}>
        <section className={styles.left}>
          <ArticleDigestTitle
            article={article}
            textSize="sm"
            textWeight="normal"
            lineClamp={1}
          />
        </section>
        <section className={styles.right}>
          <FormattedMessage
            defaultMessage="Archived"
            id="RNKSCj"
            description="src/components/ArticleDigest/Archive/index.tsx"
          />
        </section>
      </section>
    </Card>
  )
}
