import gql from 'graphql-tag'

import { Icon } from '~/components'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'
import { UserDigest } from '~/components/UserDigest'

import { stripHtml } from '~/common/utils'

import DropdownActions from '../DropdownActions'
import FooterActions from '../FooterActions'
import ArticleDigestTitle from '../Title'
import styles from './styles.css'

import { FeedDigestArticle } from './__generated__/FeedDigestArticle'

interface FeedDigestProps {
  article: FeedDigestArticle

  hasSticky?: boolean

  inTagDetail?: boolean
}

const fragments = {
  article: gql`
    fragment FeedDigestArticle on Article {
      id
      articleState: state
      cover
      summary
      live
      author {
        id
        ...UserDigestMiniUser
      }
      ...TitleArticle
      ...FooterActionsArticle
      ...DropdownActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
    ${FooterActions.fragments.article}
    ${DropdownActions.fragments.article}
  `
}

const FeedDigest = ({
  article,

  hasSticky,

  inTagDetail = false
}: FeedDigestProps) => {
  const { author, summary, live, sticky } = article
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)

  return (
    <article>
      {hasSticky && sticky && (
        <section className="sticky">
          <TextIcon icon={<Icon.Sticky />} size="sm" color="grey" weight="md">
            <Translate zh_hant="置頂作品" zh_hans="置顶作品" />
          </TextIcon>
        </section>
      )}

      <header>
        <section className="left">
          <UserDigest.Mini
            user={author}
            avatarSize="sm"
            hasAvatar
            hasDisplayName
          />
        </section>

        <section className="right">
          {live && <Icon.Live />}
          <DropdownActions article={article} inTagDetail={inTagDetail} />
        </section>
      </header>

      <section className="title">
        <ArticleDigestTitle article={article} />
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

      <FooterActions article={article} />

      <style jsx>{styles}</style>
    </article>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
