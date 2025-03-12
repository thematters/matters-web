import { useEffect, useState } from 'react'

import { analytics } from '~/common/utils'
import {
  CardExposureTracker,
  Media,
  Slides,
  useIntersectionObserver,
} from '~/components'
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

  const { isIntersecting, ref } = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting) {
      setMountTracker(true)
    }
  })

  if (!articles || articles.length <= 0 || !source) {
    return null
  }

  // from followee donation or from tag recommendation
  const type = source === 'UserDonation' ? 'article' : 'recommend'
  const contentType =
    source === 'UserDonation'
      ? 'UserDonateArticleActivity'
      : 'ArticleRecommendationActivity'
  const renderSlideItem = (
    article: NonNullable<
      RecommendArticleActivityFragment['recommendArticles']
    >[number],
    index: number,
    isMobile: boolean
  ) => (
    <Slides.Item
      size={isMobile ? 'xxs' : 'md'}
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
        <FollowingRecommendArticle article={article} showCover={!isMobile} />
        {mountTracker && (
          <CardExposureTracker
            location={`${location}.${index}`}
            feedType="following"
            contentType={contentType}
            id={article.id}
          />
        )}
      </section>
    </Slides.Item>
  )

  return (
    <section className={styles.container}>
      <Media lessThan="md">
        <Slides header={<FollowingRecommendHead type={type} />}>
          {articles.map((article, index) =>
            renderSlideItem(article, index, true)
          )}
        </Slides>
      </Media>
      <Media greaterThanOrEqual="md">
        <Slides header={<FollowingRecommendHead type={type} />}>
          {articles.map((article, index) =>
            renderSlideItem(article, index, false)
          )}
        </Slides>
      </Media>
      <span ref={ref} />
    </section>
  )
}

RecommendArticleActivity.fragments = fragments

export default RecommendArticleActivity
