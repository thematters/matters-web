import React from 'react'

import { AreaChart } from '~/components'

const MOCK_INCOME_ANALYTICS = {
  history: [
    { time: new Date(1617206400000), value: 255 },
    { time: new Date(1619798400000), value: 433 },
    { time: new Date(1622476800000), value: 380 },
    { time: new Date(1625068800000), value: 560 },
  ],
}

const Charts = () => (
  <section>
    <ul>
      <li>
        <AreaChart data={MOCK_INCOME_ANALYTICS.history}>
          {(props) => (
            <>
              <AreaChart.Axis {...props} />
              <AreaChart.Area {...props} />
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
      }
    `}</style>
  </section>
)

export default Charts
