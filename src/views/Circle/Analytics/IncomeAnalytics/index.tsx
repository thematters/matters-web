import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'

import {
  QueryError,
  Spinner,
  StackedAreaChart,
  Translate,
  useRoute,
} from '~/components'

import { toAmountString } from '~/common/utils'

import { ReactComponent as IconAnalyticsIncome24 } from '@/public/static/icons/24px/analytics-income.svg'

import InfoTiles from '../InfoTiles'
import SectionHead from '../SectionHead'
import { CIRCLE_INCOME_ANALYTICS } from './gql'
import styles from './styles.css'

import { CircleIncomeAnalytics } from './__generated__/CircleIncomeAnalytics'

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

  const incomeTwoMonthsAgo =
    income.history[income.history.length - 2].value || 0

  const percentageChangeLastMonth =
    incomeTwoMonthsAgo > 0
      ? ((income.lastMonth - incomeTwoMonthsAgo) / incomeTwoMonthsAgo) * 100
      : undefined

  const percentageChangeThisMonth =
    income.lastMonth > 0
      ? ((income.thisMonth - income.lastMonth) / income.lastMonth) * 100
      : undefined

  return (
    <>
      <InfoTiles>
        <InfoTiles.Group primary>
          <InfoTiles.Tile
            title={
              <Translate
                zh_hant="上月營收"
                zh_hans="上月营收"
                en="Last Month"
              />
            }
            value={toAmountString(income.lastMonth)}
            unit="HKD"
            percentageChange={percentageChangeLastMonth}
          />
          <InfoTiles.Tile
            title={
              <Translate
                zh_hant="本月預期營收"
                zh_hans="本月预期营收"
                en="This Month (Estimation)"
              />
            }
            value={toAmountString(income.thisMonth)}
            unit="HKD"
            percentageChange={percentageChangeThisMonth}
          />
        </InfoTiles.Group>
        <InfoTiles.Group>
          <InfoTiles.Tile
            title={
              <Translate zh_hant="目前總營收" zh_hans="目前总营收" en="Total" />
            }
            value={toAmountString(income.total)}
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
                <StackedAreaChart.Area {...props} />
                <StackedAreaChart.Tooltip
                  {...props}
                  formatter={(datum: any) =>
                    `<span>${toAmountString(datum.value)} HKD</span>`
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
