import React, { useState } from 'react'
import BubbleMap from './components/BubbleMap/index.js'
import { DateHistogram } from './components/DateHistogram'

import { useWorldAtlas } from './hooks/useWorldAtlas'
import { useData } from './hooks/useData'
// import { message } from './utils/message'
// useCallback - good for adding event listeners only once
// - arg0 - function you want to control
// - arg1 - [array, of, dependencies] - things it needs to run

const width = 960
const height = 500
const dateHistogramSize = 0.2

const xValue = (d) => d['Reported Date']

const App = () => {
  const worldAtlas = useWorldAtlas()
  const data = useData()
  // console.log(data)
  const [brushExtent, setBrushExtent] = useState()
  // console.log(brushExtent)

  if (!worldAtlas || !data) {
    return <pre>'Loading...'</pre>
  }

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d)
        // did the date come after the initial brush point?
        // AND is it less than the final brush point?
        return date > brushExtent[0] && date < brushExtent[1]
      })
    : data

  return (
    <svg width={width} height={height}>
      <BubbleMap data={filteredData} worldAtlas={worldAtlas} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram //
          data={data}
          width={width}
          height={dateHistogramSize * height}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
        />
      </g>
    </svg>
  )
}

export default App
