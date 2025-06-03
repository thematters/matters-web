/* eslint-disable @typescript-eslint/no-explicit-any */
import { easeLinear as d3EaseLinear } from 'd3-ease'
import { interpolate as d3Interpolate } from 'd3-interpolate'
import { scaleOrdinal as d3ScaleOrdinal } from 'd3-scale'
import { select as d3Select } from 'd3-selection'
import { area as d3Area, curveNatural as d3CurveNatural } from 'd3-shape'
import { transition as d3Transition } from 'd3-transition'
import { Fragment, useEffect, useRef } from 'react'

import { InnerChart } from './'

type AreaProps = InnerChart & {
  colors: { [key: string]: { area: string; line: string } }
}

const Area: React.FC<AreaProps> = ({
  colors,
  data,
  series,
  xScale,
  yScale,
  yMin,
}) => {
  const gRef: React.RefObject<any> = useRef(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, ...stackedKeys] = Object.keys(data[0])

  useEffect(() => {
    // Clear
    d3Select(gRef.current).selectAll('path').remove()

    // Define color scales
    const areaColor1 = d3ScaleOrdinal<string>()
      .domain(stackedKeys)
      .range(stackedKeys.map((k) => `url(#area-${k}-1)`))

    const areaColor2 = d3ScaleOrdinal<string>()
      .domain(stackedKeys)
      .range(stackedKeys.map((k) => `url(#area-${k}-2)`))

    const lineColor = d3ScaleOrdinal<string>()
      .domain(stackedKeys)
      .range(stackedKeys.map((k) => `url(#line-${k})`))

    // Draw area
    ;[1, 2].forEach((i) => {
      d3Select(gRef.current)
        .selectAll()
        .data(series)
        .join('path')
        .attr(
          'd',
          d3Area<any>()
            .curve(d3CurveNatural)
            .x((d) => xScale(d.data.time))
            // yMin is the minimum value of the y0
            .y0((d) => yScale(d[0] || yMin))
            .y1((d) => yScale(d[1]))
        )
        .style('fill', (d) => (i === 1 ? areaColor1(d.key) : areaColor2(d.key)))
        .style('opacity', 0)
        .transition(d3Transition() as any)
        .duration(1000)
        .ease(d3EaseLinear)
        .style('opacity', 1)
    })

    // Draw line
    d3Select(gRef.current)
      .selectAll()
      .data(series)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .style('stroke', (d) => lineColor(d.key))
      .attr(
        'd',
        d3Area<any>()
          .curve(d3CurveNatural)
          .x((d) => xScale(d.data.time))
          .y0((d) => yScale(d[0]))
          .y1((d) => yScale(d[1]))
          .lineY1()
      )
      .transition(d3Transition() as any)
      .duration(1000)
      .ease(d3EaseLinear)
      .attrTween('stroke-dasharray', function () {
        const length = this?.getTotalLength()
        return d3Interpolate(`0,${length}`, `${length},${length}`)
      })
  }, [xScale, yScale])

  return (
    <g ref={gRef}>
      <defs>
        {stackedKeys.map((key) => (
          <Fragment key={key}>
            <linearGradient id={`area-${key}-1`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor={colors[key].area} />
              <stop
                offset="83.33%"
                stopColor={colors[key].area}
                stopOpacity="0.333333"
              />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <linearGradient id={`area-${key}-2`} x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="white" />
              <stop offset="13.5%" stopColor="white" stopOpacity="0" />
              <stop offset="87.5%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>

            <linearGradient id={`line-${key}`} x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="13.5%" stopColor={colors[key].line} />
              <stop offset="87.5%" stopColor={colors[key].line} />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </Fragment>
        ))}
      </defs>
    </g>
  )
}

export default Area
