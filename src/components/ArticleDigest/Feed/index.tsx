import React from 'react'

import { TEST_ID } from '~/common/enums'
import { stripHtml, toPath, UtmParams } from '~/common/utils'
import {
  Card,
  CardProps,
  DateTime,
  IconDotDivider,
  ResponsiveImage,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import {
  ArticleDigestFeedArticlePrivateFragment,
  ArticleDigestFeedArticlePublicFragment,
} from '~/gql/graphql'

import { ArticleDigestTitle } from '../Title'
import FooterActions, { FooterActionsProps } from './FooterActions'
import { fragments } from './gql'
import styles from './styles.module.css'

export type ArticleDigestFeedControls = {
  onClick?: () => any
  onClickAuthor?: () => void
  isConciseFooter?: boolean
  hasFollow?: boolean
  hasCircle?: boolean
  hasAuthor?: boolean
}

export type ArticleDigestFeedProps = {
  article: ArticleDigestFeedArticlePublicFragment &
    Partial<ArticleDigestFeedArticlePrivateFragment>
  header?: React.ReactNode
} & ArticleDigestFeedControls &
  FooterActionsProps &
  UtmParams &
  Pick<CardProps, 'is'>

const BaseArticleDigestFeed = ({
  article,
  header,
  date,

  isConciseFooter = false,
  hasFollow,
  hasCircle = true,
  hasAuthor = true,
  onClick,
  onClickAuthor,

  utm_source,
  utm_medium,
  is,

  hasReadTime,
  hasDonationCount,
  ...controls
}: ArticleDigestFeedProps) => {
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
      spacing={['baseLoose', 0]}
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_FEED}
      bgActiveColor="none"
      is={is}
    >
      <header className={styles.header}>
        {hasAuthor && (
          <>
            <section className={styles.author}>
              <UserDigest.Mini
                user={author}
                avatarSize="sm"
                textSize="xs"
                hasAvatar
                hasDisplayName
                onClick={onClickAuthor}
              />
              <IconDotDivider color="greyLight" size="mdS" />
            </section>
          </>
        )}
        <DateTime date={article.createdAt} color="grey" />
      </header>
      <section className={styles.content}>
        <section className={styles.head}>
          <section className={styles.title}>
            <ArticleDigestTitle article={article} textSize="xm" />
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
        hasReadTime={hasReadTime}
        hasDonationCount={hasDonationCount}
        hasCircle={hasCircle}
        inCard
        date={date}
        {...controls}
      />
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoizedArticleDigestFeed = React.MemoExoticComponent<
  React.FC<ArticleDigestFeedProps>
> & {
  fragments: typeof fragments
}

export const ArticleDigestFeed = React.memo(
  BaseArticleDigestFeed,
  ({ article: prevArticle, ...prevProps }, { article, ...props }) => {
    return (
      prevArticle.subscribed === article.subscribed &&
      prevArticle.articleState === article.articleState &&
      prevArticle.sticky === article.sticky &&
      prevArticle.author.isFollowee === article.author.isFollowee &&
      prevProps.hasSetTagSelected === props.hasSetTagSelected &&
      prevProps.hasSetTagUnselected === props.hasSetTagUnselected &&
      prevProps.hasRemoveTag === props.hasRemoveTag
    )
  }
) as MemoizedArticleDigestFeed

ArticleDigestFeed.fragments = fragments
