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

import FooterActions from '../FooterActions'
import styles from './styles.css'

import { RelatedDigestArticle } from './__generated__/RelatedDigestArticle'

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
      ...FooterActionsArticle
    }
    ${FooterActions.fragments.article}
  `
}

const RelatedDigest = ({ article }: { article: RelatedDigestArticle }) => {
  const { summary, state, live } = article
  const path = toPath({
    page: 'articleDetail',
    article,
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
  const contentClasses = classNames({
    content: true,
    'has-cover': !!cover
  })

  const LinkWrapper: React.FC = ({ children }) =>
    isBanned ? (
      <span>{children}</span>
    ) : (
      <Link {...path}>
        <a>{children}</a>
      </Link>
    )

  return (
    <section className="container">
      {cover && (
        <LinkWrapper>
          <div className="cover" style={{ backgroundImage: `url(${cover})` }} />
        </LinkWrapper>
      )}

      <div className={contentClasses}>
        <div className="title">
          <LinkWrapper>
            <Title type="sidebar" is="h3">
              {title}
            </Title>
          </LinkWrapper>
        </div>

        {!cover && (
          <div className="summary">
            <LinkWrapper>{cleanedSummary}</LinkWrapper>
          </div>
        )}

        <div className="actions">
          <FooterActions article={article} />
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

RelatedDigest.fragments = fragments

export default RelatedDigest
