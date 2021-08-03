import { range as d3Range } from 'd3-array'
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis'
import { format as d3Format } from 'd3-format'
import { select as d3Select } from 'd3-selection'
import { useEffect, useRef } from 'react'

import { InnerChart } from './'
import styles from './styles.css'

type AxisProps = InnerChart

const Axis: React.FC<AxisProps> = ({
  width,
  height,
  margin: { left, bottom, right },
  xScale,
  yScale,
  yMax,
  yMin,
  xTicks,
  yTicks,
}) => {
  const xAxisRef: React.RefObject<any> = useRef(null)
  const yAxisRef: React.RefObject<any> = useRef(null)

  const yTickStep = (yMax - yMin) / yTicks

  useEffect(() => {
    // Draw X Axis
    d3Select(xAxisRef.current)
      .call(
        d3AxisBottom(xScale)
          .ticks(xTicks)
          .tickSize(0)
          .tickFormat((t) => (t as Date).getMonth() + 1 + ' 月')
      )
      .call((g) => g.selectAll('text').attr('y', '.625rem'))
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
      .call((g) => g.selectAll('text').attr('x', '-.75rem'))
      .call((g) => g.select('.domain').remove())
  }, [xScale, yScale])

  return (
    <>
      <g
        className="xAxis"
        ref={xAxisRef}
        transform={`translate(0, ${height - bottom})`}
      />
      <g className="yAxis" ref={yAxisRef} transform={`translate(${left},0)`} />

      <style jsx>{styles}</style>
    </>
  )
}

export default Axis
