import React, { useMemo } from 'react'
import { max, scaleSqrt } from 'd3'
import Marks from './Marks'

const sizeValue = (d) => d['Total Dead and Missing']
const maxRadius = 15

const BubbleMap = ({ data, filteredData, worldAtlas }) => {
  const sizeScale = useMemo(() => {
    console.log('sizeScale rendering')
    return scaleSqrt()
      .domain([0, max(data, sizeValue)])
      .range([0, maxRadius])
  }, [data])

  return (
    <Marks //
      worldAtlas={worldAtlas}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  )
}

export default BubbleMap
