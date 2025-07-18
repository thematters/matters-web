import Link from 'next/link'
import React from 'react'

import IconDot from '@/public/static/icons/dot.svg'
import { MAX_FEED_SUMMARY_LENGTH, TEST_ID } from '~/common/enums'
import { makeSummary, toPath } from '~/common/utils'
import { DateTime, Icon, Media, ResponsiveImage } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import {
  ArticleDigestFeedArticlePrivateFragment,
  ArticleDigestFeedArticlePublicFragment,
} from '~/gql/graphql'

import { ArticleDigestTitle } from '../Title'
import FooterActions, { FooterActionsProps } from './FooterActions'
import { fragments } from './gql'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

export type ArticleDigestFeedControls = {
  onClick?: () => void
  onClickAuthor?: () => void
  hasHeader?: boolean
  hasCircle?: boolean
  hasAuthor?: boolean
  isFirstFold?: boolean
  disabledArchived?: boolean
}

export type ArticleDigestFeedProps = {
  article: ArticleDigestFeedArticlePublicFragment &
    Partial<ArticleDigestFeedArticlePrivateFragment>
  collectionId?: string
  excludesTimeStamp?: boolean // this is only for timestamp next to the profile
} & ArticleDigestFeedControls &
  FooterActionsProps

const BaseArticleDigestFeed = ({
  article,
  collectionId,
  hasHeader = true,
  hasCircle = true,
  hasAuthor = true,
  onClick,
  onClickAuthor,

  isFirstFold = false,
  disabledArchived = false,

  hasReadTime,
  hasDonationCount,
  includesMetaData,
  excludesTimeStamp,
  ...controls
}: ArticleDigestFeedProps) => {
  const { author, summary } = article
  const isBanned = article.articleState === 'banned'
  const isArchived = article.articleState === 'archived'
  const cover = !isBanned && !isArchived ? article.displayCover : null
  const cleanedSummary =
    isBanned && !isArchived ? '' : makeSummary(summary, MAX_FEED_SUMMARY_LENGTH)

  const path = toPath({
    page: 'articleDetail',
    article,
    collectionId,
  })

  const footerActions = (
    <FooterActions
      article={article}
      collectionId={collectionId}
      hasReadTime={hasReadTime}
      hasDonationCount={hasDonationCount}
      hasCircle={hasCircle}
      inCard
      includesMetaData={includesMetaData}
      {...controls}
    />
  )

  return (
    <section
      className={styles.wrapper}
      data-test-id={TEST_ID.DIGEST_ARTICLE_FEED}
    >
      {hasHeader && (
        <header className={styles.header}>
          {hasAuthor && (
            <section className={styles.author}>
              <UserDigest.Mini
                user={author}
                avatarSize={20}
                textSize={12}
                nameColor={
                  author.status?.state === 'archived' ? 'grey' : undefined
                }
                spacing={6}
                hasAvatar
                hasDisplayName
                onClick={onClickAuthor}
              />
              {!excludesTimeStamp && (
                <Icon icon={IconDot} color="greyLight" size={20} />
              )}
            </section>
          )}
          {!excludesTimeStamp && (
            <Link {...path}>
              <DateTime date={article.createdAt} color="grey" minimal />
            </Link>
          )}
        </header>
      )}
      <section className={styles.container}>
        <section className={styles.content}>
          <section className={styles.head}>
            <section className={styles.title}>
              <ArticleDigestTitle
                article={article}
                collectionId={collectionId}
                textSize={16}
                lineClamp={2}
                onClick={onClick}
                disabledArchived={disabledArchived}
              />
            </section>
          </section>

          {!(isArchived && disabledArchived) && (
            <Link {...path} onClick={onClick}>
              <p className={styles.description}>{cleanedSummary}</p>
            </Link>
          )}

          <Media greaterThanOrEqual="md">{footerActions}</Media>
        </section>
        {cover && (
          <Link {...path} onClick={onClick}>
            <div
              className={styles.cover}
              data-test-id={TEST_ID.DIGEST_ARTICLE_FEED_COVER}
            >
              <ResponsiveImage
                url={cover}
                width={152}
                height={152}
                smUpWidth={212}
                smUpHeight={212}
                loading={isFirstFold ? undefined : 'lazy'}
                fetchPriority={isFirstFold ? 'high' : 'low'}
              />
            </div>
          </Link>
        )}
      </section>
      <Media lessThan="md">{footerActions}</Media>
    </section>
  )
}

/**
 * Memoizing
 */
type MemoizedArticleDigestFeed = React.MemoExoticComponent<
  React.FC<ArticleDigestFeedProps>
> & {
  Placeholder: typeof Placeholder
  fragments: typeof fragments
}

export const ArticleDigestFeed = React.memo(
  BaseArticleDigestFeed,
  ({ article: prevArticle }, { article }) => {
    return (
      prevArticle.bookmarked === article.bookmarked &&
      prevArticle.articleState === article.articleState &&
      prevArticle.pinned === article.pinned
    )
  }
) as MemoizedArticleDigestFeed

ArticleDigestFeed.Placeholder = Placeholder
ArticleDigestFeed.fragments = fragments
