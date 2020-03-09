import gql from 'graphql-tag'

import { Card, Icon, TextIcon, Translate } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { stripHtml, toPath } from '~/common/utils'

import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import { ArticleDigestTitle } from '../Title'
import CreatedAt from './CreatedAt'
import InactiveState from './InactiveState'
import Live from './Live'
import styles from './styles.css'

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
  `
}

export const ArticleDigestFeed = ({
  article,

  inTagDetailLatest,
  inTagDetailSelected,
  inUserArticles,
  inFollowFeed,

  onClick
}: ArticleDigestFeedProps) => {
  const { author, summary, sticky } = article
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)
  const path = toPath({
    page: 'articleDetail',
    article
  })

  return (
    <Card
      {...path}
      spacing={['base', 'base']}
      bgActiveColor="green-lighter"
      onClick={onClick}
    >
      <header>
        <section className="left">
          <UserDigest.Mini
            user={author}
            avatarSize="sm"
            hasAvatar
            hasDisplayName
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
          <InactiveState article={article} />
          <CreatedAt article={article} />
        </section>
      </header>

      <section className="title">
        <ArticleDigestTitle article={article} textSize="xm" />
      </section>

      {cover && (
        <section
          className="cover"
          style={{
            backgroundImage: `url(${cover})`
          }}
        />
      )}

      <p className="description">{cleanedSummary}</p>

      <FooterActions
        article={article}
        inCard
        inTagDetailLatest={inTagDetailLatest}
        inTagDetailSelected={inTagDetailSelected}
        inUserArticles={inUserArticles}
      />

      <style jsx>{styles}</style>
    </Card>
  )
}

ArticleDigestFeed.fragments = fragments
