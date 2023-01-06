import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import { useState } from 'react'

import { ReactComponent as IconAnalyticsContent24 } from '@/public/static/icons/24px/analytics-content.svg'
import {
  EmptyAnalytics,
  List,
  QueryError,
  Spinner,
  Translate,
  useRoute,
} from '~/components'
import {
  CircleContentAnalyticsPaywallQuery,
  CircleContentAnalyticsPublicQuery,
} from '~/gql/graphql'

import SectionHead from '../SectionHead'
import ContentDigest from './ContentDigest'
import CircleContentAnalyticsTabs, {
  CircleContentAnalyticsType,
} from './ContentTabs'
import { CIRCLE_CONTENT_ANALYTICS } from './gql'
import styles from './styles.css'

type FeedType =
  | CircleContentAnalyticsPaywallQuery
  | CircleContentAnalyticsPublicQuery

type FeedContent =
  | NonNullable<
      NonNullable<
        CircleContentAnalyticsPaywallQuery['circle']
      >['analytics']['content']['paywall']
    >[0]
  | NonNullable<
      NonNullable<
        CircleContentAnalyticsPublicQuery['circle']
      >['analytics']['content']['public']
    >[0]

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
