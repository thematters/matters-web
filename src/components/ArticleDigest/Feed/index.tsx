import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'
import React from 'react'

import { Card, Icon, TextIcon, Translate } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { UserDigest } from '~/components/UserDigest'

import { stripHtml, toPath } from '~/common/utils'

import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import { ArticleDigestTitle } from '../Title'
import CreatedAt from './CreatedAt'
import InactiveState from './InactiveState'
import Live from './Live'
import styles from './styles.css'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { ArticleDigestFeedArticle } from './__generated__/ArticleDigestFeedArticle'

export type ArticleDigestFeedControls = {
  onClick?: () => any

  inFollowFeed?: boolean
} & FooterActionsControls

type ArticleDigestFeedProps = {
  article: ArticleDigestFeedArticle
} & ArticleDigestFeedControls

const fragments = {
  article: gql`
    fragment ArticleDigestFeedArticle on Article {
      id
      title
      slug
      mediaHash
      articleState: state
      cover
      summary
      live
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      ...CreatedAtArticle
      ...LiveArticle
      ...InactiveStateArticle
      ...ArticleDigestTitleArticle
      ...FooterActionsArticle
      ...DropdownActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${CreatedAt.fragments.article}
    ${Live.fragments.article}
    ${InactiveState.fragments.article}
    ${ArticleDigestTitle.fragments.article}
    ${FooterActions.fragments.article}
    ${DropdownActions.fragments.article}
  `,
}

const BaseArticleDigestFeed = ({
  article,

  inTagDetailLatest,
  inTagDetailSelected,
  inUserArticles,
  inFollowFeed,

  onClick,
}: ArticleDigestFeedProps) => {
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const { viewMode } = data?.clientPreference || { viewMode: 'comfortable' }
  const isCompactMode = viewMode === 'compact'

  const { author, summary, sticky } = article
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)
  const path = toPath({
    page: 'articleDetail',
    article,
  })
  const containerClass = classNames({
    [`mode-${viewMode}`]: !!viewMode,
  })

  let userDigestProps = {}
  if (isCompactMode) {
    userDigestProps = {
      avatarSize: 'sm',
      textSize: 'sm',
    }
  } else {
    userDigestProps = {
      avatarSize: 'lg',
      textSize: 'md-s',
      textWeight: 'md',
    }
  }

  return (
    <Card {...path} spacing={['base', 'base']} onClick={onClick}>
      <section className={containerClass}>
        <header>
          <section className="left">
            <UserDigest.Mini
              user={author}
              hasAvatar
              hasDisplayName
              {...userDigestProps}
            />
            {inFollowFeed && (
              <span className="published-article">
                <Translate zh_hant="發佈了作品" zh_hans="发布了作品" />
              </span>
            )}
          </section>

          <section className="right">
            {inUserArticles && sticky && (
              <TextIcon
                icon={<Icon.PinMedium />}
                size="sm"
                color="grey"
                weight="md"
              >
                <Translate id="stickyArticle" />
              </TextIcon>
            )}

            <Live article={article} />
            {inUserArticles && <InactiveState article={article} />}
            <CreatedAt article={article} />
          </section>
        </header>

        <section className="title">
          <ArticleDigestTitle
            article={article}
            textSize={isCompactMode ? 'md' : 'xm'}
          />
        </section>

        {!isCompactMode && (
          <section className="content">
            {cover && (
              <div className="cover">
                <img src={cover} loading="lazy" />
              </div>
            )}
            {<p className="description">{cleanedSummary}</p>}
          </section>
        )}

        <FooterActions
          article={article}
          inCard
          inTagDetailLatest={inTagDetailLatest}
          inTagDetailSelected={inTagDetailSelected}
          inUserArticles={inUserArticles}
        />

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoedArticleDigestFeed = React.MemoExoticComponent<
  React.FC<ArticleDigestFeedProps>
> & {
  fragments: typeof fragments
}

export const ArticleDigestFeed = React.memo(
  BaseArticleDigestFeed,
  ({ article: prevArticle }, { article }) => {
    return (
      prevArticle.subscribed === article.subscribed &&
      prevArticle.responseCount === article.responseCount &&
      prevArticle.articleState === article.articleState &&
      prevArticle.sticky === article.sticky &&
      prevArticle.appreciationsReceivedTotal ===
        article.appreciationsReceivedTotal
    )
  }
) as MemoedArticleDigestFeed

ArticleDigestFeed.fragments = fragments
