import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Title } from '~/components'

import { UrlFragments } from '~/common/enums'
import { toPath } from '~/common/utils'

import Actions, { ActionsControls } from '../Actions'
import { SidebarDigestArticle } from './__generated__/SidebarDigestArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment SidebarDigestArticle on Article {
      id
      title
      slug
      live
      cover @include(if: $hasArticleDigestCover)
      author {
        id
        userName
      }
      mediaHash
      ...DigestActionsArticle
    }
    ${Actions.fragments.article}
  `
}

const FeedDigest = ({
  article,
  hasCover,
  ...actionControls
}: {
  article: SidebarDigestArticle
  hasCover?: boolean
} & ActionsControls) => {
  const { author, slug, mediaHash, title, live } = article
  const cover = 'cover' in article ? article.cover : null

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
  const contentClasses = classNames({
    content: true,
    'no-cover': !cover
  })

  return (
    <section className="container">
      <div className={contentClasses}>
        <div className="left">
          <Link {...path}>
            <a>
              <Title type="sidebar" is="h2">
                {title}
              </Title>
            </a>
          </Link>
          <Actions article={article} type="sidebar" {...actionControls} />
        </div>

        {hasCover && cover && (
          <Link {...path}>
            <a>
              <div
                className="cover"
                style={{
                  backgroundImage: `url(${cover})`
                }}
              />
            </a>
          </Link>
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
