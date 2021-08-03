import { extent as d3Extent, max as d3Max, min as d3Min } from 'd3-array'
import {
  ScaleLinear,
  scaleLinear as d3ScaleLinear,
  ScaleTime,
  scaleTime as d3ScaleTime,
} from 'd3-scale'
import { useRef } from 'react'

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
  xTicks: number
  yTicks: number
}

type AreaChartProps = {
  data: Datum[]
  children: (props: {
    data: Datum[]
    width: number
    height: number
    margin: { top: number; right: number; bottom: number; left: number }
    xScale: ScaleTime<number, number, never>
    yScale: ScaleLinear<number, number, never>
    yMax: number
    yMin: number
    xTicks: number
    yTicks: number
    svgRef: React.RefObject<any>
  }) => React.ReactChild | React.ReactChild[] | React.ReactNode
} & Dimensions

export const AreaChart: React.FC<AreaChartProps> & {
  Axis: typeof Axis
  Area: typeof Area
  Tooltip: typeof Tooltip
} = ({
  data,
  width = 300,
  height = 200,
  margin = {
    top: 24,
    right: 12,
    bottom: 24,
    left: 48,
  },
  children,
}) => {
  const svgRef: React.RefObject<any> = useRef(null)

  const { top, right, bottom, left } = margin
  const svgWidth = width
  const svgHeight = height
  const xTicks = 3
  const yTicks = 5
  const yMax = d3Max(data.map((d) => d.value)) as number
  const yMinOriginal = d3Min(data.map((d) => d.value)) as number
  const yMin = yMinOriginal - (yMax - yMinOriginal) / yTicks

  // Scales
  const xScale = d3ScaleTime()
    .domain(d3Extent(data, (d) => d.time) as Date[])
    .range([left, width - right])

  const yScale = d3ScaleLinear()
    .domain([yMin, yMax])
    .range([height - bottom, top])

  return (
    <div className="chart">
      <svg ref={svgRef} width={svgWidth} height={svgHeight}>
        {children({
          data,
          width,
          height,
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
