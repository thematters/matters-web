import classNames from 'classnames'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { TEST_ID } from '~/common/enums'
import { stripHtml, toPath, UtmParams } from '~/common/utils'
import {
  Card,
  CardProps,
  DateTime,
  IconDotDivider,
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

  hasFollow,
  hasHeader = true,
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
  const titleRef: React.RefObject<any> = useRef(null)

  const [height, setHeight] = useState(0)
  const [titleLine, setTitleLine] = useState(2)

  useLayoutEffect(() => {
    if (titleRef && titleRef.current) {
      setHeight(titleRef.current.clientHeight)
    }
  }, [])

  useEffect(() => {
    if (height === 24) {
      setTitleLine(1)
    }
  }, [height])

  const { author, summary } = article
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)

  const summaryClasses = classNames({
    [styles.description]: true,
    [styles.lineClamp2]: titleLine === 1,
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
      date={date}
      {...controls}
    />
  )

  return (
    <Card
      {...path}
      spacing={['baseLoose', 0]}
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_FEED}
      bgActiveColor="none"
      is={is}
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
              />
            </section>
          </section>

          <p className={summaryClasses}>{cleanedSummary}</p>

          <Media greaterThan="sm">{footerActions}</Media>
        </section>
        {cover && (
          <div className={styles.cover}>
            <ResponsiveImage url={cover} size="144w" />
          </div>
        )}
      </section>
      <Media at="sm">{footerActions}</Media>
    </Card>
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
      prevArticle.author.isFollowee === article.author.isFollowee &&
      prevProps.hasSetTagSelected === props.hasSetTagSelected &&
      prevProps.hasSetTagUnselected === props.hasSetTagUnselected &&
      prevProps.hasRemoveTag === props.hasRemoveTag
    )
  }
) as MemoizedArticleDigestFeed

ArticleDigestFeed.Placeholder = Placeholder
ArticleDigestFeed.fragments = fragments
