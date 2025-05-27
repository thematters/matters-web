import { useQuery } from '@apollo/client'
import { sum as d3Sum } from 'd3-array'
import _get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'

import IconAnalyticsSubscriber24 from '@/public/static/icons/24px/analytics-subscriber.svg'
import { CHART_COLOR } from '~/common/enums'
import {
  Button,
  type Datum,
  QueryError,
  SpinnerBlock,
  StackedAreaChart,
  TextIcon,
  useRoute,
} from '~/components'
import { CircleSubscriberAnalyticsQuery } from '~/gql/graphql'
import { MembersDialog } from '~/views/Circle/Profile/MembersDialog'

import InfoTiles from '../InfoTiles'
import SectionHead from '../SectionHead'
import { CIRCLE_SUBSCRIBER_ANALYTICS } from './gql'
import styles from './styles.module.css'

enum DatumKey {
  invitee = 'invitee',
  subscriber = 'subscriber',
}

const Content = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const intl = useIntl()
  const { data, error, loading } = useQuery<CircleSubscriberAnalyticsQuery>(
    CIRCLE_SUBSCRIBER_ANALYTICS,
    {
      variables: { name },
    }
  )

  const subscriber = data?.circle?.analytics.subscriber

  if (loading) {
    return <SpinnerBlock />
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
  const chartData = dates?.map((date) => ({
    time: new Date(date),
    [DatumKey.invitee]: inviteeMap[date],
    [DatumKey.subscriber]: subscriberMap[date],
  }))

  const colors = {
    [DatumKey.invitee]: CHART_COLOR.green,
    [DatumKey.subscriber]: CHART_COLOR.yellow,
  }

  const tooltipFormatter = (datum: Datum) => {
    const { time, ...values } = datum

    return [
      `<span class="subscriber-tooltip-item">
        <span class="indicator rect" style="color: #EDEDED"></span>
        ${intl.formatMessage({
          defaultMessage: 'Total',
          id: '2CqWQE',
          description:
            'src/views/Circle/Analytics/SubscriberAnalytics/index.tsx',
        })}: ${d3Sum(Object.values(values))}
      </span>`,
      ...[DatumKey.subscriber, DatumKey.invitee].map((key) => {
        const keyName = {
          [DatumKey.subscriber]: intl.formatMessage({
            defaultMessage: 'Pay',
            id: 'y0b6Kp',
            description:
              'src/views/Circle/Analytics/SubscriberAnalytics/index.tsx',
          }),
          [DatumKey.invitee]: intl.formatMessage({
            defaultMessage: 'Free',
            id: 'L0J61B',
            description:
              'src/views/Circle/Analytics/SubscriberAnalytics/index.tsx',
          }),
        }[key]
        return `
          <span class="subscriber-tooltip-item">
            <span class="indicator" style="color: ${colors[key].line}"></span>
            ${keyName}: ${datum[key]}
          </span>`
      }),
    ].join('<br/>')
  }

  return (
    <>
      <InfoTiles>
        <InfoTiles.Group primary>
          <InfoTiles.Tile
            title={
              <FormattedMessage
                defaultMessage="subscribers_empty"
                id="6OBAOi"
                description="src/views/Circle/Analytics/SubscriberAnalytics/index.tsx"
              />
            }
            value={subscriber.currentSubscriber + subscriber.currentInvitee}
            unit={
              // <Translate zh_hant="人" zh_hans="人" en="subscribers" />
              <FormattedMessage
                defaultMessage={`{subscriber, plural, =1 {subscriber} other {subscribers}}`}
                id="zxy15q"
                description="src/views/Circle/Analytics/SubscriberAnalytics/index.tsx"
                values={{
                  subscriber:
                    subscriber.currentSubscriber + subscriber.currentInvitee,
                }}
              />
            }
          />
        </InfoTiles.Group>
        <InfoTiles.Group>
          <InfoTiles.Tile
            title={
              <FormattedMessage
                defaultMessage="Subscribers"
                id="TSDiqB"
                description="src/views/Circle/Analytics/SubscriberAnalytics/index.tsx"
              />
            }
            value={subscriber.currentSubscriber}
            unit={
              <FormattedMessage
                defaultMessage="subscribers"
                id="XHMco9"
                description="src/views/Circle/Analytics/SubscriberAnalytics/index.tsx"
              />
            }
            indicatorColor={colors[DatumKey.subscriber].line}
          />
          <InfoTiles.Tile
            title={
              <FormattedMessage
                defaultMessage="Invitees"
                id="1qQzV0"
                description="src/views/Circle/Analytics/SubscriberAnalytics/index.tsx"
              />
            }
            value={subscriber.currentInvitee}
            unit={
              <FormattedMessage
                defaultMessage="subscribers"
                id="XHMco9"
                description="src/views/Circle/Analytics/SubscriberAnalytics/index.tsx"
              />
            }
            indicatorColor={colors[DatumKey.invitee].line}
          />
        </InfoTiles.Group>
      </InfoTiles>

      {chartData && (
        <section className={styles.chart}>
          <StackedAreaChart data={chartData}>
            {(props) => (
              <>
                <StackedAreaChart.Axis {...props} />
                <StackedAreaChart.Area {...props} colors={colors} />
                <StackedAreaChart.Tooltip
                  {...props}
                  formatter={tooltipFormatter}
                />
              </>
            )}
          </StackedAreaChart>
        </section>
      )}
    </>
  )
}

const SubscriberAnalytics = () => {
  return (
    <section className={styles.container}>
      <SectionHead
        icon={IconAnalyticsSubscriber24}
        title={
          <FormattedMessage
            defaultMessage="Subscribe"
            id="WpvsPu"
            description="src/views/Circle/Analytics/SubscriberAnalytics/index.tsx"
          />
        }
      >
        <MembersDialog>
          {({ openDialog: openMembersDialog }) => (
            <Button
              borderColor="greyLight"
              borderWidth="sm"
              spacing={[4, 8]}
              onClick={openMembersDialog}
              aria-haspopup="dialog"
            >
              <TextIcon color="greyDarker" size={12}>
                <FormattedMessage
                  defaultMessage="View Members"
                  id="SNh1n0"
                  description="src/views/Circle/Analytics/SubscriberAnalytics/index.tsx"
                />
              </TextIcon>
            </Button>
          )}
        </MembersDialog>
      </SectionHead>

      <Content />
    </section>
  )
}

export default SubscriberAnalytics
