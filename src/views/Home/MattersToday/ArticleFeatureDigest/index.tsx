import gql from 'graphql-tag'

import { ArticleDigest, Card, Label } from '~/components'
import FooterActions from '~/components/ArticleDigest/FooterActions'

import { toPath } from '~/common/utils'
import IMAGE_COVER_FALLBACK from '~/static/images/cover-fallback.jpg?url'

import styles from './styles.css'

import { TodayDigestArticle } from './__generated__/TodayDigestArticle'

interface ArticleFeatureDigestProps {
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

    ${ArticleDigest.Title.fragments.article}
    ${FooterActions.fragments.article}
  `
}

const ArticleFeatureDigest = ({
  article,

  onClick
}: ArticleFeatureDigestProps) => {
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

            <ArticleDigest.Title
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

ArticleFeatureDigest.fragments = fragments

export default ArticleFeatureDigest
