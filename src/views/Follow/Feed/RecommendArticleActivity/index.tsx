import { useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { analytics } from '~/common/utils'
import { CardExposureTracker, Slides } from '~/components'
import {
  ArticleRecommendationActivitySource,
  RecommendArticleActivityFragment,
} from '~/gql/graphql'

import FollowingRecommendArticle from '../FollowingRecommendArticle'
import FollowingRecommendHead from '../FollowingRecommendHead'
import { fragments } from './gql'
import styles from './styles.module.css'

interface Props {
  articles: RecommendArticleActivityFragment['recommendArticles'] | null
  source?: ArticleRecommendationActivitySource | null
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
    <section className={styles.container}>
      <Slides header={<FollowingRecommendHead type={type} />}>
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
            <section className={styles.item}>
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
      </Slides>
      <Waypoint onEnter={() => setMountTracker(true)} />
    </section>
  )
}

RecommendArticleActivity.fragments = fragments

export default RecommendArticleActivity
