import gql from 'graphql-tag'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

import { Label, Title } from '~/components'

import { toPath } from '~/common/utils'
import IMAGE_COVER_FALLBACK from '~/static/images/cover-fallback.jpg?url'

import Actions, { ActionsControls } from '../Actions'
import styles from './styles.css'

import { TodayDigestArticle } from './__generated__/TodayDigestArticle'

const fragments = {
  article: gql`
    fragment TodayDigestArticle on Article {
      id
      title
      slug
      cover
      summary
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

const FeatureDigest = ({
  article,
  onClick,
  ...actionControls
}: {
  article: TodayDigestArticle
  onClick?: MouseEventHandler
} & ActionsControls) => {
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

  return (
    <section className="container" onClick={onClick}>
      <div className="cover-container">
        <Link {...path}>
          <a>
            <div
              className="cover"
              style={{
                backgroundImage: `url(${cover || IMAGE_COVER_FALLBACK})`
              }}
            />
          </a>
        </Link>
      </div>

      <div className="content-container">
        <div className="content">
          <Label>Matters Today</Label>

          <Link {...path}>
            <a>
              <Title type="feature" is="h2">
                {title}
              </Title>
            </a>
          </Link>

          <div className="description">
            <Link {...path}>
              <a>
                <p>{summary}</p>
              </a>
            </Link>

            <Actions article={article} type="feature" {...actionControls} />
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

FeatureDigest.fragments = fragments

export default FeatureDigest
