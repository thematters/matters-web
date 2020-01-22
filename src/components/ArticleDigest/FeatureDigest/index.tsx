import gql from 'graphql-tag'

import { Card, Label } from '~/components'

import { toPath } from '~/common/utils'
import IMAGE_COVER_FALLBACK from '~/static/images/cover-fallback.jpg?url'

import FooterActions from '../FooterActions'
import ArticleTitleDigest from '../TitleDigest'
import styles from './styles.css'

import { TodayDigestArticle } from './__generated__/TodayDigestArticle'

interface FeatureDigestProps {
  article: TodayDigestArticle

  onClick?: () => any
}

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
      ...TitleDigestArticle
      ...FooterActionsArticle
    }

    ${ArticleTitleDigest.fragments.article}
    ${FooterActions.fragments.article}
  `
}

const FeatureDigest = ({
  article,

  onClick
}: FeatureDigestProps) => {
  const { cover, summary } = article
  const path = toPath({
    page: 'articleDetail',
    article
  })

  return (
    <Card {...path}>
      <section className="container" onClick={onClick}>
        <div className="cover-container">
          <div
            className="cover"
            style={{
              backgroundImage: `url(${cover || IMAGE_COVER_FALLBACK})`
            }}
          />
        </div>

        <div className="content-container">
          <div className="content">
            <Label>Matters Today</Label>

            <ArticleTitleDigest
              article={article}
              textSize="xl"
              textWeight="semibold"
              is="h2"
            />

            <div className="description">
              <p>{summary}</p>

              <FooterActions article={article} />
            </div>
          </div>
        </div>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

FeatureDigest.fragments = fragments

export default FeatureDigest
