import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import { useState } from 'react'

import {
  EmptyAnalytics,
  List,
  QueryError,
  Spinner,
  Translate,
  useRoute,
} from '~/components'

import { ReactComponent as IconAnalyticsContent24 } from '@/public/static/icons/24px/analytics-content.svg'

import SectionHead from '../SectionHead'
import ContentDigest from './ContentDigest'
import CircleContentAnalyticsTabs, {
  CircleContentAnalyticsType,
} from './ContentTabs'
import { CIRCLE_CONTENT_ANALYTICS } from './gql'
import styles from './styles.css'

import {
  CircleContentAnalyticsPaywall,
  CircleContentAnalyticsPaywall_user_ownCircles_analytics_content_paywall,
} from './__generated__/CircleContentAnalyticsPaywall'
import {
  CircleContentAnalyticsPublic,
  CircleContentAnalyticsPublic_user_ownCircles_analytics_content_public,
} from './__generated__/CircleContentAnalyticsPublic'

type FeedType = CircleContentAnalyticsPaywall | CircleContentAnalyticsPublic

type FeedContent =
  | CircleContentAnalyticsPaywall_user_ownCircles_analytics_content_paywall
  | CircleContentAnalyticsPublic_user_ownCircles_analytics_content_public

interface FeedProps {
  type: CircleContentAnalyticsType
}

const Feed: React.FC<FeedProps> = ({ type }) => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const query = CIRCLE_CONTENT_ANALYTICS[type]
  const { data, error, loading } = useQuery<FeedType>(query, {
    variables: { userName },
  })

  const circle = data?.user?.ownCircles && data.user.ownCircles[0]
  const contents = _get(
    circle,
    `analytics.content.${type}`,
    []
  ) as FeedContent[]

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (contents.length === 0) {
    return <EmptyAnalytics />
  }

  return (
    <List>
      {contents.map((content, i) => (
        <List.Item key={content.node.id}>
          <ContentDigest
            article={content.node}
            count={content.readCount}
            index={i}
          />
        </List.Item>
      ))}
    </List>
  )
}

const CircleContentAnalytics = () => {
  const [type, setType] = useState<CircleContentAnalyticsType>('paywall')

  return (
    <section className="container">
      <SectionHead
        icon={IconAnalyticsContent24}
        title={
          <Translate
            zh_hant="站內閱讀熱門排行"
            zh_hans="站内阅读热门排行"
            en="Hottest"
          />
        }
      />

      <CircleContentAnalyticsTabs type={type} setType={setType} />

      <Feed type={type} />

      <style jsx>{styles}</style>
    </section>
  )
}

export default CircleContentAnalytics
