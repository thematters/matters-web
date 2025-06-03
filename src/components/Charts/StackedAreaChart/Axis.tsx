/* eslint-disable @typescript-eslint/no-explicit-any */
import { range as d3Range } from 'd3-array'
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis'
import { format as d3Format } from 'd3-format'
import { select as d3Select } from 'd3-selection'
import { timeFormat as d3TimeFormat } from 'd3-time-format'
import { useContext, useEffect, useRef } from 'react'

import { LanguageContext } from '~/components'

import { InnerChart } from './'
import styles from './styles.module.css'

type AxisProps = InnerChart

export const AXIS_OFFSET_X = 10
export const AXIS_OFFSET_Y = 12

const Axis: React.FC<AxisProps> = ({
  data,
  width,
  height,
  margin: { left, bottom, right },
  xScale,
  yScale,
  yMax,
  yMin,
  yTicks,
}) => {
  const { lang } = useContext(LanguageContext)
  const xAxisRef: React.RefObject<any> = useRef(null)
  const yAxisRef: React.RefObject<any> = useRef(null)

  const yTickStep = (yMax - yMin) / yTicks

  useEffect(() => {
    // Draw X Axis
    d3Select(xAxisRef.current)
      .call(
        d3AxisBottom<Date>(xScale)
          .tickValues(data.map((d) => d.time as Date))
          .tickSize(0)
          .tickFormat((t) => {
            if (lang === 'en') {
              return d3TimeFormat('%b')(t)
            } else {
              return `${d3TimeFormat('%m')(t).replace(/^0/, '')} 月`
            }
          })
      )
      .call((g) => g.selectAll('text').attr('y', AXIS_OFFSET_X))
      .call((g) => g.select('.domain').remove())

    // Draw Y Axis
    d3Select(yAxisRef.current)
      .call(
        d3AxisLeft(yScale)
          .tickValues(d3Range(yMin, yMax + yTickStep, yTickStep))
          .tickSizeInner(-width + left + right)
          .tickSizeOuter(0)
          .tickFormat((d, index) => (index % 2 ? `${d3Format('d')(d)}` : ``))
      )
      .call((g) => g.selectAll('text').attr('x', -AXIS_OFFSET_Y))
      .call((g) => g.select('.domain').remove())
  }, [xScale, yScale])

  return (
    <>
      <g
        className={styles.xAxis}
        ref={xAxisRef}
        transform={`translate(0, ${height - bottom})`}
      />
      <g
        className={styles.yAxis}
        ref={yAxisRef}
        transform={`translate(${left},0)`}
      />
    </>
  )
}

export default Axis
