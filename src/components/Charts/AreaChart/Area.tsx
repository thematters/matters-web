import { easeLinear as d3EaseLinear } from 'd3-ease'
import { interpolate as d3Interpolate } from 'd3-interpolate'
import { select as d3Select } from 'd3-selection'
import { area as d3Area, curveNatural as d3CurveNatural } from 'd3-shape'
import { transition as d3Transition } from 'd3-transition'
import { useEffect, useRef, useState } from 'react'

import { CHART_COLOR } from '~/common/enums'
import { randomString } from '~/common/utils'

import { Datum, InnerChart } from './'

type AreaProps = InnerChart & {
  dataKey: string
  areaColor?: string
  lineColor?: string
}

const Area: React.FC<AreaProps> = ({
  data,
  xScale,
  yScale,
  yMin,

  dataKey,
  areaColor = CHART_COLOR.green.area,
  lineColor = CHART_COLOR.green.line,
}) => {
  const [areaName] = useState(randomString())
  const areaRef: React.RefObject<any> = useRef(null)
  const lineRef: React.RefObject<any> = useRef(null)

  const areaData = data[dataKey]

  const area = d3Area<Datum>()
    .curve(d3CurveNatural)
    .x((d) => xScale(d.time))
    .y0(yScale(yMin))
    .y1((d) => yScale(d.value))

  useEffect(() => {
    // Draw area
    d3Select(areaRef.current)
      .datum(areaData)
      .attr('d', area)
      .style('opacity', 0)
      .transition(d3Transition() as any)
      .duration(1000)
      .ease(d3EaseLinear)
      .style('opacity', 1)

    // Draw line
    d3Select(lineRef.current)
      .datum(areaData)
      .attr('d', area.lineY1())
      .transition(d3Transition() as any)
      .duration(1000)
      .ease(d3EaseLinear)
      .attrTween('stroke-dasharray', function () {
        const length = this.getTotalLength()
        return d3Interpolate(`0,${length}`, `${length},${length}`)
      })
  }, [xScale, yScale])

  return (
    <>
      <path ref={areaRef} fill={`url(#area-${areaName})`} />

      <path
        ref={lineRef}
        fill="none"
        stroke={`url(#line-${areaName})`}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient id={`area-${areaName}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={areaColor} />
          <stop offset="83.33%" stopColor={areaColor} stopOpacity="0.333333" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`line-${areaName}`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor={lineColor} stopOpacity="0" />
          <stop offset="20%" stopColor={lineColor} />
          <stop offset="80%" stopColor={lineColor} />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  )
}

export default Area
