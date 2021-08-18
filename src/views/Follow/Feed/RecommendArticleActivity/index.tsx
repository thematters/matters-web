import { CardExposureTracker, Slides } from '~/components'

import FollowingRecommendArticle from '../FollowingRecommendArticle'
import FollowingRecommendHead from '../FollowingRecommendHead'
import { fragments } from './gql'
import styles from './styles.css'

import { ArticleRecommendationActivitySource } from '@/__generated__/globalTypes'
import { RecommendArticleActivity_recommendArticles } from './__generated__/RecommendArticleActivity'

interface Props {
  articles: RecommendArticleActivity_recommendArticles[] | null
  source: ArticleRecommendationActivitySource | null
  location: number
}

const RecommendArticleActivity = ({ articles, source, location }: Props) => {
  if (!articles || articles.length <= 0 || !source) {
    return null
  }

  const type = source === 'UserDonation' ? 'article' : 'recommend'

  return (
    <Slides
      bgColor="grey-lighter"
      header={<FollowingRecommendHead type={type} />}
    >
      {articles.map((article, index) => (
        <Slides.Item size="md" key={index}>
          <section className="item">
            <FollowingRecommendArticle article={article} />
            <CardExposureTracker
              location={`${location}.${index}`}
              feedType="following"
              contentType="RecommendArticleActivity"
              articleId={article.id}
            />
          </section>
        </Slides.Item>
      ))}

      <style jsx>{styles}</style>
    </Slides>
  )
}

RecommendArticleActivity.fragments = fragments

export default RecommendArticleActivity
