import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { Title } from '~/components'

import Actions from '../Actions'
import { IcymiDigestArticle } from './__generated__/IcymiDigestArticle'
import { TopicsDigestArticle } from './__generated__/TopicsDigestArticle'
import styles from './styles.css'

const fragments = {
  icymi: gql`
    fragment IcymiDigestArticle on Article {
      id
      title
      slug
      cover
      author {
        id
        userName
      }
      mediaHash
      ...SidebarDigestActionsArticle
    }
    ${Actions.fragments.sidebarDigest}
  `,
  topics: gql`
    fragment TopicsDigestArticle on Article {
      id
      title
      slug
      author {
        id
        userName
      }
      mediaHash
      ...SidebarDigestActionsArticle
    }
    ${Actions.fragments.sidebarDigest}
  `
}

const FeedDigest = ({
  article
}: {
  article: IcymiDigestArticle | TopicsDigestArticle
}) => {
  const { cover, author, slug, mediaHash, title } = article
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
        <a>
          <div className={contentClasses}>
            <div className="left">
              <Title type="sidebar" is="h2">
                {title}
              </Title>
              <Actions article={article} type="sidebar" />
            </div>

            {cover && (
              <div
                className="cover"
                style={{
                  backgroundImage: `url(${cover})`
                }}
              />
            )}
          </div>
        </a>
      </Link>

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
