import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { Label, Title } from '~/components'

import Actions from '../Actions'
import { TodayDigestArticle } from './__generated__/TodayDigestArticle'
import styles from './styles.css'

interface FeatureDigestProps {
  article: TodayDigestArticle
}

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
        userName
      }
      ...FeedDigestActionsArticle
    }
    ${Actions.fragments.feedDigest}
  `
}

const FeatureDigest: React.SFC<FeatureDigestProps> & {
  fragments: typeof fragments
} = ({ article }) => {
  const { cover, author, slug, mediaHash, title, summary } = article
  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash
  })

  return (
    <section className="container">
      <div className="cover-container">
        <Link href={path.fs} as={path.url}>
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

          <Title type="feature" is="h2">
            <Link href={path.fs} as={path.url}>
              <a>{title}</a>
            </Link>
          </Title>

          <div className="description">
            <Link href={path.fs} as={path.url}>
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
