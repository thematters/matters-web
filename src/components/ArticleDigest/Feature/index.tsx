import gql from 'graphql-tag'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

import { Label, Title } from '~/components'

import { toPath } from '~/common/utils'
import IMAGE_COVER_FALLBACK from '~/static/images/cover-fallback.jpg?url'

import FooterActions from '../FooterActions'
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
      ...FooterActionsArticle
    }
    ${FooterActions.fragments.article}
  `
}

const FeatureDigest = ({
  article,
  onClick
}: {
  article: TodayDigestArticle
  onClick?: MouseEventHandler
}) => {
  const { cover, title, summary } = article
  const path = toPath({
    page: 'articleDetail',
    article
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

            <FooterActions article={article} />
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

FeatureDigest.fragments = fragments

export default FeatureDigest
