import { bisector as d3Bisector } from 'd3-array'
import { select as d3Select } from 'd3-selection'
import { useEffect, useRef } from 'react'

import { Datum, InnerChart } from './'

type TooltipProps = InnerChart

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

  const selectTarget = (d: Datum[], offsetX: number) => {
    const bisectDate = d3Bisector<Datum, any>((di) => di.time).left
    const date = xScale.invert(offsetX)
    const i = bisectDate(d, date, 1)
    const a = d[i - 1]
    const b = d[i]
    const target = +date - +a.time > +b.time - +date ? b : a

    return target
  }

  useEffect(() => {
    const line = d3Select(lineRef.current)
    const circle = d3Select(circleRef.current)
    const svg = d3Select(svgRef.current)

    svg
      .on('mouseout', () => {
        line.style('opacity', '0')
        circle.style('opacity', '0')
      })
      .on('mouseover', () => {
        line.style('opacity', '1')
        circle.style('opacity', '1')
      })
      .on('mousemove', (event) => {
        // select max target
        let maxTarget: Datum = { time: new Date(), value: 0 }
        Object.keys(data).map((key) => {
          const target = selectTarget(data[key], event.offsetX)

          if (target.value > maxTarget.value) {
            maxTarget = target
          }
        })

        // update position
        line
          .attr('x1', xScale(maxTarget.time))
          .attr('x2', xScale(maxTarget.time))
          .attr('y1', yScale(maxTarget.value))
        circle
          .attr('cx', xScale(maxTarget.time))
          .attr('cy', yScale(maxTarget.value))
      })
  }, [xScale, yScale])

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
        fill="#9AE5E2"
        opacity={0}
      />
    </g>
  )
}

export default Tooltip
