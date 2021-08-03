import React from 'react'

import { AreaChart } from '~/components'

const MOCK_INCOME_ANALYTICS = {
  income: [
    { time: new Date(1617206400000), value: 255 },
    { time: new Date(1619798400000), value: 433 },
    { time: new Date(1622476800000), value: 380 },
    { time: new Date(1625068800000), value: 560 },
  ],
}

const MOCK_SUBSCRIBER_ANALYTICS = {
  paid: [
    { time: new Date(1617206400000), value: 5 },
    { time: new Date(1619798400000), value: 35 },
    { time: new Date(1622476800000), value: 24 },
    { time: new Date(1625068800000), value: 38 },
  ],
  invitation: [
    { time: new Date(1617206400000), value: 0 },
    { time: new Date(1619798400000), value: 10 },
    { time: new Date(1622476800000), value: 35 },
    { time: new Date(1625068800000), value: 22 },
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
                dataKey="invitation"
                areaColor="#FEEECA"
                lineColor="#F1BA4C"
              />
              <AreaChart.Area {...props} dataKey="paid" />
              <AreaChart.Tooltip {...props} />
            </>
          )}
        </AreaChart>
      </li>
    </ul>

    <style jsx>{`
      li {
        @mixin border-bottom-grey;
        padding: var(--spacing-base);
        margin-bottom: var(--spacing-loose);
        border: 1px solid #999c9d;
      }
    `}</style>
  </section>
)

export default Charts
