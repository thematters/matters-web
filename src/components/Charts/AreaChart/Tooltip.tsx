import { bisector as d3Bisector } from 'd3-array'
import { select as d3Select } from 'd3-selection'
import { useEffect, useRef } from 'react'

import { Datum, Dimensions, Scales } from './'

type TooltipProps = {
  data: Datum[]
  svgRef: React.RefObject<any>
} & Required<Dimensions> &
  Scales

const Tooltip: React.FC<TooltipProps> = ({
  data,
  width,
  height,
  margin: { bottom },
  xScale,
  yScale,
  svgRef,
}) => {
  const lineRef: React.RefObject<any> = useRef(null)
  const circleRef: React.RefObject<any> = useRef(null)

  useEffect(() => {
    const line = d3Select(lineRef.current)
    const circle = d3Select(circleRef.current)
    const svg = d3Select(svgRef.current)

    svg
      .attr('pointer-events', 'all')
      .on('mouseout', () => {
        line.style('opacity', '0')
        circle.style('opacity', '0')
      })
      .on('mouseover', () => {
        line.style('opacity', '1')
        circle.style('opacity', '1')
      })
      .on('mousemove', (event) => {
        const bisectDate = d3Bisector<Datum, any>((d) => d.time).left

        const date = xScale.invert(event.offsetX)
        const i = bisectDate(data, date, 1)
        const a = data[i - 1]
        const b = data[i]
        const target = +date - +a.time > +b.time - +date ? b : a

        // update position
        line
          .attr('x1', xScale(target.time))
          .attr('x2', xScale(target.time))
          .attr('y1', yScale(target.value))
        circle.attr('cx', xScale(target.time)).attr('cy', yScale(target.value))
      })
  }, [])

  return (
    <g>
      <line
        ref={lineRef}
        x1="0"
        y1="0"
        x2="0"
        y2={height - bottom}
        stroke="rgba(154, 229, 226, .4)"
        strokeWidth={1}
        opacity={0}
      />
      <circle
        ref={circleRef}
        r="8"
        stroke="white"
        strokeWidth={2}
        fill="rgba(154, 229, 226, .4)"
        opacity={0}
      />
    </g>
  )
}

export default Tooltip
