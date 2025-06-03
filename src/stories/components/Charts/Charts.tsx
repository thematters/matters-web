import { sum as d3Sum } from 'd3-array'

import { CHART_COLOR } from '~/common/enums'
import { StackedAreaChart } from '~/components'

import styles from './styles.module.css'

const MOCK_INCOME_ANALYTICS = [
  { time: new Date(2021, 0, 1), income: 255 },
  { time: new Date(2021, 1, 1), income: 433 },
  { time: new Date(2021, 2, 1), income: 380 },
  { time: new Date(2021, 3, 1), income: 560 },
]

const MOCK_SUBSCRIBER_ANALYTICS = [
  { time: new Date('May 1, 2021 00:00:00 GMT+00:00'), invitation: 5, paid: 12 },
  {
    time: new Date('June 1, 2021 00:00:00 GMT+00:00'),
    invitation: 12,
    paid: 15,
  },
  {
    time: new Date('July 1, 2021 00:00:00 GMT+00:00'),
    invitation: 15,
    paid: 22,
  },
  {
    time: new Date('August 1, 2021 00:00:00 GMT+00:00'),
    invitation: 20,
    paid: 10,
  },
  {
    time: new Date('September 1, 2021 00:00:00 GMT+00:00'),
    invitation: 18,
    paid: 4,
  },
  {
    time: new Date('October 1, 2021 00:00:00 GMT+00:00'),
    invitation: 24,
    paid: 8,
  },
]

const Charts = () => (
  <section className={styles.styles}>
    <ul>
      {/* single-area */}
      <li>
        <StackedAreaChart data={MOCK_INCOME_ANALYTICS}>
          {(props) => (
            <>
              <StackedAreaChart.Axis {...props} />
              <StackedAreaChart.Area
                {...props}
                colors={{
                  income: CHART_COLOR.green,
                }}
              />
              <StackedAreaChart.Tooltip {...props} />
            </>
          )}
        </StackedAreaChart>
      </li>

      {/* multi-area */}
      <li>
        <StackedAreaChart data={MOCK_SUBSCRIBER_ANALYTICS}>
          {(props) => (
            <>
              <StackedAreaChart.Axis {...props} />
              <StackedAreaChart.Area
                {...props}
                colors={{
                  invitation: CHART_COLOR.green,
                  paid: CHART_COLOR.yellow,
                }}
              />
              <StackedAreaChart.Tooltip
                {...props}
                formatter={(datum) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { time, ...values } = datum

                  return [
                    `<span>總數: ${d3Sum(Object.values(values))}</span>`,
                    ...Object.keys(values).map((key) => {
                      const keyName = {
                        invitation: '免費',
                        paid: '付費',
                        others: '其他',
                      }[key]
                      return `<span>${keyName}: ${datum[key]}</span>`
                    }),
                  ].join('<br/>')
                }}
              />
            </>
          )}
        </StackedAreaChart>
      </li>

      <li>
        <StackedAreaChart
          data={MOCK_SUBSCRIBER_ANALYTICS.map((d) => {
            // const abc = d.paid + _random(1, 10)
            // const def = abc + _random(5, 20)
            return { ...d }
          })}
        >
          {(props) => (
            <>
              <StackedAreaChart.Axis {...props} />
              <StackedAreaChart.Area
                {...props}
                colors={{
                  invitation: CHART_COLOR.green,
                  paid: CHART_COLOR.yellow,
                }}
              />
              <StackedAreaChart.Tooltip {...props} />
            </>
          )}
        </StackedAreaChart>
      </li>
    </ul>
  </section>
)

export default Charts
