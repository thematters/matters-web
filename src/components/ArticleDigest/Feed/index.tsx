import React from 'react'

import { Card, IconPin24, Img, TextIcon, Translate } from '~/components'
import { CircleDigest } from '~/components/CircleDigest'
import { UserDigest } from '~/components/UserDigest'
import { UserDigestMiniProps } from '~/components/UserDigest/Mini'

import { stripHtml, toPath } from '~/common/utils'

import FooterActions, { FooterActionsControls } from '../FooterActions'
import { ArticleDigestTitle } from '../Title'
import AccessLabel from './AccessLabel'
import CreatedAt from './CreatedAt'
import { fragments } from './gql'
import InactiveState from './InactiveState'
import styles from './styles.css'

import { ArticleDigestFeedArticlePrivate } from './__generated__/ArticleDigestFeedArticlePrivate'
import { ArticleDigestFeedArticlePublic } from './__generated__/ArticleDigestFeedArticlePublic'

type ExtraHeaderControls = {
  extraHeader?: React.ReactNode
  hasCircle?: boolean
}

export type ArticleDigestFeedControls = {
  onClick?: () => any
  onClickAuthor?: () => void
  onClickCircle?: () => void
} & ExtraHeaderControls &
  FooterActionsControls

export type ArticleDigestFeedProps = {
  article: ArticleDigestFeedArticlePublic &
    Partial<ArticleDigestFeedArticlePrivate>

  actor?: (props: Partial<UserDigestMiniProps>) => React.ReactNode
} & ArticleDigestFeedControls

const BaseArticleDigestFeed = ({
  article,

  actor,

  hasCircle = true,
  extraHeader,

  onClick,
  onClickAuthor,
  onClickCircle,

  ...controls
}: ArticleDigestFeedProps) => {
  const {
    author,
    summary,
    sticky,
    access: { circle },
  } = article
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card {...path} spacing={['base', 'base']} onClick={onClick}>
      <section>
        {extraHeader ||
          (hasCircle && circle && (
            <section className="extraHeader">
              <CircleDigest.Plain circle={circle} onClick={onClickCircle} />

              <AccessLabel article={article} />
            </section>
          ))}

        <header>
          <section className="left">
            {actor ? (
              actor({
                avatarSize: 'sm',
                textSize: 'sm',
              })
            ) : (
              <UserDigest.Mini
                user={author}
                avatarSize="sm"
                textSize="sm"
                hasAvatar
                hasDisplayName
                onClick={onClickAuthor}
              />
            )}
          </section>

          <section className="right">
            {!hasCircle && <AccessLabel article={article} />}

            {controls.inUserArticles && sticky && (
              <TextIcon icon={<IconPin24 />} size="sm" color="grey" weight="md">
                <Translate id="stickyArticle" />
              </TextIcon>
            )}

            {controls.inUserArticles && <InactiveState article={article} />}
            <CreatedAt article={article} />
          </section>
        </header>

        <section className="title">
          <ArticleDigestTitle article={article} textSize="xm" />
        </section>

        <section className="content">
          {cover && (
            <div className="cover">
              <Img url={cover} size="144w" smUpSize="360w" />
            </div>
          )}
          {<p className="description">{cleanedSummary}</p>}
        </section>

        <FooterActions article={article} inCard {...controls} />

        <style jsx>{styles}</style>
      </section>
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
      prevArticle.appreciationsReceivedTotal ===
        article.appreciationsReceivedTotal
    )
  }
) as MemoizedArticleDigestFeed

ArticleDigestFeed.fragments = fragments
