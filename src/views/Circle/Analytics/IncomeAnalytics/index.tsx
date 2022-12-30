import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'

import { ReactComponent as IconAnalyticsIncome24 } from '@/public/static/icons/24px/analytics-income.svg'
import { CHART_COLOR } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  QueryError,
  Spinner,
  StackedAreaChart,
  Translate,
  useRoute,
} from '~/components'

import InfoTiles from '../InfoTiles'
import SectionHead from '../SectionHead'
import { CircleIncomeAnalytics } from './__generated__/CircleIncomeAnalytics'
import { CIRCLE_INCOME_ANALYTICS } from './gql'
import styles from './styles.css'

const Content = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const { data, error, loading } = useQuery<CircleIncomeAnalytics>(
    CIRCLE_INCOME_ANALYTICS,
    {
      variables: { name },
    }
  )

  const income = data?.circle?.analytics.income

  if (loading) {
    return <Spinner />
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
              <Translate
                zh_hant="本月營收"
                zh_hans="本月营收"
                en="This Month"
              />
            }
            value={formatAmount(income.thisMonth, 0)}
            unit="HKD"
            percentageChange={percentageChangeThisMonth}
          />
          <InfoTiles.Tile
            title={
              <Translate
                zh_hant="下月預期營收"
                zh_hans="下月预期营收"
                en="Next Month (Estimation)"
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
              <Translate zh_hant="目前總營收" zh_hans="目前总营收" en="Total" />
            }
            value={formatAmount(income.total, 0)}
            unit="HKD"
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
                    `<span>${formatAmount(datum.value, 0)} HKD</span>`
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

const IncomeAnalytics = () => {
  return (
    <section className="container">
      <SectionHead
        icon={IconAnalyticsIncome24}
        title={<Translate zh_hant="營收" zh_hans="营收" en="Income" />}
      />

      <Content />

      <style jsx>{styles}</style>
    </section>
  )
}

export default IncomeAnalytics
