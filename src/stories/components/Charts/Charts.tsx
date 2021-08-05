import { sum as d3Sum } from 'd3-array'

import { StackedAreaChart } from '~/components'

const MOCK_INCOME_ANALYTICS = [
  { time: new Date(2021, 0, 1), income: 255 },
  { time: new Date(2021, 1, 1), income: 433 },
  { time: new Date(2021, 2, 1), income: 380 },
  { time: new Date(2021, 3, 1), income: 560 },
]

const MOCK_SUBSCRIBER_ANALYTICS = [
  { time: new Date('May 1, 2021 00:00:00 GMT+00:00'), paid: 5, invitation: 12 },
  {
    time: new Date('June 1, 2021 00:00:00 GMT+00:00'),
    paid: 12,
    invitation: 15,
  },
  {
    time: new Date('July 1, 2021 00:00:00 GMT+00:00'),
    paid: 15,
    invitation: 22,
  },
  {
    time: new Date('August 1, 2021 00:00:00 GMT+00:00'),
    paid: 20,
    invitation: 10,
  },
  {
    time: new Date('September 1, 2021 00:00:00 GMT+00:00'),
    paid: 18,
    invitation: 4,
  },
  {
    time: new Date('October 1, 2021 00:00:00 GMT+00:00'),
    paid: 24,
    invitation: 8,
  },
]

const Charts = () => (
  <section>
    <ul>
      {/* single-area */}
      <li>
        <StackedAreaChart data={MOCK_INCOME_ANALYTICS}>
          {(props) => (
            <>
              <StackedAreaChart.Axis {...props} />
              <StackedAreaChart.Area {...props} />
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
              <StackedAreaChart.Area {...props} />
              <StackedAreaChart.Tooltip
                {...props}
                formatter={(datum) => {
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
    </ul>

    <style jsx>{`
      li {
        @mixin border-bottom-grey;
        margin-bottom: var(--spacing-loose);
        border: 1px solid #999c9d;
      }
    `}</style>
  </section>
)

export default Charts
