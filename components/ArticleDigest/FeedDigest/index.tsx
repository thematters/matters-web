import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Title } from '~/components/Title'
import { UserDigest } from '~/components/UserDigest'

import { toPath } from '~/common/utils'

import Actions, { ActionsControls } from '../Actions'
import { FeedDigestArticle } from './__generated__/FeedDigestArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment FeedDigestArticle on Article {
      id
      title
      slug
      cover
      summary
      mediaHash
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      ...DigestActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${Actions.fragments.article}
  `
}

const FeedDigest = ({
  article,
  ...actionControls
}: { article: FeedDigestArticle } & ActionsControls) => {
  const { cover, author, slug, mediaHash, title, summary } = article

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
      <div className="header">
        <UserDigest.Mini user={author} />
      </div>

      <div className={contentClasses}>
        <div className="title">
          <Link {...path}>
            <a>
              <Title type="feed" is="h2">
                {title}
              </Title>
            </a>
          </Link>
        </div>
        <div className="description">
          <Link {...path}>
            <a>
              <p>{summary}</p>
            </a>
          </Link>

          <Actions article={article} type="feed" {...actionControls} />
        </div>

        {cover && (
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
