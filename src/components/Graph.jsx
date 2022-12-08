import Title from "./Title"
import ReactorTile from "./ReactorTile"
import { useRef, useEffect } from 'react'

const Graph = (props) => {const labels = Utils.months({count: 7});
  const { data } = props;
useEffect(() => {
  const canvasRef = useRef(null)
  const chartData = new Chart(ctx, {
  labels: labels,
  type: 'line', 
  data: {
    labels: [1, 3, 100],
    datasets: [{
      label: 'Average Reactor Temperature',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
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
  <canvas ref={canvasRef}>
  </canvas>
)
}

export default Graph