import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import { useState } from 'react'

import { List, QueryError, Spinner, useRoute } from '~/components'

import ContentDigest from './ContentDigest'
import CircleContentAnalyticsTabs, {
  CircleContentAnalyticsType,
} from './ContentTabs'
import { CIRCLE_CONTENT_ANALYTICS } from './gql'

import {
  CircleContentAnalyticsPaywall,
  CircleContentAnalyticsPaywall_circle_analytics_content_paywall,
} from './__generated__/CircleContentAnalyticsPaywall'
import {
  CircleContentAnalyticsPublic,
  CircleContentAnalyticsPublic_circle_analytics_content_public,
} from './__generated__/CircleContentAnalyticsPublic'

type FeedType = CircleContentAnalyticsPaywall | CircleContentAnalyticsPublic

type FeedContent =
  | CircleContentAnalyticsPaywall_circle_analytics_content_paywall
  | CircleContentAnalyticsPublic_circle_analytics_content_public

interface FeedProps {
  type: CircleContentAnalyticsType
}

const Feed: React.FC<FeedProps> = ({ type }) => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const query = CIRCLE_CONTENT_ANALYTICS[type]
  const { data, error, loading } = useQuery<FeedType>(query, {
    variables: { name },
  })

  const circle = data?.circle
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
      <CircleContentAnalyticsTabs type={type} setType={setType} />

      <Feed type={type} />
    </section>
  )
}

export default CircleContentAnalytics
