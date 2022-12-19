import React from 'react'

import { Card, CircleDigest, DateTime, ResponsiveImage } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { TEST_ID } from '~/common/enums'
import { stripHtml, toPath, UtmParams } from '~/common/utils'

import { ArticleDigestTitle } from '../Title'
import FollowButton from './FollowButton'
import FooterActions, { FooterActionsProps } from './FooterActions'
import { fragments } from './gql'
import styles from './styles.css'

import { ArticleDigestFeedArticlePrivate } from './__generated__/ArticleDigestFeedArticlePrivate'
import { ArticleDigestFeedArticlePublic } from './__generated__/ArticleDigestFeedArticlePublic'

export type ArticleDigestFeedControls = {
  onClick?: () => any
  onClickAuthor?: () => void
  isConciseFooter?: boolean
  hasFollow?: boolean
  hasCircle?: boolean
}

export type ArticleDigestFeedProps = {
  article: ArticleDigestFeedArticlePublic &
    Partial<ArticleDigestFeedArticlePrivate>
  header?: React.ReactNode
} & ArticleDigestFeedControls &
  FooterActionsProps &
  UtmParams

const BaseArticleDigestFeed = ({
  article,
  header,
  date,

  isConciseFooter = false,
  hasFollow,
  hasCircle = true,
  onClick,
  onClickAuthor,

  utm_source,
  utm_medium,

  ...controls
}: ArticleDigestFeedProps) => {
  const {
    author,
    summary,
    access: { circle },
  } = article
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
      spacing={['base', 'base']}
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_FEED}
    >
      {header ||
        (hasCircle && circle && (
          <header>
            <CircleDigest.Plain circle={circle} />
          </header>
        ))}

      <section className="content">
        <section className="head">
          <section className="title">
            <ArticleDigestTitle article={article} textSize="xm" />
          </section>

          <section className="author">
            <UserDigest.Mini
              user={author}
              avatarSize="sm"
              textSize="sm"
              hasAvatar
              hasDisplayName
              onClick={onClickAuthor}
            />

            {hasFollow && <FollowButton user={article.author} />}
          </section>
        </section>

        <p className="description">{cleanedSummary}</p>

        {cover && (
          <div className="cover">
            <ResponsiveImage url={cover} size="144w" smUpSize="360w" />
          </div>
        )}
      </section>

      {isConciseFooter && (
        <section>
          <DateTime date={article.createdAt} />
        </section>
      )}
      {!isConciseFooter && (
        <FooterActions article={article} inCard date={date} {...controls} />
      )}

      <style jsx>{styles}</style>
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
