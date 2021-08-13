import { extent as d3Extent, max as d3Max, min as d3Min } from 'd3-array'
import {
  ScaleLinear,
  scaleLinear as d3ScaleLinear,
  ScaleTime,
  scaleTime as d3ScaleTime,
} from 'd3-scale'
import { Series, stack as d3Stack } from 'd3-shape'
import _uniqBy from 'lodash/uniqBy'
import { useEffect, useRef, useState } from 'react'

import { useWindowResize } from '~/components'

import Area from './Area'
import Axis from './Axis'
import styles from './styles.css'
import Tooltip from './Tooltip'

export type Datum = Record<'time' | string, number | Date>
export type Data = Datum[]

export type Dimensions = {
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

export type Scales = {
  xScale: ScaleTime<number, number, never>
  yScale: ScaleLinear<number, number, never>
  yMax: number
  yMin: number
}

export type Ticks = {
  yTicks?: number
}

export type InnerChart = {
  data: Data
  series: Series<{ [key: string]: number }, string>[]
  svgRef: React.RefObject<any>
} & Required<Dimensions> &
  Scales &
  Required<Ticks>

type StackedAreaChartProps = {
  data: Data
  children: (
    props: InnerChart
  ) => React.ReactChild | React.ReactChild[] | React.ReactNode
} & Dimensions &
  Ticks

export const StackedAreaChart: React.FC<StackedAreaChartProps> & {
  Axis: typeof Axis
  Area: typeof Area
  Tooltip: typeof Tooltip
} = ({
  data,
  width,
  height = 200,
  margin = {
    top: 24,
    right: 12,
    bottom: 24,
    left: 48,
  },
  yTicks = 5,
  children,
}) => {
  const [windowWidth] = useWindowResize()

  const containerRef: React.RefObject<any> = useRef(null)
  const svgRef: React.RefObject<any> = useRef(null)

  const { top, right, bottom, left } = margin
  const [svgWidth, setSvgWidth] = useState(width || 0)
  const svgHeight = height

  // Data Transformation
  const [_, ...stackedKeys] = Object.keys(data[0])
  const series = d3Stack().keys(stackedKeys)(data as any)

  // Scales
  const _yMax = d3Max(series, (d) => d3Max(d, (dd) => dd[1])) as number
  const _yMin = d3Min(series, (d) => d3Min(d, (dd) => dd[1])) as number
  const tickDistance = (_yMax - _yMin) / yTicks
  const yMax = _yMax + tickDistance / 2 // more space to the top tick
  const yMin = _yMin - tickDistance / 2 // more space to the down tick

  const xScale = d3ScaleTime()
    .domain(d3Extent(data, (d) => d.time) as [Date, Date])
    .range([left, svgWidth - right])

  const yScale = d3ScaleLinear()
    .domain([yMin, yMax])
    .range([height - bottom, top])

  useEffect(() => {
    if (!windowWidth || !containerRef.current) {
      return
    }

    setSvgWidth(containerRef.current.getBoundingClientRect().width)
  }, [windowWidth])

  return (
    <div ref={containerRef}>
      <svg ref={svgRef} width={svgWidth} height={svgHeight}>
        {svgWidth > 0 &&
          children({
            data,
            series,
            width: svgWidth,
            height: svgHeight,
            margin,
            xScale,
            yScale,
            yTicks,
            yMin,
            yMax,
            svgRef,
          })}
      </svg>
      <style jsx>{styles}</style>
    </div>
  )
}

StackedAreaChart.Axis = Axis
StackedAreaChart.Area = Area
StackedAreaChart.Tooltip = Tooltip
