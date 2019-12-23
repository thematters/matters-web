import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Title, Translate } from '~/components'

import { TEXT, UrlFragments } from '~/common/enums'
import {
  countWordsLength,
  makeSummary,
  makeTitle,
  toPath
} from '~/common/utils'

import Actions, { ActionsControls } from '../Actions'
import { RelatedDigestArticle } from './__generated__/RelatedDigestArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment RelatedDigestArticle on Article {
      id
      title
      state
      slug
      cover
      summary
      mediaHash
      live
      author {
        id
        userName
        displayName
      }
      subscribed
      ...DigestActionsArticle
    }
    ${Actions.fragments.article}
  `
}

const RelatedDigest = ({
  article,
  ...actionControls
}: {
  article: RelatedDigestArticle
} & ActionsControls) => {
  const { author, slug, summary, mediaHash, live, state } = article
  if (!author || !author.userName || !slug || !mediaHash) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash,
    fragment: live ? UrlFragments.COMMENTS : ''
  })

  const isBanned = state === 'banned'
  const cover = !isBanned ? article.cover : null
  const title = isBanned ? (
    <Translate
      zh_hant={TEXT.zh_hant.articleBanned}
      zh_hans={TEXT.zh_hans.articleBanned}
    />
  ) : (
    makeTitle(article.title, 70)
  )
  const cleanedSummary = isBanned
    ? ''
    : makeSummary(summary, countWordsLength(article.title) > 40 ? 60 : 80)
  const LinkWrapper: React.FC = ({ children }) =>
    isBanned ? (
      <span>{children}</span>
    ) : (
      <Link {...path}>
        <a>{children}</a>
      </Link>
    )

  const contentClasses = classNames({
    content: true,
    'has-cover': !!cover
  })

  return (
    <section className="container">
      {cover && (
        <LinkWrapper>
          <div className="cover" style={{ backgroundImage: `url(${cover})` }} />
        </LinkWrapper>
      )}

      <div className={contentClasses}>
        <div className="title">
          <Link {...path}>
            <a>
              <Title type="sidebar" is="h3">
                {title}
              </Title>
            </a>
          </Link>
        </div>

        {!cover && (
          <div className="summary">
            <Link {...path}>
              <a>{cleanedSummary}</a>
            </Link>
          </div>
        )}

        <div className="actions">
          <Actions article={article} type="related" {...actionControls} />
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

RelatedDigest.fragments = fragments

export default RelatedDigest
