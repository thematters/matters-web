import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import { useState } from 'react'

import { QueryError, Spinner, useRoute } from '~/components'

import CircleContentAnalyticsTabs, {
  CircleContentAnalyticsType,
} from './ContentTabs'
import { CIRCLE_CONTENT_ANALYTICS } from './gql'

import { CircleContentAnalyticsPaywall } from './__generated__/CircleContentAnalyticsPaywall'
import { CircleContentAnalyticsPublic } from './__generated__/CircleContentAnalyticsPublic'

type FeedType = CircleContentAnalyticsPaywall | CircleContentAnalyticsPublic

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
  const contents = _get(circle, `analytics.content.${type}`, [])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  console.log(contents)

  return <></>
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
