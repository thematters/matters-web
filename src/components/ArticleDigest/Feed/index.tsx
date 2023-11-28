import classNames from 'classnames'
import React, { useRef, useState } from 'react'

import { TEST_ID } from '~/common/enums'
import { stripHtml, toPath, UtmParams } from '~/common/utils'
import {
  DateTime,
  IconDotDivider,
  LinkWrapper,
  Media,
  ResponsiveImage,
  useIsomorphicLayoutEffect,
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
} & ArticleDigestFeedControls &
  FooterActionsProps &
  UtmParams

const BaseArticleDigestFeed = ({
  article,
  header,

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
  const titleRef: React.RefObject<any> = useRef(null)

  const [titleLine, setTitleLine] = useState(2)

  useIsomorphicLayoutEffect(() => {
    if (titleRef && titleRef.current) {
      if (titleRef.current.clientHeight === 24) {
        setTitleLine(1)
      }
    }
  }, [])

  const { author, summary } = article
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)

  const summaryClasses = classNames({
    [styles.description]: true,
    [styles.lineClamp2]: titleLine === 1,
    [styles.minHeight]: !!cover && titleLine === 1,
  })

  const path = toPath({
    page: 'articleDetail',
    article,
    utm_source,
    utm_medium,
  })

  const footerActions = (
    <FooterActions
      article={article}
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
                <IconDotDivider color="greyLight" size="mdS" />
              </section>
            </>
          )}
          <DateTime date={article.createdAt} color="grey" />
        </header>
      )}
      <section className={styles.container}>
        <section className={styles.content}>
          <section className={styles.head}>
            <section className={styles.title} ref={titleRef}>
              <ArticleDigestTitle
                article={article}
                textSize="md"
                lineClamp={2}
                onClick={onClick}
              />
            </section>
          </section>

          <LinkWrapper {...path} onClick={onClick}>
            <p className={summaryClasses}>{cleanedSummary}</p>
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
