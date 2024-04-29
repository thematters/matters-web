import React from 'react'

import { ReactComponent as IconDot } from '@/public/static/icons/dot.svg'
import { TEST_ID } from '~/common/enums'
import { stripHtml, toPath, UtmParams } from '~/common/utils'
import {
  DateTime,
  Icon,
  LinkWrapper,
  Media,
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
import Placeholder from './Placeholder'
import styles from './styles.module.css'

export type ArticleDigestFeedControls = {
  onClick?: () => any
  onClickAuthor?: () => void
  hasHeader?: boolean
  hasCircle?: boolean
  hasAuthor?: boolean
  isFirstFold?: boolean
}

export type ArticleDigestFeedProps = {
  article: ArticleDigestFeedArticlePublicFragment &
    Partial<ArticleDigestFeedArticlePrivateFragment>
  header?: React.ReactNode
  collectionId?: string
} & ArticleDigestFeedControls &
  FooterActionsProps &
  UtmParams

const BaseArticleDigestFeed = ({
  article,
  header,
  collectionId,

  hasHeader = true,
  hasCircle = true,
  hasAuthor = true,
  onClick,
  onClickAuthor,

  isFirstFold = false,

  utm_source,
  utm_medium,

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
    collectionId,
    utm_source,
    utm_medium,
  })

  const footerActions = (
    <FooterActions
      article={article}
      collectionId={collectionId}
      hasReadTime={hasReadTime}
      hasDonationCount={hasDonationCount}
      hasCircle={hasCircle}
      inCard
      {...controls}
    />
  )

  return (
    <section
      className={styles.wrapper}
      data-test-id={TEST_ID.DIGEST_ARTICLE_FEED}
    >
      <section className={styles.container}>
        <section className={styles.content}>
          {hasHeader && (
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
                    <Icon icon={IconDot} color="greyLight" size="mdS" />
                  </section>
                </>
              )}
              <DateTime date={article.createdAt} color="grey" />
            </header>
          )}
          <section className={styles.head}>
            <section className={styles.title}>
              <ArticleDigestTitle
                article={article}
                collectionId={collectionId}
                textSize="md"
                lineClamp={2}
                onClick={onClick}
              />
            </section>
          </section>

          <LinkWrapper {...path} onClick={onClick}>
            <p className={styles.description}>{cleanedSummary}</p>
          </LinkWrapper>

          <Media greaterThan="sm">{footerActions}</Media>
        </section>
        {cover && (
          <LinkWrapper {...path} onClick={onClick}>
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
                disableAnimation={true}
                loading={isFirstFold ? undefined : 'lazy'}
                fetchPriority={isFirstFold ? 'high' : 'low'}
              />
            </div>
          </LinkWrapper>
        )}
      </section>
      <Media at="sm">{footerActions}</Media>
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
  ({ article: prevArticle, ...prevProps }, { article, ...props }) => {
    return (
      prevArticle.subscribed === article.subscribed &&
      prevArticle.articleState === article.articleState &&
      prevArticle.pinned === article.pinned &&
      prevProps.hasSetTagSelected === props.hasSetTagSelected &&
      prevProps.hasSetTagUnselected === props.hasSetTagUnselected &&
      prevProps.hasRemoveTag === props.hasRemoveTag
    )
  }
) as MemoizedArticleDigestFeed

ArticleDigestFeed.Placeholder = Placeholder
ArticleDigestFeed.fragments = fragments
