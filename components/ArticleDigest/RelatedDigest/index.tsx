import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Title } from '~/components/Title'

import { toPath } from '~/common/utils'

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
      mediaHash
      author {
        id
        userName
      }
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
  const { cover, author, slug, mediaHash, title } = article

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
        <a>
          <div className={contentClasses}>
            <div className="left">
              <Title type="sidebar" is="h3">
                {title}
              </Title>
              <Actions article={article} type="sidebar" {...actionControls} />
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

RelatedDigest.fragments = fragments

export default RelatedDigest
