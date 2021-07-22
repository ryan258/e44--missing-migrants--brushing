import React from 'react'

const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
  xScale.ticks().map((tickValue) => (
    <g key={tickValue} className="tick" transform={`translate(${xScale(tickValue)}, 0)`}>
      <line y2={innerHeight} />
      <text //
        y={innerHeight + tickOffset}
        dy=".72em"
        style={{ textAnchor: 'middle' }}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ))

export default AxisBottom
