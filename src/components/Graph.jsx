import { useRef, useEffect, useState } from 'react'
import { Chart } from "chart.js/auto"

const Graph = (props) => {

  const { data, width, height, temperature, pollingRate } = props
  const canvasRef = useRef(null)
  const [temperatures, setTemperatures] = useState([])

useEffect(() => {
  setTemperatures((prevTemperatures) => {
    return [...prevTemperatures, temperature].splice(-(60000*5/pollingRate))
  })

  const ctx = canvasRef.current
  const chartData = new Chart(ctx, {
  type: 'line', 
  
  data: {
    labels: temperatures.map((temp, index) => {return index}),
    datasets: [{
      label: 'Average Reactor Temperature',
      data: temperatures,
      fill: true,
      pointRadius: 0,
      borderColor: "#FF6663",
      tension: 0.1
    }]
  },
  options:{ 
    animations: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
  })
  return () => {
    chartData.destroy()
  }
}, [data])

return (
  <>
   <canvas ref={canvasRef} style={{width, height}}>
  </canvas>
  <script src="chart.js"></script>
  </>
)
}

export default Graph