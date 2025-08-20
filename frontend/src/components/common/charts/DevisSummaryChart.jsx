import { memo, useMemo } from 'react'
import { Card } from 'antd'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend)

function DevisSummaryChart({ trend = [] }) {
  const data = useMemo(() => {
    const labels = trend.map((t) => t.label)
    return {
      labels,
      datasets: [
        {
          label: 'Devis créés',
          data: trend.map((t) => t.created || 0),
          fill: true,
          backgroundColor: 'rgba(24, 144, 255, 0.15)',
          borderColor: '#1890ff',
          tension: 0.35,
        },
        {
          label: 'Devis acceptés',
          data: trend.map((t) => t.accepted || 0),
          fill: false,
          borderColor: '#52c41a',
          tension: 0.35,
        },
      ],
    }
  }, [trend])

  const options = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    scales: { y: { beginAtZero: true } },
  }

  return (
    <Card title="Tendance des devis" variant="borderless">
      <Line data={data} options={options} />
    </Card>
  )
}

export default memo(DevisSummaryChart)


