import React from 'react'
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

const App = () => {
  const worldAtlas = useWorldAtlas()
  const data = useData()
  // console.log(data)

  if (!worldAtlas || !data) {
    return <pre>'Loading...'</pre>
  }

  return (
    <svg width={width} height={height}>
      <BubbleMap data={data} worldAtlas={worldAtlas} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} />
      </g>
    </svg>
  )
}

export default App
