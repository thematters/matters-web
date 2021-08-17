import { easeLinear as d3EaseLinear } from 'd3-ease'
import { interpolate as d3Interpolate } from 'd3-interpolate'
import { scaleOrdinal as d3ScaleOrdinal } from 'd3-scale'
import { select as d3Select } from 'd3-selection'
import { area as d3Area, curveNatural as d3CurveNatural } from 'd3-shape'
import { transition as d3Transition } from 'd3-transition'
import _uniqBy from 'lodash/uniqBy'
import { Fragment, useEffect, useRef } from 'react'

import { CHART_COLOR } from '~/common/enums'

import { InnerChart } from './'

type AreaProps = InnerChart

const Area: React.FC<AreaProps> = ({ data, series, xScale, yScale, yMin }) => {
  const gRef: React.RefObject<any> = useRef(null)

  const [_, ...stackedKeys] = Object.keys(data[0])
  const stackedColors = [
    CHART_COLOR.green,
    CHART_COLOR.yellow,
    CHART_COLOR.red,
    CHART_COLOR.blue,
  ]

  useEffect(() => {
    // Clear
    d3Select(gRef.current).selectAll('path').remove()

    // Define color scales
    const areaColor = d3ScaleOrdinal<string>()
      .domain(stackedKeys)
      .range(stackedKeys.map((k) => `url(#area-${k})`))

    const lineColor = d3ScaleOrdinal<string>()
      .domain(stackedKeys)
      .range(stackedKeys.map((k) => `url(#line-${k})`))

    // Draw area
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
      .style('fill', (d) => areaColor(d.key))
      .style('opacity', 0)
      .transition(d3Transition() as any)
      .duration(1000)
      .ease(d3EaseLinear)
      .style('opacity', 1)

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
        {stackedKeys.map((key, index) => (
          <Fragment key={key}>
            <linearGradient id={`area-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor={stackedColors[index].area} />
              <stop
                offset="83.33%"
                stopColor={stackedColors[index].area}
                stopOpacity="0.333333"
              />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <linearGradient id={`line-${key}`} x1="0" y1="0" x2="1" y2="0">
              <stop stopColor={stackedColors[index].line} stopOpacity="0" />
              <stop offset="20%" stopColor={stackedColors[index].line} />
              <stop offset="80%" stopColor={stackedColors[index].line} />
              <stop
                offset="100%"
                stopColor={stackedColors[index].line}
                stopOpacity="0"
              />
            </linearGradient>
          </Fragment>
        ))}
      </defs>
    </g>
  )
}

export default Area
