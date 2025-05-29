import { useQuery } from '@apollo/client'
import { FormattedMessage } from 'react-intl'

import IconAnalyticsIncome24 from '@/public/static/icons/24px/analytics-income.svg'
import { CHART_COLOR } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  type Datum,
  QueryError,
  SpinnerBlock,
  StackedAreaChart,
  useRoute,
} from '~/components'
import { CircleIncomeAnalyticsQuery } from '~/gql/graphql'

import InfoTiles from '../InfoTiles'
import SectionHead from '../SectionHead'
import { CIRCLE_INCOME_ANALYTICS } from './gql'
import styles from './styles.module.css'

const Content = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const { data, error, loading } = useQuery<CircleIncomeAnalyticsQuery>(
    CIRCLE_INCOME_ANALYTICS,
    {
      variables: { name },
    }
  )

  const income = data?.circle?.analytics.income

  if (loading) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!income) {
    return null
  }

  const chartData = income.history.map((datum) => ({
    time: new Date(datum.date),
    value: datum.value,
  }))

  const incomeLastMonthsAgo =
    income.history[income.history.length - 2].value || 0

  const percentageChangeThisMonth =
    incomeLastMonthsAgo > 0
      ? ((income.thisMonth - incomeLastMonthsAgo) / incomeLastMonthsAgo) * 100
      : undefined

  const percentageChangeNextMonth =
    income.thisMonth > 0
      ? ((income.nextMonth - income.thisMonth) / income.thisMonth) * 100
      : undefined

  return (
    <>
      <InfoTiles>
        <InfoTiles.Group primary>
          <InfoTiles.Tile
            title={
              <FormattedMessage
                defaultMessage="This Month"
                id="sPgUkN"
                description="src/views/Circle/Analytics/IncomeAnalytics/index.tsx"
              />
            }
            value={formatAmount(income.thisMonth, 0)}
            unit="HKD"
            percentageChange={percentageChangeThisMonth}
          />
          <InfoTiles.Tile
            title={
              <FormattedMessage
                defaultMessage="Next Month (Estimation)"
                id="Fe682o"
                description="src/views/Circle/Analytics/IncomeAnalytics/index.tsx"
              />
            }
            value={formatAmount(income.nextMonth, 0)}
            unit="HKD"
            percentageChange={percentageChangeNextMonth}
          />
        </InfoTiles.Group>
        <InfoTiles.Group>
          <InfoTiles.Tile
            title={
              <FormattedMessage
                defaultMessage="Total"
                id="L4NXXh"
                description="src/views/Circle/Analytics/IncomeAnalytics/index.tsx"
              />
            }
            value={formatAmount(income.total, 0)}
            unit="HKD"
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
                  formatter={(datum: Datum) =>
                    typeof datum.value === 'number'
                      ? `<span>${formatAmount(datum.value, 0)} HKD</span>`
                      : ''
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

const IncomeAnalytics = () => {
  return (
    <section className={styles.container}>
      <SectionHead
        icon={IconAnalyticsIncome24}
        title={
          <FormattedMessage
            defaultMessage="Income"
            id="d4waan"
            description="src/views/Circle/Analytics/IncomeAnalytics/index.tsx"
          />
        }
      />

      <Content />
    </section>
  )
}

export default IncomeAnalytics
