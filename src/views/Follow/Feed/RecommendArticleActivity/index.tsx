import { useContext } from 'react'

import { CardExposureTracker, Slides, ViewerContext } from '~/components'

import { analytics } from '~/common/utils'

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
  const viewer = useContext(ViewerContext)

  if (!articles || articles.length <= 0 || !source) {
    return null
  }

  // from followee donation or from tag recommendation
  const type = source === 'UserDonation' ? 'article' : 'recommend'
  const contentType =
    source === 'UserDonation'
      ? 'UserDonateArticleActivity'
      : 'ArticleRecommendationActivity'

  return (
    <Slides
      bgColor="grey-lighter"
      header={<FollowingRecommendHead type={type} />}
    >
      {articles.map((article, index) => (
        <Slides.Item
          size="md"
          key={index}
          onClick={() => {
            analytics.trackEvent('click_feed', {
              type: 'following',
              contentType,
              location: `${location}.${index}`,
              id: article.id,
              userId: viewer.id,
            })
          }}
        >
          <section className="item">
            <FollowingRecommendArticle article={article} />
            <CardExposureTracker
              location={`${location}.${index}`}
              feedType="following"
              contentType={contentType}
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
