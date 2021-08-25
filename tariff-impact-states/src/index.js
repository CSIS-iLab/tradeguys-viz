import './scss/main.scss'
import { extent } from 'd3-array'
import { format } from 'd3-format'
import * as d3Fetch from 'd3-fetch'

import chart from './js/chart'
const dataSrc = './data/data.csv'

let data

function loadData() {
  const dataPromise = d3Fetch.csv(dataSrc)
  let result = Promise.all([dataPromise])
    .then(res => {
      const [dataResponse] = res

      data = dataResponse
      return
    })
    .then(() => {
      let minMax = extent(data, function(d) {
        return +d.totaldollars
      })

      document.querySelector('.min').innerHTML =
        '$' + format(',.0f')(minMax[0]).replace(/G/, 'B')
      document.querySelector('.max').innerHTML =
        '$' + format(',.0f')(minMax[1]).replace(/G/, 'B')
      chart.init(data)
    })
}

loadData()
window.addEventListener('resize', chart.resize)
