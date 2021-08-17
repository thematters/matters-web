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

import { ReactComponent as IconAnalyticsIncome24 } from '@/public/static/icons/24px/analytics-income.svg'
import { toAmountString } from '@/src/common/utils'

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

  return (
    <section className="content">
      <section className="tiles">
        <ul>
          <li>
            <h3>
              <Translate
                zh_hant="上月營收"
                zh_hans="上月营收"
                en="Last Month"
              />
            </h3>
            <p>
              {toAmountString(income.lastMonth)}{' '}
              <span className="unit">HKD</span>
            </p>
          </li>
          <li>
            <h3>
              <Translate
                zh_hant="本月預期營收"
                zh_hans="本月预期营收"
                en="This Month (Estimation)"
              />
            </h3>
            <p>
              {toAmountString(income.thisMonth)}{' '}
              <span className="unit">HKD</span>
            </p>
          </li>
          <li className="divider">
            <h3>
              <Translate zh_hant="目前總營收" zh_hans="目前总营收" en="Total" />
            </h3>
            <p>
              {toAmountString(income.total)} <span className="unit">HKD</span>
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
    </section>
  )
}

const IncomeAnalytics = () => {
  return (
    <section className="container">
      <section className="head">
        <TextIcon
          icon={withIcon(IconAnalyticsIncome24)({ size: 'md' })}
          size="xm"
          spacing="tight"
          weight="md"
        >
          <Translate zh_hant="營收" zh_hans="营收" en="Income" />
        </TextIcon>
      </section>

      <Content />

      <style jsx>{styles}</style>
    </section>
  )
}

export default IncomeAnalytics
