import { csvFormat } from 'd3'

export const message = (data) => {
  let message = ''
  message = message + Math.round(csvFormat(data).length / 1024) + ' kB\n'
  message = message + data.length + ' rows\n'
  message = message + data.columns.length + ' columns'
  return message
}
