import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'

import {
  QueryError,
  Spinner,
  StackedAreaChart,
  TextIcon,
  Translate,
  useRoute,
  withIcon,
} from '~/components'

import { ReactComponent as IconAnalyticsFollower24 } from '@/public/static/icons/24px/analytics-follower.svg'

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

  const newFollowersThisMonth =
    (follower.current || 0) - (follower.history[0].value || 0)
  const chartData = follower.history.map((datum) => ({
    time: new Date(datum.date),
    value: datum.value,
  }))

  return (
    <section className="content">
      <section className="tiles">
        <ul>
          <li>
            <h3>
              <Translate
                zh_hant="目前總追蹤人數"
                zh_hans="目前总追踪人数"
                en="Current Followers"
              />
            </h3>
            <p>
              {follower.current}{' '}
              <span className="unit">
                <Translate zh_hant="人" zh_hans="人" en="" />
              </span>
            </p>
          </li>
          <li>
            <h3>
              <Translate
                zh_hant="本月新增追蹤人數"
                zh_hans="本月新增追踪人数"
                en="New Followers This Month"
              />
            </h3>
            <p>
              {newFollowersThisMonth}{' '}
              <span className="unit">
                <Translate zh_hant="人" zh_hans="人" en="" />
              </span>
            </p>
          </li>
          <li className="divider">
            <h3>
              <Translate
                zh_hant="已追蹤用戶佔總觀看人數比例"
                zh_hans="已追踪用户占总观看人数比例"
                en="Conversion Rate of Followers"
              />
            </h3>
            <p>{follower.followerPercentage}%</p>
          </li>
        </ul>
      </section>

      {chartData && (
        <section className="chart">
          <StackedAreaChart data={chartData}>
            {(props) => (
              <>
                <StackedAreaChart.Axis {...props} />
                <StackedAreaChart.Area {...props} />
                <StackedAreaChart.Tooltip {...props} />
              </>
            )}
          </StackedAreaChart>
        </section>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

const FollowerAnalytics = () => {
  return (
    <section className="container">
      <section className="head">
        <TextIcon
          icon={withIcon(IconAnalyticsFollower24)({ size: 'md' })}
          size="xm"
          spacing="tight"
          weight="md"
        >
          <Translate zh_hant="追蹤" zh_hans="追踪" en="Followers" />
        </TextIcon>
      </section>

      <Content />

      <style jsx>{styles}</style>
    </section>
  )
}

export default FollowerAnalytics
