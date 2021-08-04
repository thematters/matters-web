import {
  extent as d3Extent,
  max as d3Max,
  merge as d3Merge,
  min as d3Min,
} from 'd3-array'
import {
  ScaleLinear,
  scaleLinear as d3ScaleLinear,
  ScaleTime,
  scaleTime as d3ScaleTime,
} from 'd3-scale'
import { useEffect, useRef, useState } from 'react'

import { useWindowResize } from '~/components'

import Area from './Area'
import Axis from './Axis'
import styles from './styles.css'
import Tooltip from './Tooltip'

export type Datum = { time: Date; value: number }

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
  xTicks?: number
  yTicks?: number
}

export type InnerChart = {
  data: { [key: string]: Datum[] }
  svgRef: React.RefObject<any>
} & Required<Dimensions> &
  Scales &
  Required<Ticks>

type AreaChartProps = {
  data: { [key: string]: Datum[] }
  children: (
    props: InnerChart
  ) => React.ReactChild | React.ReactChild[] | React.ReactNode
} & Dimensions &
  Ticks

export const AreaChart: React.FC<AreaChartProps> & {
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
  xTicks = 4,
  yTicks = 5,
  children,
}) => {
  const [windowWidth] = useWindowResize()

  const containerRef: React.RefObject<any> = useRef(null)
  const svgRef: React.RefObject<any> = useRef(null)

  const mergedData = d3Merge<Datum>(Object.values(data))

  const { top, right, bottom, left } = margin
  const [svgWidth, setSvgWidth] = useState(width || 0)
  const svgHeight = height

  const _yMax = d3Max(mergedData.map((d) => d.value)) as number
  const _yMin = d3Min(mergedData.map((d) => d.value)) as number
  const tickDistance = (_yMax - _yMin) / yTicks
  const yMax = _yMax + tickDistance / 2 // more space to the top tick
  const yMin = _yMin - tickDistance / 2 // more space to the down tick

  // Scales
  const xScale = d3ScaleTime()
    .domain(d3Extent(mergedData, (d) => d.time) as Date[])
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
            width: svgWidth,
            height: svgHeight,
            margin,
            xScale,
            yScale,
            xTicks,
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

AreaChart.Axis = Axis
AreaChart.Area = Area
AreaChart.Tooltip = Tooltip
