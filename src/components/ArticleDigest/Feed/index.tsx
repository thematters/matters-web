import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'
import React from 'react'

import { Card, IconPinMedium, Img, TextIcon, Translate } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { UserDigest } from '~/components/UserDigest'

import { stripHtml, toPath } from '~/common/utils'

import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import { ArticleDigestTitle } from '../Title'
import CreatedAt from './CreatedAt'
import InactiveState from './InactiveState'
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
  article: {
    public: gql`
      fragment ArticleDigestFeedArticlePublic on Article {
        id
        title
        slug
        mediaHash
        articleState: state
        cover
        summary
        author {
          id
          userName
          ...UserDigestMiniUser
        }
        ...CreatedAtArticle
        ...InactiveStateArticle
        ...ArticleDigestTitleArticle
        ...DropdownActionsArticle
        ...FooterActionsArticlePublic
        ...FooterActionsArticlePrivate
      }
      ${UserDigest.Mini.fragments.user}
      ${CreatedAt.fragments.article}
      ${InactiveState.fragments.article}
      ${ArticleDigestTitle.fragments.article}
      ${DropdownActions.fragments.article}
      ${FooterActions.fragments.article.public}
      ${FooterActions.fragments.article.private}
    `,
    private: gql`
      fragment ArticleDigestFeedArticlePrivate on Article {
        id
        ...FooterActionsArticlePrivate
      }
      ${FooterActions.fragments.article.private}
    `,
  },
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
  const isDefaultMode = viewMode === 'default'

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
                icon={<IconPinMedium />}
                size="sm"
                color="grey"
                weight="md"
              >
                <Translate id="stickyArticle" />
              </TextIcon>
            )}

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
                <Img
                  url={cover}
                  size={isDefaultMode ? '540w' : '144w'}
                  smUpSize={isDefaultMode ? '1080w' : '360w'}
                />
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
      prevArticle.responseCount === article.responseCount &&
      prevArticle.articleState === article.articleState &&
      prevArticle.sticky === article.sticky &&
      prevArticle.appreciationsReceivedTotal ===
        article.appreciationsReceivedTotal
    )
  }
) as MemoizedArticleDigestFeed

ArticleDigestFeed.fragments = fragments
