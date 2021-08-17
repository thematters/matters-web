import { useQuery } from '@apollo/react-hooks'
import { sum as d3Sum } from 'd3-array'
import _get from 'lodash/get'
import { MembersDialog } from '~/views/Circle/Profile/MembersDialog'

import {
  Button,
  QueryError,
  Spinner,
  StackedAreaChart,
  TextIcon,
  Translate,
  useRoute,
} from '~/components'

import { translate } from '~/common/utils'

import { ReactComponent as IconAnalyticsSubscriber24 } from '@/public/static/icons/24px/analytics-subscriber.svg'

import InfoTiles from '../InfoTiles'
import SectionHead from '../SectionHead'
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
    <>
      <InfoTiles>
        <InfoTiles.Group primary>
          <InfoTiles.Tile
            title={
              <Translate
                zh_hant="目前總訂閱人數"
                zh_hans="目前总订阅人数"
                en="Current Total"
              />
            }
            value={subscriber.currentSubscriber + subscriber.currentInvitee}
            unit={<Translate zh_hant="人" zh_hans="人" en="" />}
          />
        </InfoTiles.Group>
        <InfoTiles.Group>
          <InfoTiles.Tile
            title={
              <Translate
                zh_hant="付費人數"
                zh_hans="付费人数"
                en="Subscribers"
              />
            }
            value={subscriber.currentSubscriber}
            unit={<Translate zh_hant="人" zh_hans="人" en="" />}
          />
          <InfoTiles.Tile
            title={
              <Translate zh_hant="免費邀請" zh_hans="免费邀请" en="Invitees" />
            }
            value={subscriber.currentInvitee}
            unit={<Translate zh_hant="人" zh_hans="人" en="" />}
          />
        </InfoTiles.Group>
      </InfoTiles>

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
    </>
  )
}

const SubscriberAnalytics = () => {
  return (
    <section className="container">
      <SectionHead
        icon={IconAnalyticsSubscriber24}
        title={<Translate zh_hant="訂閱" zh_hans="订阅" en="Subscribers" />}
      >
        <MembersDialog>
          {({ openDialog: openMembersDialog }) => (
            <Button
              borderColor="grey-light"
              borderWidth="sm"
              spacing={['xxtight', 'xtight']}
              onClick={openMembersDialog}
            >
              <TextIcon color="grey-darker" size="xs">
                <Translate
                  zh_hant="查看名單"
                  zh_hans="查看名单"
                  en="View Members"
                />
              </TextIcon>
            </Button>
          )}
        </MembersDialog>
      </SectionHead>

      <Content />

      <style jsx>{styles}</style>
    </section>
  )
}

export default SubscriberAnalytics
