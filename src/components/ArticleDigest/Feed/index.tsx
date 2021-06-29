import React from 'react'

import { Card, Img } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { stripHtml, toPath } from '~/common/utils'

import { ArticleDigestTitle } from '../Title'
import FollowButton from './FollowButton'
import FooterActions, { FooterActionsControls } from './FooterActions'
import { fragments } from './gql'
import styles from './styles.css'

import { ArticleDigestFeedArticlePrivate } from './__generated__/ArticleDigestFeedArticlePrivate'
import { ArticleDigestFeedArticlePublic } from './__generated__/ArticleDigestFeedArticlePublic'

export type ArticleDigestFeedControls = {
  onClick?: () => any
  onClickAuthor?: () => void
} & FooterActionsControls

export type ArticleDigestFeedProps = {
  article: ArticleDigestFeedArticlePublic &
    Partial<ArticleDigestFeedArticlePrivate>
} & ArticleDigestFeedControls

const BaseArticleDigestFeed = ({
  article,

  onClick,
  onClickAuthor,

  ...controls
}: ArticleDigestFeedProps) => {
  const { author, summary } = article
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card {...path} spacing={['base', 'base']} onClick={onClick}>
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

            <FollowButton user={article.author} />
          </section>
        </section>

        <p className="description">{cleanedSummary}</p>

        {cover && (
          <div className="cover">
            <Img url={cover} size="144w" smUpSize="360w" />
          </div>
        )}
      </section>

      <FooterActions article={article} inCard {...controls} />

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
  ({ article: prevArticle }, { article }) => {
    return (
      prevArticle.subscribed === article.subscribed &&
      prevArticle.articleState === article.articleState &&
      prevArticle.sticky === article.sticky &&
      prevArticle.author.isFollowee === article.author.isFollowee
    )
  }
) as MemoizedArticleDigestFeed

ArticleDigestFeed.fragments = fragments
