import gql from 'graphql-tag'
import Link from 'next/link'

import { Label, Title } from '~/components'

import { toPath } from '~/common/utils'

import Actions from '../Actions'
import { TodayDigestArticle } from './__generated__/TodayDigestArticle'
import styles from './styles.css'

const fragments = {
  today: gql`
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
      ...FeatureDigestActionsArticle
    }
    ${Actions.fragments.featureDigest}
  `
}

const FeatureDigest = ({ article }: { article: TodayDigestArticle }) => {
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
    <section className="container">
      <div className="cover-container">
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

            <Actions article={article} type="feature" />
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

FeatureDigest.fragments = fragments

export default FeatureDigest
