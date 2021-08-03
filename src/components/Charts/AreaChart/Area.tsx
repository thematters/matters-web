import { easeLinear as d3EaseLinear } from 'd3-ease'
import { interpolate as d3Interpolate } from 'd3-interpolate'
import { select as d3Select } from 'd3-selection'
import { area as d3Area, curveCardinal as d3CurveCardinal } from 'd3-shape'
import { transition as d3Transition } from 'd3-transition'
import { useEffect, useRef } from 'react'

import { Datum, Dimensions, Scales } from './'

type AreaProps = {
  data: Datum[]
} & Required<Dimensions> &
  Scales

const Area: React.FC<AreaProps> = ({ data, xScale, yScale, yMin }) => {
  const areaRef: React.RefObject<any> = useRef(null)
  const lineRef: React.RefObject<any> = useRef(null)

  const area = d3Area<Datum>()
    .curve(d3CurveCardinal)
    .x((d) => xScale(d.time))
    .y0(yScale(yMin))
    .y1((d) => yScale(d.value))

  useEffect(() => {
    // Draw area
    d3Select(areaRef.current).datum(data).attr('d', area)

    // Draw line
    d3Select(lineRef.current)
      .datum(data)
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
      <path ref={areaRef} fill="url(#area)" />

      <path
        ref={lineRef}
        fill="none"
        stroke="url(#area-line)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient
          id="area"
          x1="188.389"
          y1="40.7631"
          x2="188.389"
          y2="161"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E1F9F8" />
          <stop offset="0.833333" stopColor="#E0F8F7" stopOpacity="0.333333" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="area-line"
          x1="34.3102"
          y1="101.905"
          x2="336.64"
          y2="41.1964"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9AE5E2" stopOpacity="0" />
          <stop offset="0.203125" stopColor="#9AE6E2" />
          <stop offset="0.786458" stopColor="#9AE5E2" />
          <stop offset="1" stopColor="#9AE5E2" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  )
}

export default Area
