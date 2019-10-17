import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Title } from '~/components'

import { UrlFragments } from '~/common/enums'
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
  const { cover, author, slug, summary, mediaHash, title, live } = article

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

  const cleanedTitle = makeTitle(title, 70)
  const cleanedSummary = makeSummary(
    summary,
    countWordsLength(title) > 40 ? 60 : 80
  )

  const contentClasses = classNames({
    content: true,
    'has-cover': !!cover
  })

  return (
    <section className="container">
      {cover && (
        <Link {...path}>
          <a>
            <div
              className="cover"
              style={{ backgroundImage: `url(${cover})` }}
            />
          </a>
        </Link>
      )}

      <div className={contentClasses}>
        <div className="title">
          <Link {...path}>
            <a>
              <Title type="sidebar" is="h3">
                {cleanedTitle}
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
