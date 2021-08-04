import { AreaChart } from '~/components'

import { CHART_COLOR } from '@/src/common/enums'

const MOCK_INCOME_ANALYTICS = {
  income: [
    { time: new Date(2021, 0, 1), value: 255 },
    { time: new Date(2021, 1, 1), value: 433 },
    { time: new Date(2021, 2, 1), value: 380 },
    { time: new Date(2021, 3, 1), value: 560 },
  ],
}

const MOCK_SUBSCRIBER_ANALYTICS = {
  paid: [
    { time: new Date('May 1, 2021 00:00:00 GMT+00:00'), value: 5 },
    { time: new Date('June 1, 2021 00:00:00 GMT+00:00'), value: 35 },
    { time: new Date('July 1, 2021 00:00:00 GMT+00:00'), value: 24 },
    { time: new Date('August 1, 2021 00:00:00 GMT+00:00'), value: 38 },
    { time: new Date('September 1, 2021 00:00:00 GMT+00:00'), value: 14 },
    { time: new Date('October 1, 2021 00:00:00 GMT+00:00'), value: 45 },
  ],
  invitation: [
    { time: new Date('May 1, 2021 00:00:00 GMT+00:00'), value: 0 },
    { time: new Date('June 1, 2021 00:00:00 GMT+00:00'), value: 10 },
    { time: new Date('July 1, 2021 00:00:00 GMT+00:00'), value: 35 },
    { time: new Date('August 1, 2021 00:00:00 GMT+00:00'), value: 22 },
    { time: new Date('September 1, 2021 00:00:00 GMT+00:00'), value: 14 },
    { time: new Date('October 1, 2021 00:00:00 GMT+00:00'), value: 43 },
  ],
  others: [
    { time: new Date('May 1, 2021 00:00:00 GMT+00:00'), value: 5 },
    { time: new Date('June 1, 2021 00:00:00 GMT+00:00'), value: 7 },
    { time: new Date('July 1, 2021 00:00:00 GMT+00:00'), value: 10 },
    { time: new Date('August 1, 2021 00:00:00 GMT+00:00'), value: 13 },
    { time: new Date('September 1, 2021 00:00:00 GMT+00:00'), value: 20 },
    { time: new Date('October 1, 2021 00:00:00 GMT+00:00'), value: 12 },
  ],
}

const Charts = () => (
  <section>
    <ul>
      {/* single-area */}
      <li>
        <AreaChart data={MOCK_INCOME_ANALYTICS}>
          {(props) => (
            <>
              <AreaChart.Axis {...props} />
              <AreaChart.Area dataKey="income" {...props} />
              <AreaChart.Tooltip {...props} />
            </>
          )}
        </AreaChart>
      </li>

      {/* multi-area */}
      <li>
        <AreaChart data={MOCK_SUBSCRIBER_ANALYTICS}>
          {(props) => (
            <>
              <AreaChart.Axis {...props} />
              <AreaChart.Area
                {...props}
                dataKey="others"
                areaColor={CHART_COLOR.red.area}
                lineColor={CHART_COLOR.red.line}
              />
              <AreaChart.Area
                {...props}
                dataKey="invitation"
                areaColor={CHART_COLOR.yellow.area}
                lineColor={CHART_COLOR.yellow.line}
              />
              <AreaChart.Area {...props} dataKey="paid" />
              <AreaChart.Tooltip
                {...props}
                formatter={(data) =>
                  Object.keys(data)
                    .map((key) => {
                      const keyName = {
                        invitation: '免費',
                        paid: '付費',
                        others: '其他',
                      }[key]
                      return `<span>${keyName}: ${data[key].value}</span>`
                    })
                    .join('<br/>')
                }
              />
            </>
          )}
        </AreaChart>
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
