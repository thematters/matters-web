import React from 'react'

import { stripHtml, toPath, UtmParams } from '~/common/utils'
import { Card, ResponsiveImage } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import {
  ArticleDigestConciseArticlePrivateFragment,
  ArticleDigestConciseArticlePublicFragment,
} from '~/gql/graphql'

import { ArticleDigestTitle } from '../Title'
import FooterActions, { FooterActionsProps } from './FooterActions'
import { fragments } from './gql'
import styles from './styles.module.css'

export type ArticleDigestConciseControls = {
  onClick?: () => any
  onClickAuthor?: () => void
  hasFollow?: boolean
  hasCircle?: boolean
}

export type ArticleDigestConciseProps = {
  article: ArticleDigestConciseArticlePublicFragment &
    Partial<ArticleDigestConciseArticlePrivateFragment>
  footerTag?: React.ReactNode
  footerCircle?: React.ReactNode
} & ArticleDigestConciseControls &
  FooterActionsProps &
  UtmParams

const BaseArticleDigestFeed = ({
  article,
  footerTag,
  footerCircle,
  date,

  hasFollow,
  hasCircle = true,
  onClick,
  onClickAuthor,

  utm_source,
  utm_medium,

  ...controls
}: ArticleDigestConciseProps) => {
  const { author, summary } = article
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)
  const path = toPath({
    page: 'articleDetail',
    article,
    utm_source,
    utm_medium,
  })

  return (
    <Card
      {...path}
      spacing={['base', 0]}
      bgActiveColor="none"
      onClick={onClick}
    >
      <section className={styles.content}>
        <section className={styles.head}>
          <section className={styles.title}>
            <ArticleDigestTitle article={article} textSize="xm" />
          </section>

          <section className={styles.author}>
            <UserDigest.Mini
              user={author}
              avatarSize="sm"
              textSize="sm"
              hasAvatar
              hasDisplayName
              onClick={onClickAuthor}
            />
          </section>
        </section>

        <p className={styles.description}>{cleanedSummary}</p>

        {cover && (
          <div className={styles.cover}>
            <ResponsiveImage url={cover} size="144w" smUpSize="360w" />
          </div>
        )}
      </section>

      <FooterActions
        article={article}
        inCard
        date={date}
        tag={footerTag}
        circle={footerCircle}
        {...controls}
      />
    </Card>
  )
}

/**
 * Memoizing
 */
type ArticleDigestConcise = React.MemoExoticComponent<
  React.FC<ArticleDigestConciseProps>
> & {
  fragments: typeof fragments
}

export const ArticleDigestConcise = React.memo(
  BaseArticleDigestFeed
) as ArticleDigestConcise

ArticleDigestConcise.fragments = fragments
