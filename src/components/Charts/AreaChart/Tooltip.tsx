import { bisector as d3Bisector } from 'd3-array'
import { select as d3Select } from 'd3-selection'
import { useEffect, useRef, useState } from 'react'
import tippy, { Instance as TippyInstance } from 'tippy.js'

import { Datum, InnerChart } from './'

type TooltipProps = InnerChart & {
  // pass selected data to formatter and
  // return a HTML string to render Tooltip content
  formatter?: (data: { [key: string]: Datum }) => string
}

const defaultFormatter = (data: { [key: string]: Datum }) =>
  Object.values(data)
    .map((datum) => `${datum.value}`)
    .join('<br/>')

const Tooltip: React.FC<TooltipProps> = ({
  data,
  width,
  height,
  margin: { bottom },
  xScale,
  yScale,
  svgRef,
  formatter = defaultFormatter,
}) => {
  const lineRef: React.RefObject<any> = useRef(null)
  const circleRef: React.RefObject<any> = useRef(null)

  const selectTarget = (d: Datum[], offsetX: number) => {
    const bisectDate = d3Bisector<Datum, any>((di) => di.time).left
    const date = xScale.invert(offsetX)
    const i = bisectDate(d, date, 1)
    const a = d[i - 1]
    const b = d[i]

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
    // @ts-ignore
    setTooltip(tippyInstance)
  }, [])

  const showTooltip = (event: any) => {
    const line = d3Select(lineRef.current)
    const circle = d3Select(circleRef.current)

    // disable scroll
    event.preventDefault()

    // calculate the offset
    let offsetX = 0
    if (['touchmove', 'touchstart'].indexOf(event.type) >= 0) {
      const svgRect = svgRef.current.getBoundingClientRect()
      offsetX = event.touches[0].clientX - svgRect.left
    } else {
      offsetX = event.offsetX
    }

    // select closest data point
    const targetData: { [key: string]: Datum } = {}
    let maxTarget: Datum = { time: new Date(), value: 0 }
    Object.keys(data).map((key) => {
      const target = selectTarget(data[key], offsetX)

      Object.assign(targetData, { [key]: target })

      // max target datum
      if (target.value > maxTarget.value) {
        maxTarget = target
      }
    })

    // update the positions of line & circle
    line
      .attr('x1', xScale(maxTarget.time))
      .attr('x2', xScale(maxTarget.time))
      .attr('y1', yScale(maxTarget.value))
    circle
      .attr('cx', xScale(maxTarget.time))
      .attr('cy', yScale(maxTarget.value))

    // show tooltip
    tooltip?.setContent(formatter(targetData))
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
