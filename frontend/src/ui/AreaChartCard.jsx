"use client"

import { memo, useMemo } from "react"
import { Card } from "antd"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import moment from "moment"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export const AreaChartCard = memo(function AreaChartCard({ title = "Tendance" }) {
  const labels = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => moment().subtract(11 - i, "months").format("MMM")),
  [])

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: "Sessions",
        data: labels.map(() => Math.round(50 + Math.random() * 150)),
        borderColor: "#1677ff",
        backgroundColor: "rgba(22, 119, 255, 0.15)",
        fill: true,
        tension: 0.35,
      },
    ],
  }), [labels])

  const options = useMemo(() => ({
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { grid: { color: "rgba(0,0,0,0.06)" } }, x: { grid: { display: false } } },
  }), [])

  return (
    <Card title={title} className="border-0 shadow-md">
      <Line height={120} data={data} options={options} />
    </Card>
  )
})


