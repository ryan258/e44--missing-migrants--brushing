import React, { useRef, useEffect } from 'react'
import { scaleLinear, scaleTime, extent, timeFormat, bin, timeMonths, sum, max, brushX, select } from 'd3'
import AxisLeft from './AxisLeft'
import AxisBottom from './AxisBottom'
import Marks from './Marks'

// import Marks from './Marks'
// import { useData } from '../hooks/useData'

const margin = {
  top: 0,
  right: 30,
  bottom: 20,
  left: 45
}
const xAxisLabelOffset = 54
const yAxisLabelOffset = 30

const xAxisTickFormat = timeFormat('%m/%d/%Y')

export const DateHistogram = ({ data, height, width, setBrushExtent, xValue }) => {
  // const data = useData()
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.right - margin.left

  const xScale = scaleTime() //
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const xAxisLabel = 'Time'
  const [start, stop] = xScale.domain()

  const yValue = (d) => d['Total Dead and Missing']
  const yAxisLabel = 'Total Dead and Missing'

  // compute the binnedData
  const binnedData = bin() // construct our bins
    .value(xValue) // returns the date
    .domain(xScale.domain()) // sets min and max of dates for the whole data set
    .thresholds(timeMonths(start, stop))(data) // all months between start and stop, computed above, which we then pass the original data into the bin generator, which then returns an array of array that we can then map over
    .map((array) => ({
      // maps over each of the inner arrays, which represent all the events that happened in a given month - each array is transformed into an object
      y: sum(array, yValue), // sum of array of individual dead and missing events
      x0: array.x0, // start date for each bin
      x1: array.x1 // end date for each bin
    }))
  // console.log(data[0])

  // console.log(binnedData)

  const yScale = scaleLinear() //
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0])
    .nice()

  // console.log(yScale.domain()) // [0, 1600]
  const brushRef = useRef()

  // useEffect invoked only after rendering is complete
  useEffect(() => {
    const brush = brushX() //
      .extent([
        [0, 0],
        [innerWidth, innerHeight]
      ]) // arr1 - where brush starts, arr2 - where brush ends
    brush(select(brushRef.current))
    brush.on('brush end', (event) => {
      // console.log(event.selection.map(xScale.invert)) // invert accepts a value from the range of the scale and returns a value from the scale's domain, in this case it takes a pixel coord and returns a date
      setBrushExtent(event.selection && event.selection.map(xScale.invert))
    })
  }, [innerWidth, innerHeight]) // each time any of these dependencies change, this effect runs again

  return (
    <>
      <rect width={width} height={height} fill="white" />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom //
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text //
          textAnchor="middle"
          className="axis-label"
          transform={`translate(${-yAxisLabelOffset},
          ${innerHeight / 2}) rotate(-90) `}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text //
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
          className="axis-label"
        >
          {xAxisLabel}
        </text>
        <Marks //
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={(d) => d}
          innerHeight={innerHeight}
        />
        <g ref={brushRef} />
      </g>
    </>
  )
}
