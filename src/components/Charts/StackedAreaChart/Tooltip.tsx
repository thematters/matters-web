/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { bisector as d3Bisector, sum as d3Sum } from 'd3-array'
import { select as d3Select } from 'd3-selection'
import { useEffect, useRef, useState } from 'react'
import tippy, { Instance as TippyInstance } from 'tippy.js'

import { Datum, InnerChart } from './'

export const TOOLTIP_CIRCLE_RADIUS = 8

type TooltipProps = InnerChart & {
  // pass selected data to formatter and
  // return a HTML string to render Tooltip content
  formatter?: (datum: Datum) => string
}

const defaultFormatter = (datum: Datum) => {
  const { time, ...values } = datum
  return Object.values(values).join('<br/>')
}

const Tooltip: React.FC<TooltipProps> = ({
  data,
  series,
  height,
  margin: { bottom },
  xScale,
  yScale,
  svgRef,
  formatter = defaultFormatter,
}) => {
  const lineRef: React.RefObject<any> = useRef(null)
  const circleRef: React.RefObject<any> = useRef(null)

  const selectTargetDatum = (offsetX: number) => {
    const bisectDate = d3Bisector<Datum, any>((di) => di.time).left
    const date = xScale.invert(offsetX)
    const i = bisectDate(data, date, 1)
    const a = data[i - 1]
    const b = data[i]

    if (!a || !b) {
      return a || b
    }

    return +date - +a.time > +b.time - +date ? b : a
  }

  const [tooltip, setTooltip] = useState<TippyInstance>()
  useEffect(() => {
    const tippyInstance = tippy(circleRef.current, {
      content: '',
      // @see {@url src/common/styles/vendors/tippy.css}
      theme: 'tooltip:chart',
      duration: 0,
      animation: false,
      interactive: false,
      allowHTML: true,
    })
    setTooltip(tippyInstance as any)
  }, [])

  const showTooltip = (event: MouseEvent | TouchEvent) => {
    const line = d3Select(lineRef.current)
    const circle = d3Select(circleRef.current)

    // disable scroll
    event.preventDefault()

    // calculate the offset
    let offsetX = 0
    if (event instanceof TouchEvent) {
      const svgRect = svgRef.current.getBoundingClientRect()
      offsetX = event.touches[0].clientX - svgRect.left
    } else {
      offsetX = event.offsetX
    }

    // select closest data point
    const targetDatum: Datum = selectTargetDatum(offsetX)

    const { time, ...values } = targetDatum
    const sumY = d3Sum(Object.values(values)) as number

    // update the positions of line & circle
    line
      .attr('x1', xScale(targetDatum.time))
      .attr('x2', xScale(targetDatum.time))
      .attr('y1', yScale(sumY))
    circle.attr('cx', xScale(targetDatum.time)).attr('cy', yScale(sumY))

    // show tooltip
    tooltip?.setContent(formatter(targetDatum))
    tooltip?.show()
  }

  useEffect(() => {
    const line = d3Select(lineRef.current)
    const circle = d3Select(circleRef.current)
    const svg = d3Select(svgRef.current)

    svg
      .on('mouseout touchend', () => {
        line.style('opacity', '0')
        circle.style('opacity', '0')
        tooltip?.hide()
      })
      .on('mouseover touchstart', (event) => {
        line.style('opacity', '1')
        circle.style('opacity', '1')
        showTooltip(event)
      })
      .on('mousemove touchmove', (event) => {
        showTooltip(event)
      })
  }, [xScale, yScale, tooltip])

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
        r={TOOLTIP_CIRCLE_RADIUS}
        stroke="white"
        strokeWidth={2}
        fill="#9AE5E2"
        opacity={0}
      />
    </g>
  )
}

export default Tooltip
