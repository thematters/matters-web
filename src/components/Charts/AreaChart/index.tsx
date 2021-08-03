import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

import styles from './styles.css'

type Datum = { time: Date; value: number }

type AreaChartProps = {
  data: Datum[]

  // dimensions
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  width = 300,
  height = 200,
  margin = {
    top: 24,
    right: 0,
    bottom: 24,
    left: 48,
  },
}) => {
  const ref: React.RefObject<any> = useRef(null)

  const { top, right, bottom, left } = margin
  const svgWidth = width
  const svgHeight = height

  const draw = () => {
    const xTicks = 3
    const yTicks = 5
    const yMax = d3.max(data.map((d) => d.value)) as number
    const yMinOriginal = d3.min(data.map((d) => d.value)) as number
    const yMin = yMinOriginal - (yMax - yMinOriginal) / yTicks
    const yTickStep = (yMax - yMin) / yTicks

    // Scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.time) as Date[])
      .range([left, width - right])
    const y = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height - bottom, top])

    // Create root container where we will append all other chart elements
    const svg = d3.select(ref.current)

    // Clear svg content before adding new elements
    // svg.selectAll('*').remove()

    // const svg = svgEl.append('g').attr('transform', `translate(${left},${top})`)

    // Add X grid lines with labels
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(xTicks)
          .tickSize(0)
          .tickFormat((t) => (t as Date).getMonth() + 1 + ' 月')
      )
      .call((g) =>
        g.select('.tick:last-of-type text').attr('text-anchor', 'end')
      )
      .call((g) =>
        g
          .selectAll('text')
          .attr('color', '#b3b3b3')
          .attr('font-size', '.75rem')
          .attr('y', '.625rem')
      )
      .call((g) => g.select('.domain').remove())

    // Add Y grid lines with labels
    svg
      .append('g')
      .attr('transform', `translate(${left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickValues(d3.range(yMin, yMax + yTickStep, yTickStep))
          .tickSizeInner(-width + left)
          .tickSizeOuter(0)
          .tickFormat((d, index) => (index % 2 ? `${d3.format('d')(d)}` : ``))
      )
      .call((g) => g.selectAll('line').attr('stroke', 'rgba(13, 103, 99, .08)'))
      .call((g) =>
        g
          .selectAll('text')
          .attr('color', '#b3b3b3')
          .attr('font-size', '.75rem')
          .attr('x', '-.75rem')
      )
      .call((g) => g.select('.domain').remove())

    // Draw the area
    const area = d3
      .area<Datum>()
      .curve(d3.curveCardinal)
      .x((d) => x(d.time))
      .y0(y(yMin))
      .y1((d) => y(d.value))

    svg.append('path').datum(data).attr('fill', 'url(#area)').attr('d', area)

    // Draw the line above the area
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#area-line)')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', area.lineY1())
      .call((g) =>
        g
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attrTween('stroke-dasharray', function () {
            const length = this.getTotalLength()
            return d3.interpolate(`0,${length}`, `${length},${length}`)
          })
      )

    // Tooltip
    const mouseGroup = svg.append('g').attr('class', 'mouse-over-effects')
    const mouseLine = mouseGroup
      .append('line')
      .attr('class', 'mouse-line')
      .style('stroke', 'rgba(154, 229, 226, .4)')
      .style('stroke-width', 1)
      .style('opacity', '0')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', height - bottom)
    const mouseCircle = mouseGroup
      .append('circle')
      .attr('class', 'mouse-circle')
      .attr('r', 8)
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .style('fill', '#9AE5E2')
      .style('opacity', '0')

    svg
      .attr('pointer-events', 'all')
      // on mouse out hide line, circle and tooltip
      .on('mouseout', () => {
        d3.select('.mouse-line').style('opacity', '0')
        d3.selectAll('.mouse-circle').style('opacity', '0')
      })
      // on mouse in show line, circle and tooltip
      .on('mouseover', () => {
        d3.select('.mouse-line').style('opacity', '1')
        d3.selectAll('.mouse-circle').style('opacity', '1')
      })
      .on('mousemove', (event) => {
        const bisectDate = d3.bisector<Datum, any>((d) => d.time).left

        const date = x.invert(event.offsetX)
        const i = bisectDate(data, date, 1)
        const a = data[i - 1]
        const b = data[i]
        const selectedData = +date - +a.time > +b.time - +date ? b : a

        // update position
        mouseLine
          .attr('x1', x(selectedData.time))
          .attr('x2', x(selectedData.time))
          .attr('y1', y(selectedData.value))
        mouseCircle
          .attr('cx', x(selectedData.time))
          .attr('cy', y(selectedData.value))
      })
  }

  useEffect(() => {
    draw()
  }, [data])

  return (
    <div className="chart">
      <svg ref={ref} width={svgWidth} height={svgHeight}>
        <defs>
          <linearGradient
            id="area"
            x1="188.389"
            y1="40.7631"
            x2="188.389"
            y2="161"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#E1F9F8" />
            <stop
              offset="0.833333"
              stop-color="#E0F8F7"
              stop-opacity="0.333333"
            />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>

          <linearGradient
            id="area-line"
            x1="34.3102"
            y1="101.905"
            x2="336.64"
            y2="41.1964"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#9AE5E2" stop-opacity="0" />
            <stop offset="0.203125" stop-color="#9AE6E2" />
            <stop offset="0.786458" stop-color="#9AE5E2" />
            <stop offset="1" stop-color="#9AE5E2" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <style jsx>{styles}</style>
    </div>
  )
}
