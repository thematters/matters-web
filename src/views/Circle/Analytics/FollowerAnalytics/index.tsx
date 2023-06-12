import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconAnalyticsFollower24 } from '@/public/static/icons/24px/analytics-follower.svg'
import { CHART_COLOR } from '~/common/enums'
import { QueryError, Spinner, StackedAreaChart, useRoute } from '~/components'
import { CircleFollowerAnalyticsQuery } from '~/gql/graphql'

import InfoTiles from '../InfoTiles'
import SectionHead from '../SectionHead'
import { CIRCLE_FOLLOWER_ANALYTICS } from './gql'
import styles from './styles.module.css'

const Content = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const intl = useIntl()

  const { data, error, loading } = useQuery<CircleFollowerAnalyticsQuery>(
    CIRCLE_FOLLOWER_ANALYTICS,
    {
      variables: { name },
    }
  )

  const follower = data?.circle?.analytics.follower

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!follower) {
    return null
  }

  const followersLastMonth =
    follower.history[follower.history.length - 2].value || 0
  const newFollowersThisMonth = follower.current - followersLastMonth
  const chartData = follower.history.map((datum) => ({
    time: new Date(datum.date),
    value: datum.value,
  }))
  const percentageChangeThisMonth =
    followersLastMonth > 0
      ? (newFollowersThisMonth / followersLastMonth) * 100
      : undefined

  return (
    <>
      <InfoTiles>
        <InfoTiles.Group primary>
          <InfoTiles.Tile
            title={
              <FormattedMessage
                defaultMessage="followers_empty
              "
                description="src/views/Circle/Analytics/FollowerAnalytics/index.tsx"
              />
            }
            value={follower.current}
            unit={
              <FormattedMessage
                defaultMessage={`{follower, plural, =1 {follower} other {followers}}`}
                description="src/views/Circle/Analytics/FollowerAnalytics/index.tsx"
                values={{
                  follower: follower.current,
                }}
              />
            }
          />
          <InfoTiles.Tile
            title={
              <FormattedMessage
                defaultMessage="New Followers This Month"
                description="src/views/Circle/Analytics/FollowerAnalytics/index.tsx"
              />
            }
            value={newFollowersThisMonth}
            unit={
              <FormattedMessage
                defaultMessage="followers"
                description="src/views/Circle/Analytics/FollowerAnalytics/index.tsx"
              />
            }
            percentageChange={percentageChangeThisMonth}
          />
        </InfoTiles.Group>
        <InfoTiles.Group>
          <InfoTiles.Tile
            title={
              <FormattedMessage
                defaultMessage="Conversion Rate of Followers"
                description="src/views/Circle/Analytics/FollowerAnalytics/index.tsx"
              />
            }
            value={`${follower.followerPercentage}%`}
          />
        </InfoTiles.Group>
      </InfoTiles>

      {chartData && (
        <section className={styles.chart}>
          <StackedAreaChart data={chartData}>
            {(props) => (
              <>
                <StackedAreaChart.Axis {...props} />
                <StackedAreaChart.Area
                  {...props}
                  colors={{
                    value: CHART_COLOR.green,
                  }}
                />
                <StackedAreaChart.Tooltip
                  {...props}
                  formatter={(datum: any) =>
                    `<span>&nbsp;${datum.value}${intl.formatMessage({
                      defaultMessage: 'followers',
                      description:
                        'src/views/Circle/Analytics/FollowerAnalytics/index.tsx',
                    })}&nbsp;</span>`
                  }
                />
              </>
            )}
          </StackedAreaChart>
        </section>
      )}
    </>
  )
}

const FollowerAnalytics = () => {
  return (
    <section className={styles.container}>
      <SectionHead
        icon={IconAnalyticsFollower24}
        title={
          <FormattedMessage
            description="src/views/Circle/Analytics/FollowerAnalytics/index.tsx"
            defaultMessage="Followers"
          />
        }
      />

      <Content />
    </section>
  )
}

export default FollowerAnalytics
