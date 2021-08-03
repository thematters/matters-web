import { range as d3Range } from 'd3-array'
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis'
import { format as d3Format } from 'd3-format'
import { select as d3Select } from 'd3-selection'
import { useEffect, useRef } from 'react'

import { Datum, Dimensions, Scales } from './'

type AxisProps = {
  data: Datum[]
} & Required<Dimensions> &
  Scales

const Axis: React.FC<AxisProps> = ({
  width,
  height,
  margin: { left, bottom },
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
      .call((g) =>
        g.select('.tick:last-of-type text').attr('text-anchor', 'end')
      )
      .call((g) =>
        g
          .selectAll('text')
          .attr('color', '#b3b3b3')
          .attr('font-size', '.75rem')
          .attr('y', '.625rem')
      )
      .call((g) => g.select('.domain').remove())

    // Draw Y Axis
    d3Select(yAxisRef.current)
      .call(
        d3AxisLeft(yScale)
          .tickValues(d3Range(yMin, yMax + yTickStep, yTickStep))
          .tickSizeInner(-width + left)
          .tickSizeOuter(0)
          .tickFormat((d, index) => (index % 2 ? `${d3Format('d')(d)}` : ``))
      )
      .call((g) => g.selectAll('line').attr('stroke', 'rgba(13, 103, 99, .08)'))
      .call((g) =>
        g
          .selectAll('text')
          .attr('color', '#b3b3b3')
          .attr('font-size', '.75rem')
          .attr('x', '-.75rem')
      )
      .call((g) => g.select('.domain').remove())
  }, [xScale, yScale])

  return (
    <>
      <g ref={xAxisRef} transform={`translate(0, ${height - bottom})`} />
      <g ref={yAxisRef} transform={`translate(${left},0)`} />
    </>
  )
}

export default Axis
