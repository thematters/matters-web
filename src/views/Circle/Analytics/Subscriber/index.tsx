import { useQuery } from '@apollo/react-hooks'
import { sum as d3Sum } from 'd3-array'
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

import { ReactComponent as IconAnalyticsSubscriber24 } from '@/public/static/icons/24px/analytics-subscriber.svg'
import { translate } from '@/src/common/utils'

import { CIRCLE_SUBSCRIBER_ANALYTICS } from './gql'
import styles from './styles.css'

import { CircleSubscriberAnalytics } from './__generated__/CircleSubscriberAnalytics'

const Content = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const { data, error, loading } = useQuery<CircleSubscriberAnalytics>(
    CIRCLE_SUBSCRIBER_ANALYTICS,
    {
      variables: { name },
    }
  )

  const subscriber = data?.circle?.analytics.subscriber

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!subscriber) {
    return null
  }

  const dates = subscriber.subscriberHistory.map((datum) => datum.date)
  const subscriberMap = Object.assign(
    {},
    ...subscriber.subscriberHistory.map((datum) => ({
      [datum.date]: datum.value,
    }))
  )
  const inviteeMap = Object.assign(
    {},
    ...subscriber.inviteeHistory.map((datum) => ({
      [datum.date]: datum.value,
    }))
  )
  const chartData = dates?.map((date) => {
    return {
      time: new Date(date),
      subscriber: subscriberMap[date],
      invitee: inviteeMap[date],
    }
  })

  const tooltipFormatter = (datum: any) => {
    const { time, ...values } = datum

    return [
      `<span>${translate({
        zh_hant: '總數',
        zh_hans: '总数',
        en: 'Total',
      })}: ${d3Sum(Object.values(values))}</span>`,
      ...Object.keys(values).map((key) => {
        const keyName = {
          subscriber: translate({
            zh_hant: '付費',
            zh_hans: '付费',
            en: 'Subscribers',
          }),
          invitee: translate({
            zh_hant: '免費',
            zh_hans: '免费',
            en: ' Invitees',
          }),
        }[key]
        return `<span>${keyName}: ${datum[key]}</span>`
      }),
    ].join('<br/>')
  }

  return (
    <section className="content">
      <section className="tiles">
        <ul>
          <li>
            <h3>
              <Translate
                zh_hant="目前總訂閱人數"
                zh_hans="目前总订阅人数"
                en="Current Total"
              />
            </h3>
            <p>
              {subscriber.currentSubscriber + subscriber.currentInvitee}{' '}
              <span className="unit">
                <Translate zh_hant="人" zh_hans="人" en="" />
              </span>
            </p>
          </li>
          <li>
            <h3>
              <Translate
                zh_hant="付費人數"
                zh_hans="付费人数"
                en="Subscribers"
              />
            </h3>
            <p>
              {subscriber.currentSubscriber}{' '}
              <span className="unit">
                <Translate zh_hant="人" zh_hans="人" en="" />
              </span>
            </p>
          </li>
          <li className="divider">
            <h3>
              <Translate zh_hant="免費邀請" zh_hans="免费邀请" en="Invitees" />
            </h3>
            <p>
              {subscriber.currentInvitee}{' '}
              <span className="unit">
                <Translate zh_hant="人" zh_hans="人" en="" />
              </span>
            </p>
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
                <StackedAreaChart.Tooltip
                  {...props}
                  formatter={tooltipFormatter}
                />
              </>
            )}
          </StackedAreaChart>
        </section>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

const SubscriberAnalytics = () => {
  return (
    <section className="container">
      <section className="head">
        <TextIcon
          icon={withIcon(IconAnalyticsSubscriber24)({ size: 'md' })}
          size="xm"
          spacing="tight"
          weight="md"
        >
          <Translate zh_hant="訂閱" zh_hans="订阅" en="Subscribers" />
        </TextIcon>
      </section>

      <Content />

      <style jsx>{styles}</style>
    </section>
  )
}

export default SubscriberAnalytics
