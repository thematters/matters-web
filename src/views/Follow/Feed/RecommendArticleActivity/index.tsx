import { useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { ArticleRecommendationActivitySource } from '@/__generated__/globalTypes'
import { analytics } from '~/common/utils'
import { CardExposureTracker, Slides } from '~/components'

import FollowingRecommendArticle from '../FollowingRecommendArticle'
import FollowingRecommendHead from '../FollowingRecommendHead'
import { RecommendArticleActivity_recommendArticles } from './__generated__/RecommendArticleActivity'
import { fragments } from './gql'
import styles from './styles.css'

interface Props {
  articles: RecommendArticleActivity_recommendArticles[] | null
  source: ArticleRecommendationActivitySource | null
  location: number
}

const RecommendArticleActivity = ({ articles, source, location }: Props) => {
  // only mount horizontal scroll tracker when container is in view
  const [mountTracker, setMountTracker] = useState(false)

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
    <>
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
              })
            }}
          >
            <section className="item">
              <FollowingRecommendArticle article={article} />
              {mountTracker && (
                <CardExposureTracker
                  horizontal={true}
                  location={`${location}.${index}`}
                  feedType="following"
                  contentType={contentType}
                  id={article.id}
                />
              )}
            </section>
          </Slides.Item>
        ))}
        <style jsx>{styles}</style>
      </Slides>
      <Waypoint onEnter={() => setMountTracker(true)} />
    </>
  )
}

RecommendArticleActivity.fragments = fragments

export default RecommendArticleActivity
