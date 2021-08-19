import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'

import {
  QueryError,
  Spinner,
  StackedAreaChart,
  Translate,
  useRoute,
} from '~/components'

import { CHART_COLOR } from '~/common/enums'
import { translate } from '~/common/utils'

import { ReactComponent as IconAnalyticsFollower24 } from '@/public/static/icons/24px/analytics-follower.svg'

import InfoTiles from '../InfoTiles'
import SectionHead from '../SectionHead'
import { CIRCLE_FOLLOWER_ANALYTICS } from './gql'
import styles from './styles.css'

import { CircleFollowerAnalytics } from './__generated__/CircleFollowerAnalytics'

const Content = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const { data, error, loading } = useQuery<CircleFollowerAnalytics>(
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
              <Translate
                zh_hant="目前總追蹤人數"
                zh_hans="目前总追踪人数"
                en="Current Followers"
              />
            }
            value={follower.current}
            unit={<Translate zh_hant="人" zh_hans="人" en="" />}
          />
          <InfoTiles.Tile
            title={
              <Translate
                zh_hant="本月新增追蹤人數"
                zh_hans="本月新增追踪人数"
                en="New Followers This Month"
              />
            }
            value={newFollowersThisMonth}
            unit={<Translate zh_hant="人" zh_hans="人" en="" />}
            percentageChange={percentageChangeThisMonth}
          />
        </InfoTiles.Group>
        <InfoTiles.Group>
          <InfoTiles.Tile
            title={
              <Translate
                zh_hant="已追蹤用戶佔總觀看人數比例"
                zh_hans="已追踪用户占总观看人数比例"
                en="Conversion Rate of Followers"
              />
            }
            value={`${follower.followerPercentage}%`}
          />
        </InfoTiles.Group>
      </InfoTiles>

      {chartData && (
        <section className="chart">
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
                    `<span>&nbsp;${datum.value}${translate({
                      zh_hant: ' 人',
                      zh_hans: ' 人',
                      en: '',
                    })}&nbsp;</span>`
                  }
                />
              </>
            )}
          </StackedAreaChart>
        </section>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

const FollowerAnalytics = () => {
  return (
    <section className="container">
      <SectionHead
        icon={IconAnalyticsFollower24}
        title={<Translate zh_hant="追蹤" zh_hans="追踪" en="Followers" />}
      />

      <Content />

      <style jsx>{styles}</style>
    </section>
  )
}

export default FollowerAnalytics
