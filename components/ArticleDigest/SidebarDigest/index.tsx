import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Title } from '~/components'

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
  const { author, slug, mediaHash, title } = article
  const cover = 'cover' in article ? article.cover : null

  if (!author || !author.userName || !slug || !mediaHash) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash
  })
  const contentClasses = classNames({
    content: true,
    'no-cover': !cover
  })

  return (
    <section className="container">
      <Link {...path}>
        <div className={contentClasses}>
          <div className="left">
            <a>
              <Title type="sidebar" is="h2">
                {title}
              </Title>
            </a>
            <Actions article={article} type="sidebar" {...actionControls} />
          </div>

          {hasCover && cover && (
            <a>
              <div
                className="cover"
                style={{
                  backgroundImage: `url(${cover})`
                }}
              />
            </a>
          )}
        </div>
      </Link>

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
